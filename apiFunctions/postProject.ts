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
import { EProjectKeys } from '@customTypes/project';

export const postProject = apiRouteGenerator({
  method: apiRoutes[EAPIRouteKeys.POST_PROFILE].method,
  requiredBodyKeys: [
    {
      key: EProjectKeys.DESCRIPTION,
      type: 'string',
    },
    {
      key: EProjectKeys.EMAIL,
      type: 'string',
    },
    {
      key: EProjectKeys.FIRSTNAME,
      type: 'string',
    },
    {
      key: EProjectKeys.LASTNAME,
      type: 'string',
    },
    {
      key: EProjectKeys.LINKEDIN,
      type: 'string',
    },
    {
      key: EProjectKeys.NAME,
      type: 'string',
    },
    {
      key: EProjectKeys.SKILLSET,
      type: 'string',
    },
    {
      key: EProjectKeys.TARGET,
      type: 'string',
    },
    {
      key: EProjectKeys.TYPE,
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
    const projectsCollection = db.collection(EMongoCollections.PROJECTS);

    const response = await projectsCollection.insertOne({
      [EProjectKeys.DESCRIPTION]: clientRequest.body[EProjectKeys.DESCRIPTION],
      [EProjectKeys.EMAIL]: clientRequest.body[EProjectKeys.EMAIL],
      [EProjectKeys.FIRSTNAME]: clientRequest.body[EProjectKeys.FIRSTNAME],
      [EProjectKeys.LASTNAME]: clientRequest.body[EProjectKeys.LASTNAME],
      [EProjectKeys.LINKEDIN]: clientRequest.body[EProjectKeys.LINKEDIN],
      [EProjectKeys.NAME]: clientRequest.body[EProjectKeys.NAME],
      [EProjectKeys.SKILLSET]: clientRequest.body[EProjectKeys.SKILLSET],
      [EProjectKeys.TARGET]: clientRequest.body[EProjectKeys.TARGET],
      [EProjectKeys.TYPE]: clientRequest.body[EProjectKeys.TYPE],
    });

    return serverResponse
      .status(EHTTPSuccessCode.CODE_200)
      .send(response.ops[0]);
  },
});
