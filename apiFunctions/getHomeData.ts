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

export const getHomeData = apiRouteGenerator({
  method: apiRoutes[EAPIRouteKeys.GET_HOME_DATA].method,
  routeFunction: async (
    _clientRequest: NowRequest,
    serverResponse: NowResponse,
  ) => {
    /**
     * Collection
     */
    const db = await getMongoDB();
    const usersCollection = db.collection(EMongoCollections.USERS);
    const projectsCollection = db.collection(EMongoCollections.PROJECTS);

    const [users, projects] = await Promise.all([
      await usersCollection.find().toArray(),
      await projectsCollection.find().toArray(),
    ]);

    return serverResponse.status(EHTTPSuccessCode.CODE_200).send({
      users,
      projects,
    });
  },
});
