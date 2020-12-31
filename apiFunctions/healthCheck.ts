/**
 * Due to stupid vercel limitation, we will
 * limit the number of api endpoints. So this
 * endpoint will manage all the datacalls that
 * users will do when they arrive on a view
 */
import { NowRequest, NowResponse } from '@now/node';

import { apiRouteGenerator } from '@utils/apiRouteGenerator';
import { EHTTPSuccessCode } from '@constants/httpCodes';
import { apiRoutes, EAPIRouteKeys } from '@constants/apiRoutes';

export const healthCheck = apiRouteGenerator({
  method: apiRoutes[EAPIRouteKeys.HEALTH_CHECK].method,
  routeFunction: async (
    _clientRequest: NowRequest,
    serverResponse: NowResponse,
  ) => {
    return serverResponse.status(EHTTPSuccessCode.CODE_200).send('OK');
  },
});
