import React from 'react';

import { AppLayout } from './components/AppLayout';
import { PublicLayout } from './components/PublicLayout';

export enum ERouteType {
  APP = 'APP',
  PUBLIC = 'PUBLIC',
}

interface IProps {
  children: React.ReactNode | string;
  routeType: ERouteType;
  noMenu?: boolean;
}

export class Layout extends React.Component<IProps, unknown> {
  public render(): JSX.Element {
    const { routeType, children } = this.props;

    if (routeType === ERouteType.APP) {
      return <AppLayout {...this.props} />;
    } else if (routeType === ERouteType.PUBLIC) {
      return <PublicLayout {...this.props} />;
    }
    return <>{children}</>;
  }
}
