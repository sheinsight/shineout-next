import React from 'react';
import { CommonType } from '../common/type';
import { InnerTitleClass } from '../common/use-inner-title';
import { BaseInputProps, InputFormatProps } from '@sheinx/hooks';

export interface InputClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  /**
   * 当 input focus 时最外层class
   */
  wrapperFocus: string;
  /**
   * 当 input 禁用时最外层class
   */
  wrapperDisabled: string;
  /**
   * 当 status 为 error 时
   */
  wrapperError: string;
  input: string;
  clear: string;
  clearWrapper: string;
  wrapperLarge: string;
  wrapperSmall: string;
  wrapperUnderline: string;
  wrapperNoBorder: string;
  wrapperInGroup: string;
  paddingBox: string;
  info: string;
  infoError: string;
}

export interface SimpleInputProps
  extends BaseInputProps,
    Pick<CommonType, 'status' | 'style' | 'className' | 'size'> {
  jssStyle: InputClasses;
  clearIcon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  getStatus?: (status: { focused?: boolean }) => void;
  underline?: boolean;
  /**
   * @default: true
   */
  border?: boolean;
  /**
   * @default: false
   */
  inGroup?: boolean;
  onEnterPress?: (value: string, e: React.KeyboardEvent) => void;
  showClear?: boolean;
  renderInput?: (inputEl: React.ReactElement) => React.ReactElement;
}

export interface InputCommonProps<V> {
  suffix?: SimpleInputProps['suffix'];
  className?: SimpleInputProps['className'];
  forwardRef?: SimpleInputProps['inputRef'];
  getStatus?: SimpleInputProps['getStatus'];
  size?: SimpleInputProps['size'];
  jssStyle: SimpleInputProps['jssStyle'];
  innerTitleJssStyle: InnerTitleClass;
  innerTitle?: React.ReactNode;
  placeTitle?: React.ReactNode;
  htmlName?: string;
  value?: V;
  onChange?: (value: V) => void;
  defaultValue?: V;
  beforeChange?: (value: V) => void | V;
  clearable?: boolean | (() => void);
  clearToUndefined?: boolean;
  width?: string | number;
  style?: React.CSSProperties;
  info?: number | ((value: V | undefined) => string);
  disabled?: boolean;
}

export type GetCommonProps<Props, V> = Omit<
  Props,
  | 'value'
  | 'onChange'
  | 'defaultValue'
  | 'clearable'
  | 'onClear'
  | 'name'
  | 'inputRef'
  | 'step'
  | 'min'
  | 'max'
> &
  InputCommonProps<V>;

export interface InputProps
  extends GetCommonProps<SimpleInputProps, string | undefined>,
    Omit<InputFormatProps, 'value' | 'onChange'> {}
