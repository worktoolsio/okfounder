import React from 'react';
import Styled from 'react-styles-injector';

import { Loader } from '@uiComponents/Loader';

import styles from './PageLoader.pcss';

interface IProps {
  readonly className?: string;
  readonly id?: string;
  readonly label?: string;
}

const PageLoaderComponent: React.FC<IProps> = ({
  className = undefined,
  id = undefined,
  label,
}: IProps) => (
  <Styled className={className} id={id} styles={styles}>
    <Loader width={100} label={label || 'loading...'} />
  </Styled>
);

export const PageLoader = React.memo(PageLoaderComponent);
