import { EHTTPVerbs } from '@customTypes/utils/HTTPVerbs';
import { isObject } from './toolBelt/isObject';
import { IServerError } from '@customTypes/utils/serverError';
import { EHTTPErrorCode, EHTTPSuccessCode } from '@constants/httpCodes';

export interface IDataCallParams {
  method?: EHTTPVerbs;
  path: string;
  urlParams?: Record<string, string | number | boolean>;
  contentType?: string;
  body?: unknown | Record<string, unknown>;
  headers?: Record<string, string | number | boolean>;
}

export interface IDataCallResponse {
  code: number;
  payload: Record<string, string>;
  headers: Headers;
}

export const DataCall = async ({
  body,
  headers = {},
  method = EHTTPVerbs.GET,
  path,
  urlParams,
}: IDataCallParams): Promise<IDataCallResponse> => {
  /**
   * Init the final request url
   */
  let requestURL = `/api/${path}`;

  /**
   * Add the search from the urls params
   */
  if (urlParams && Object.keys(urlParams).length > 0) {
    requestURL += '?';
    requestURL += Object.entries(urlParams)
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .join('&');
  }

  /**
   * If we have headers, add them to the request headers
   */
  const requestHeaders = new Headers();
  for (const header of Object.entries(headers)) {
    requestHeaders.append(header[0], String(header[1]));
  }

  /**
   * If we have a json body, constraint the content-type
   * to application/json
   */
  let requestBody = null;
  if (body && isObject(body)) {
    requestBody = JSON.stringify(body);
    requestHeaders.append('content-Type', 'application/json');
  }

  /**
   * Build the params object for the fetch request
   */
  const params: RequestInit = {
    method,
    headers: requestHeaders,
    body: requestBody,
  };

  /**
   * Perform the fetch request
   */
  const response = await fetch(requestURL, params);

  /**
   * If we have a 401, stops here and send back to the
   * application login route
   */
  if (response.status === EHTTPErrorCode.CODE_401) {
    /**
     * Throw for the caller
     */
    throw {
      error: {
        code: EHTTPErrorCode.CODE_401,
        message: 'Not authorized',
      },
    } as IServerError;
  }

  /**
   * If we have a non success message, throw the error
   */
  if (
    response.status !== EHTTPSuccessCode.CODE_200 &&
    response.status !== EHTTPSuccessCode.CODE_201
  ) {
    const { error } = await response.json();
    throw {
      error: {
        code: error.code || EHTTPErrorCode.CODE_500,
        message: error.message || String(error),
      },
    } as IServerError;
  }

  /**
   * Parse the server reponse
   */
  const jsonResponse = await response.json();

  return {
    code: response.status,
    headers: response.headers,
    payload: jsonResponse,
  };
};
