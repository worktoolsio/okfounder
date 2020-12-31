import React from 'react';
import Styled from 'react-styles-injector';
import styles from './InputGroup.pcss';

interface IProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
}

export const InputGroup: React.FC<IProps> = ({
  children,
  className,
  id,
  title,
}: IProps) => (
  <Styled
    className={className || undefined}
    id={id || undefined}
    styles={styles}>
    {title && <h3>{title}</h3>}
    <div className="group">{children}</div>
  </Styled>
);
