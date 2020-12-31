import React from 'react';
import { NextPage } from 'next';

import { Layout } from '@uiComponents/Layout';
import { ERouteType } from '@uiComponents/Layout/Layout';
import { ApplicationHead } from '@uiComponents/ApplicationHead/ApplicationHead';
import { Home } from '@views/Home';

export class SiteHomePage extends React.Component<NextPage, unknown> {
  public render(): JSX.Element {
    return (
      <Layout routeType={ERouteType.PUBLIC}>
        <ApplicationHead />
        <Home />
      </Layout>
    );
  }
}

export default SiteHomePage;
