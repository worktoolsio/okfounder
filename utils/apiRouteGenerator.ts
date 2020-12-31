import { NowRequest, NowResponse } from '@now/node';

import { EHTTPVerbs } from '@customTypes/utils/HTTPVerbs';
import { isObject } from './toolBelt/isObject';
import { EHTTPErrorCode } from '@constants/httpCodes';
import { IServerError } from '@customTypes/utils/serverError';

export interface IAPIRouteGenerator {
  method: EHTTPVerbs;
  contentType?: string;
  requireUser?: boolean;
  requiredQueryParams?: Array<string>;
  requiredBodyKeys?: Array<{
    key: string;
    type?: 'string' | 'number' | 'boolean' | 'object';
    check?: (
      key: string | number | Record<string, unknown> | boolean,
    ) => true | string;
  }>;
  routeFunction: (
    clientRequest: NowRequest,
    serverResponse: NowResponse,
  ) => Promise<NowResponse>;
}

export const apiRouteGenerator = ({
  method,
  contentType,
  requiredQueryParams,
  requiredBodyKeys,
  routeFunction,
}: IAPIRouteGenerator) => {
  return async (
    clientRequest: NowRequest,
    serverResponse: NowResponse,
  ): Promise<NowResponse> => {
    /**
     * Check if the method used for the request is the right one
     */
    if (clientRequest.method !== method) {
      return serverResponse.status(EHTTPErrorCode.CODE_405).json({
        error: {
          code: EHTTPErrorCode.CODE_405,
          message: `Method Not Allowed: ${clientRequest.method} instead of ${method}`,
        },
      } as IServerError);
    }

    /**
     * Check the content type // Not for GET calls
     * If this is not defined, the default would be to use application/json
     */
    if (
      method !== 'GET' &&
      !contentType &&
      (!clientRequest.headers['content-type'] ||
        clientRequest.headers['content-type'] !== 'application/json')
    ) {
      return serverResponse.status(EHTTPErrorCode.CODE_400).json({
        error: {
          code: EHTTPErrorCode.CODE_400,
          message:
            'This resource requires a "content-type" header. By default, it has to be "application/json".',
        },
      } as IServerError);
    }
    if (
      contentType &&
      (!clientRequest.headers['content-type'] ||
        clientRequest.headers['content-type'] !== contentType)
    ) {
      return serverResponse.status(EHTTPErrorCode.CODE_400).json({
        error: {
          code: EHTTPErrorCode.CODE_400,
          message: `This resource requires a "content-type" header set to ${contentType}.`,
        },
      } as IServerError);
    }

    /**
     * If the method requires query params, check that they are all here
     */
    if (requiredQueryParams) {
      for (const requiredQueryParam of requiredQueryParams) {
        if (!(clientRequest.query || {})[requiredQueryParam]) {
          return serverResponse.status(EHTTPErrorCode.CODE_400).json({
            error: {
              code: EHTTPErrorCode.CODE_400,
              message: `Missing parameter: ${requiredQueryParam}`,
            },
          } as IServerError);
        }
      }
    }

    /**
     * Check the required body keys and type
     */
    if (requiredBodyKeys) {
      /**
       * Is there a body at all
       */
      if (!clientRequest.body) {
        return serverResponse.status(EHTTPErrorCode.CODE_400).json({
          error: {
            code: EHTTPErrorCode.CODE_400,
            message: `This resource requires a body with the following parameters: ${requiredBodyKeys
              .map((requiredKey) => requiredKey.key)
              .join(', ')}`,
          },
        } as IServerError);
      }

      /**
       * Check each key
       */
      for (const requiredBodyKey of requiredBodyKeys) {
        /**
         * Does the key exists
         */
        if (clientRequest.body[requiredBodyKey.key] === undefined) {
          return serverResponse.status(EHTTPErrorCode.CODE_400).json({
            error: {
              code: EHTTPErrorCode.CODE_400,
              message: `This resource requires the following parameter in body: ${requiredBodyKeys
                .map((requiredKey) => requiredKey.key)
                .join(', ')}`,
            },
          } as IServerError);
        }

        /**
         * Check the value type
         */
        if (
          (requiredBodyKey.type &&
            requiredBodyKey.type !== 'object' &&
            typeof clientRequest.body[requiredBodyKey.key] !==
              requiredBodyKey.type) ||
          (requiredBodyKey.type &&
            requiredBodyKey.type === 'object' &&
            !isObject(clientRequest.body[requiredBodyKey.key]))
        ) {
          return serverResponse.status(EHTTPErrorCode.CODE_400).json({
            error: {
              code: EHTTPErrorCode.CODE_400,
              message: `The key ${
                requiredBodyKey.key
              } in body should be of type: ${
                requiredBodyKey.type
              } and not ${typeof clientRequest.body[requiredBodyKey.key]}`,
            },
          } as IServerError);
        }

        /**
         * If there is a custom check, call it
         */
        if (
          requiredBodyKey.check &&
          typeof requiredBodyKey.check === 'function'
        ) {
          const check = requiredBodyKey.check(
            clientRequest.body[requiredBodyKey.key],
          );
          if (check !== true) {
            return serverResponse.status(EHTTPErrorCode.CODE_400).json({
              error: {
                code: EHTTPErrorCode.CODE_400,
                message: check,
              },
            } as IServerError);
          }
        }
      }
    }

    /**
     * If all the checks passed, play the actual route function
     * in a try to catch global errors
     */
    try {
      return await routeFunction(clientRequest, serverResponse);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      if (typeof error === 'object') {
        return serverResponse
          .status(error.code || EHTTPErrorCode.CODE_500)
          .json({
            code: error.code || EHTTPErrorCode.CODE_500,
            message: error.message || String(error),
          });
      }

      return serverResponse.status(EHTTPErrorCode.CODE_500).json({
        error: {
          code: EHTTPErrorCode.CODE_500,
          message: String(error),
        },
      } as IServerError);
    }
  };
};
