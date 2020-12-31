import React from 'react';
import Styled from 'react-styles-injector';

import { Loader } from '@uiComponents/Loader';
import { Icon } from '@uiComponents/Icon';
import { EAppColors } from '@constants/appColors';

import styles from './Button.pcss';
import Link from 'next/link';

export interface IProps {
  readonly background?: string;
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly color?: string;
  readonly disabled?: boolean;
  readonly formAction?: string;
  readonly href?: string;
  readonly iconLeft?: string;
  readonly iconRight?: string;
  readonly id?: string;
  readonly isLoading?: boolean;
  readonly label?: string;
  readonly name?: string;
  readonly onClick?: (event: React.MouseEvent) => void;
  readonly onMouseDown?: (event: React.MouseEvent) => void;
  readonly onMouseOver?: (event: React.MouseEvent) => void;
  readonly onMouseUp?: (event: React.MouseEvent) => void;
  readonly outerHref?: string;
  readonly size?: 'small' | 'big';
  readonly style?: React.CSSProperties;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly value?: string | number;
  readonly width?: number | string;
  readonly secondary?: boolean;
  readonly tertiary?: boolean;
}

const ButtonComponent: React.FC<IProps> = ({
  background,
  children,
  className,
  color,
  disabled,
  formAction,
  href,
  iconLeft,
  iconRight,
  id,
  isLoading,
  label,
  name,
  onClick,
  onMouseDown,
  onMouseOver,
  onMouseUp,
  outerHref,
  size,
  style,
  type,
  value,
  width,
  secondary,
  tertiary,
}: IProps) => {
  const stylesToInline: React.CSSProperties = {
    ...style,
  };

  if (width && typeof width === 'number') {
    stylesToInline.width = `${width}px`;
  } else if (width && typeof width === 'string') {
    stylesToInline.width = width;
  }

  let computedClassName = `${styles.hash} ${size || 'normal'}`;
  if (className) {
    computedClassName += ' ' + className;
  }
  if (disabled) {
    computedClassName += ' disabled';
  }
  if (isLoading) {
    computedClassName += ' isLoading';
  }
  if (!secondary && !tertiary) {
    computedClassName += ' baseButton';
    stylesToInline.color = color || EAppColors.WHITE;
    stylesToInline.background = background || EAppColors.PRIMARY;
  } else if (secondary) {
    computedClassName += ' secondary';
    stylesToInline.color = color || EAppColors.PRIMARY;
    stylesToInline.background = background || EAppColors.WHITE;
  } else if (tertiary) {
    computedClassName += ' tertiary';
    stylesToInline.color = color || EAppColors.PRIMARY;
  }

  const content = (
    <React.Fragment>
      {isLoading ? (
        <Loader
          color={stylesToInline.color}
          width={size === 'small' ? 20 : 30}
        />
      ) : (
        <span className="children">
          {iconLeft && (
            <span className="icon left">
              <Icon
                icon={iconLeft}
                color={stylesToInline.color}
                width={size === 'small' ? 12 : 16}
              />
            </span>
          )}
          {label && <span className="label">{label}</span>}
          {iconRight && (
            <span className="icon right">
              <Icon
                icon={iconRight}
                color={stylesToInline.color}
                width={size === 'small' ? 12 : 16}
              />
            </span>
          )}
          {children}
        </span>
      )}
    </React.Fragment>
  );

  if (href && !disabled) {
    return (
      <Styled styles={styles} asFragment>
        <Link href={href}>
          <a
            className={computedClassName}
            id={id || undefined}
            onClick={!disabled && !isLoading ? onClick : undefined}
            onMouseDown={!disabled && !isLoading ? onMouseDown : undefined}
            onMouseOver={!disabled && !isLoading ? onMouseOver : undefined}
            onMouseUp={!disabled && !isLoading ? onMouseUp : undefined}
            style={stylesToInline || undefined}
            type={type || 'button'}>
            {content}
          </a>
        </Link>
      </Styled>
    );
  }

  if (outerHref && !disabled) {
    return (
      <Styled styles={styles} asFragment>
        <a
          href="outerHref"
          target="_blank"
          rel="noreferrer noopener"
          className={computedClassName}
          id={id || undefined}
          onClick={!disabled && !isLoading ? onClick : undefined}
          onMouseDown={!disabled && !isLoading ? onMouseDown : undefined}
          onMouseOver={!disabled && !isLoading ? onMouseOver : undefined}
          onMouseUp={!disabled && !isLoading ? onMouseUp : undefined}
          style={stylesToInline || undefined}
          type={type || 'button'}>
          {content}
        </a>
      </Styled>
    );
  }

  return (
    <Styled styles={styles} asFragment>
      <button
        className={computedClassName}
        disabled={isLoading || disabled || undefined}
        id={id || undefined}
        formAction={formAction || undefined}
        name={name || undefined}
        onClick={!disabled && !isLoading ? onClick : undefined}
        onMouseDown={!disabled && !isLoading ? onMouseDown : undefined}
        onMouseOver={!disabled && !isLoading ? onMouseOver : undefined}
        onMouseUp={!disabled && !isLoading ? onMouseUp : undefined}
        style={stylesToInline || undefined}
        type={type || 'button'}
        value={value || undefined}>
        {content}
      </button>
    </Styled>
  );
};

export const Button = React.memo(ButtonComponent);
