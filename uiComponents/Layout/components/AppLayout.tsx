import React from 'react';
import Styled from 'react-styles-injector';

import styles from './AppLayout.pcss';
import { PageLoader } from '@uiComponents/PageLoader';

interface IProps {
  children: React.ReactNode | string;
}

interface IState {
  isLoading: boolean;
}

export class AppLayout extends React.Component<IProps, IState> {
  public state: IState = {
    isLoading: true,
  };

  public componentDidMount(): void {
    /**
     * Client side, display the app
     */
    if (typeof window !== 'undefined') {
      /**
       * Otherwise, just display the view
       */
      this.setState({
        isLoading: false,
      });
    }
  }

  public render(): JSX.Element {
    const { isLoading } = this.state;

    if (isLoading) {
      return <PageLoader />;
    }

    const { children } = this.props;

    return <Styled styles={styles}>{children}</Styled>;
  }
}
