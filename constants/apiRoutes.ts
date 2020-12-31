import { EHTTPVerbs } from '@customTypes/utils/HTTPVerbs';

export enum EAPIRouteKeys {
  /**
   * Health check
   */
  HEALTH_CHECK = 'HEALTH_CHECK',

  /**
   * Data
   */
  GET_HOME_DATA = 'GET_HOME_DATA',

  /**
   * Post
   */
  POST_PROJECT = 'POST_PROJECT',
  POST_PROFILE = 'POST_PROFILE',
}

export const apiRoutes = {
  /**
   * Health check
   */
  [EAPIRouteKeys.HEALTH_CHECK]: {
    route: 'health-check',
    method: EHTTPVerbs.GET,
  },

  /**
   * Data
   */
  [EAPIRouteKeys.GET_HOME_DATA]: {
    route: 'get-home-data',
    method: EHTTPVerbs.GET,
  },

  /**
   * Post
   */
  [EAPIRouteKeys.POST_PROJECT]: {
    route: 'post-project',
    method: EHTTPVerbs.POST,
  },
  [EAPIRouteKeys.POST_PROFILE]: {
    route: 'post-profile',
    method: EHTTPVerbs.POST,
  },
};
