import React from 'react';
import Styled from 'react-styles-injector';

import styles from './GlobalStyles.pcss';
import Constants from './Constants.pcss';
import Animations from './Animations.pcss';

export const GlobalStyles = (): JSX.Element => (
  <Styled asFragment={true} styles={[styles, Constants, Animations]} />
);
