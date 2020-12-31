import React from 'react';
import Styled from 'react-styles-injector';

import { mdiAlert, mdiAlertOctagon } from '@mdi/js';
import { Icon } from 'uiComponents/Icon';

import styles from './Input.pcss';
import { EAppColors } from '@constants/appColors';
import { Loader } from '@uiComponents/Loader';

export interface IProps {
  readonly autoComplete?: string;
  readonly className?: string;
  readonly defaultValue?: string | Date | number;
  readonly disabled?: boolean;
  readonly error?: string | React.ReactNode;
  readonly id?: string;
  readonly isLoading?: boolean;
  readonly label: string | React.ReactNode;
  readonly max?: string | number;
  readonly maxLength?: number;
  readonly min?: string | number;
  readonly minLength?: number;
  readonly name?: string;
  readonly onBlur?: (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string,
  ) => void | Promise<void>;
  readonly onChange?: (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string,
  ) => void | Promise<void>;
  readonly onFocus?: (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value?: string,
  ) => void | Promise<void>;
  readonly onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement>,
    value?: string,
  ) => void | Promise<void>;
  readonly pattern?: string;
  readonly placeholder?: string;
  readonly readonly?: boolean;
  readonly required?: boolean;
  readonly step?: string;
  readonly sublabel?: string | React.ReactNode;
  readonly type?:
    | 'text'
    | 'date'
    | 'textarea'
    | 'email'
    | 'color'
    | 'number'
    | 'password'
    | 'range'
    | 'search'
    | 'tel'
    | string;
  readonly warning?: string | React.ReactNode;
}

let inputIndex = 0;

export class Input extends React.Component<IProps, unknown> {
  private input!: HTMLInputElement | HTMLTextAreaElement;

  private onFocus = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(event, event.currentTarget.value);
    }
  };

  private onBlur = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    if (this.props.onBlur && typeof this.props.onBlur === 'function') {
      this.props.onBlur(event, event.currentTarget.value);
    }
  };

  private onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    if (this.props.onChange && typeof this.props.onChange === 'function') {
      this.props.onChange(event, event.currentTarget.value);
    }
  };

  private onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyDown && typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(event, event.currentTarget.value);
    }
  };

  public focusInput = (): void => this.input.focus();

  public getValue = (): string => this.input.value;

  public setValue = (value: string): string => (this.input.value = value);

  public render(): JSX.Element {
    const {
      autoComplete,
      className = '',
      disabled,
      error,
      id,
      isLoading,
      label,
      max,
      maxLength,
      min,
      minLength,
      name,
      pattern,
      placeholder,
      readonly,
      required,
      step,
      sublabel,
      type = 'text',
      warning,
    } = this.props;
    let { defaultValue } = this.props;

    inputIndex++;
    const uniqId = `inputId-${inputIndex}`;

    if (type === 'date' && defaultValue) {
      const d = new Date(defaultValue);
      defaultValue = `${d.getFullYear()}-${`0${d.getMonth() + 1}`.slice(
        -2,
      )}-${`0${d.getDate()}`.slice(-2)}`;
    }
    defaultValue = defaultValue ? String(defaultValue) : '';

    return (
      <Styled
        styles={styles}
        htmlFor={uniqId}
        id={id}
        className={`${className} ${disabled ? 'disabled' : ''}`}
        tag="label">
        {label && <div className="topLabel">{label}</div>}
        <div className="inputContainer">
          {isLoading && <Loader width={32} className="loaderContainer" />}

          {!isLoading && type === 'textarea' && (
            <textarea
              id={uniqId}
              placeholder={placeholder}
              defaultValue={defaultValue}
              name={name}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              required={required}
              disabled={disabled}
              rows={4}
              ref={(input) => (this.input = input as HTMLTextAreaElement)}
            />
          )}

          {!isLoading && type !== 'textarea' && (
            <input
              type={type}
              id={uniqId}
              pattern={pattern}
              placeholder={placeholder}
              defaultValue={defaultValue}
              name={name}
              min={min}
              minLength={minLength}
              max={max}
              maxLength={maxLength}
              onBlur={this.onBlur}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onKeyDown={this.onKeyDown}
              readOnly={readonly}
              required={required}
              step={step}
              disabled={disabled}
              autoComplete={autoComplete}
              ref={(input) => (this.input = input as HTMLInputElement)}
            />
          )}

          {sublabel && <div className="subLabel">{sublabel}</div>}

          {error && (
            <div className="subLabel" style={{ color: EAppColors.ERROR }}>
              <Icon
                icon={mdiAlertOctagon}
                width={16}
                color={EAppColors.ERROR}
              />
              {error}
            </div>
          )}
          {warning && (
            <div className="subLabel" style={{ color: EAppColors.WARNING }}>
              <Icon icon={mdiAlert} width={16} color={EAppColors.WARNING} />
              {warning}
            </div>
          )}
        </div>
      </Styled>
    );
  }
}
