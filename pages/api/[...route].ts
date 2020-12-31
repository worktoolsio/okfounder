import { NowRequest, NowResponse } from '@now/node';
import { EAPIRouteKeys, apiRoutes } from '@constants/apiRoutes';
import { EHTTPErrorCode } from '@constants/httpCodes';
import { IServerError } from '@customTypes/utils/serverError';

import { healthCheck } from '@apiFunctions/healthCheck';
import { getHomeData } from '@apiFunctions/getHomeData';
import { postProfile } from '@apiFunctions/postProfile';
import { postProject } from '@apiFunctions/postProject';

/**
 * One endpoint to manage the entire api and the actual route
 * as an URL param may seems weird. But this architecture
 * exists fro two reasons :
 *    - the limitations of the Vercel platform that allows
 *      a maximum of 21 functions per deployment (this is
 *      low) and a maximum of 640 edits per month to the
 *      functions (this is super low)
 *    - everything being a function, it will be super easy
 *      to refactor to something else, should we decide to
 *      change platform
 */
export const handler = async (
  clientRequest: NowRequest,
  serverResponse: NowResponse,
): Promise<NowResponse> => {
  let actualRoute = clientRequest.query.route;
  if (Array.isArray(actualRoute)) {
    actualRoute = actualRoute.join('/');
  }

  /**
   * In dev mode, log all the requests and simulate
   * a 500ms delay on all requests to see the loading time
   */
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.info({
      url: clientRequest.url,
      apiRoute: actualRoute,
      headers: clientRequest.headers || {},
      query: clientRequest.query || {},
      body: clientRequest.body || {},
    });
  }

  try {
    switch (actualRoute) {
      /**
       * Health check
       */
      case apiRoutes[EAPIRouteKeys.HEALTH_CHECK].route:
        return healthCheck(clientRequest, serverResponse);

      /**
       * Data
       */
      case apiRoutes[EAPIRouteKeys.GET_HOME_DATA].route:
        return getHomeData(clientRequest, serverResponse);

      /**
       * Post
       */
      case apiRoutes[EAPIRouteKeys.POST_PROFILE].route:
        return postProfile(clientRequest, serverResponse);
      case apiRoutes[EAPIRouteKeys.POST_PROJECT].route:
        return postProject(clientRequest, serverResponse);

      default:
        /**
         * In dev mode, we send the data to the console
         * in other modes, we send the data to Sentry
         */
        if (process.env.NODE_ENV === 'development') {
          console.error('API route not found.');
          console.error({
            url: clientRequest.url,
            query: clientRequest.query || {},
            body: clientRequest.body || {},
            error: 'API route not found.',
          });
        } else {
          /**
           * Send to a log service
           */
        }
        return serverResponse.status(EHTTPErrorCode.CODE_404).send({
          error: {
            code: EHTTPErrorCode.CODE_404,
            message: 'API route not found.',
          },
        } as IServerError);
    }
  } catch (error) {
    /**
     * In dev mode, we send the data to the console
     * in other modes, we send the data to Sentry
     */
    if (process.env.NODE_ENV === 'development') {
      console.error(String(error));
    } else {
      /**
       * Send to a log service
       */
    }

    return serverResponse.status(EHTTPErrorCode.CODE_500).send({
      error: {
        code: EHTTPErrorCode.CODE_500,
        message: 'API error',
      },
    } as IServerError);
  }
};

export default handler;
