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
import { getMongoDB } from '@utils/getMongoDB';
import { EMongoCollections } from '@constants/mongoCollections';
import { EUserKeys } from '@customTypes/user';

export const postProfile = apiRouteGenerator({
  method: apiRoutes[EAPIRouteKeys.POST_PROFILE].method,
  requiredBodyKeys: [
    {
      key: EUserKeys.DONTWANT,
      type: 'string',
    },
    {
      key: EUserKeys.EMAIL,
      type: 'string',
    },
    {
      key: EUserKeys.FIRSTNAME,
      type: 'string',
    },
    {
      key: EUserKeys.LASTNAME,
      type: 'string',
    },
    {
      key: EUserKeys.LINKEDIN,
      type: 'string',
    },
    {
      key: EUserKeys.MOTIVATION,
      type: 'string',
    },
    {
      key: EUserKeys.SKILLSET,
      type: 'string',
    },
    {
      key: EUserKeys.WANT,
      type: 'string',
    },
  ],
  routeFunction: async (
    clientRequest: NowRequest,
    serverResponse: NowResponse,
  ) => {
    /**
     * Collection
     */
    const db = await getMongoDB();
    const usersCollection = db.collection(EMongoCollections.USERS);

    const response = await usersCollection.insertOne({
      [EUserKeys.DONTWANT]: clientRequest.body[EUserKeys.DONTWANT],
      [EUserKeys.EMAIL]: clientRequest.body[EUserKeys.EMAIL],
      [EUserKeys.FIRSTNAME]: clientRequest.body[EUserKeys.FIRSTNAME],
      [EUserKeys.LASTNAME]: clientRequest.body[EUserKeys.LASTNAME],
      [EUserKeys.LINKEDIN]: clientRequest.body[EUserKeys.LINKEDIN],
      [EUserKeys.MOTIVATION]: clientRequest.body[EUserKeys.MOTIVATION],
      [EUserKeys.SKILLSET]: clientRequest.body[EUserKeys.SKILLSET],
      [EUserKeys.WANT]: clientRequest.body[EUserKeys.WANT],
    });

    return serverResponse
      .status(EHTTPSuccessCode.CODE_200)
      .send(response.ops[0]);
  },
});
