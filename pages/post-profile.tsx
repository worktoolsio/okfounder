import React from 'react';
import { NextPage } from 'next';

import { Layout } from '@uiComponents/Layout';
import { ERouteType } from '@uiComponents/Layout/Layout';
import { ApplicationHead } from '@uiComponents/ApplicationHead/ApplicationHead';
import { PostProfile } from '@views/Post';

export class PostProfilePage extends React.Component<NextPage, unknown> {
  public render(): JSX.Element {
    return (
      <Layout routeType={ERouteType.PUBLIC}>
        <ApplicationHead />
        <PostProfile />
      </Layout>
    );
  }
}

export default PostProfilePage;
