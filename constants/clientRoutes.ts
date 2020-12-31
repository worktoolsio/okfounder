/**
 * This file will list all the client route used
 * in the public sites and privte application
 */

/**
 * An enum containing all the unique names of the routes
 */
export enum EClientRouteKeys {
  /**
   * Post routes
   */
  POST_PROJECT = 'POST_PROJECT',
  POST_PROFILE = 'POST_PROFILE',

  /**
   * Static elements
   */
  FRONT_HOME = 'FRONT_HOME',
}

/**
 * An object litteral with all the client routes
 */
export const clientRoutes = {
  /**
   * Static front end routes
   */
  [EClientRouteKeys.FRONT_HOME]: {
    path: '/[language]-[country]',
    pathBuilder: ({
      language,
      country,
    }: {
      language?: string;
      country?: string;
    }): string => {
      if (language && !country) {
        return `/${language}`;
      } else if (language && country) {
        return `/${language}-${country}`;
      } else return '/';
    },
  },

  /**
   * Post routes
   */
  [EClientRouteKeys.POST_PROJECT]: { path: '/post-project' },
  [EClientRouteKeys.POST_PROFILE]: { path: '/post-profile' },
};
