import React from 'react';
import { NextPage } from 'next';

import { Layout } from '@uiComponents/Layout';
import { ERouteType } from '@uiComponents/Layout/Layout';
import { ApplicationHead } from '@uiComponents/ApplicationHead/ApplicationHead';
import { PostProject } from '@views/Post/PostProject';

export class PostProjectPage extends React.Component<NextPage, unknown> {
  public render(): JSX.Element {
    return (
      <Layout routeType={ERouteType.PUBLIC}>
        <ApplicationHead />
        <PostProject />
      </Layout>
    );
  }
}

export default PostProjectPage;
