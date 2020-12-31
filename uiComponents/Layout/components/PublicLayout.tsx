import React from 'react';
import Styled from 'react-styles-injector';

import styles from './PublicLayout.pcss';

interface IProps {
  children: React.ReactNode | string;
}

export class PublicLayout extends React.Component<IProps, unknown> {
  public render(): JSX.Element {
    const { children } = this.props;

    return (
      <Styled styles={styles}>
        <main>{children}</main>
      </Styled>
    );
  }
}
