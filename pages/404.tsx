import React from 'react';

import { Layout } from '@uiComponents/Layout';
import { ERouteType } from '@uiComponents/Layout/Layout';
import { NextPage } from 'next';
import { ApplicationHead } from '@uiComponents/ApplicationHead/ApplicationHead';

export class NotFoundPage extends React.Component<NextPage, unknown> {
  public render(): JSX.Element {
    return (
      <Layout routeType={ERouteType.PUBLIC}>
        <ApplicationHead title="Page not found" />
        404 not found
      </Layout>
    );
  }
}

export default NotFoundPage;
