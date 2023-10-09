import React from 'react';
import { CommonType } from '../common/type';
import { InnerTitleClasses } from '../common/use-inner-title';
import { BaseTipProps } from '../common/use-tip';
import { BaseInputProps, InputFormatProps } from '@sheinx/hooks';
import { PopoverClasses } from '../popover/popover.type';

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
  content: string;
  wrapperError: string;
  wrapperInnerTitle: string;
  wrapperInnerTitleTop: string;
  wrapperInnerTitleBottom: string;
  wrapperPaddingBox: string;
  input: string;
  clear: string;
  clearWrapper: string;
  wrapperLarge: string;
  wrapperSmall: string;
  wrapperUnderline: string;
  wrapperNoBorder: string;
  info: string;
  infoError: string;
  // group
  group: string;
  groupSmall: string;
  groupLarge: string;
  groupFocus: string;
  groupDisabled: string;
  // number
  wrapperNumber: string;
  numberStep: string;

  //password
  passwordToggle: string;
}

export interface InputStyle {
  input?: () => InputClasses;
  innerTitle?: () => InnerTitleClasses;
  popover?: () => PopoverClasses;
}

export interface SimpleInputProps
  extends BaseInputProps,
    Pick<CommonType, 'status' | 'style' | 'className' | 'size'> {
  jssStyle: InputStyle;
  clearIcon?: React.ReactNode;
  /**
   * @en prefix
   * @cn 前缀
   */
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  addEnd?: React.ReactNode;
  getStatus?: (status: { focused?: boolean }) => void;
  underline?: boolean;
  /**
   * @default: true
   */
  border?: boolean;
  onEnterPress?: (value: string, e: React.KeyboardEvent) => void;
  showClear?: boolean;
  renderInput?: (inputEl: React.ReactElement) => React.ReactElement;
}

export interface InputCommonProps<V> extends BaseTipProps {
  suffix?: SimpleInputProps['suffix'];
  className?: SimpleInputProps['className'];
  forwardRef?: SimpleInputProps['inputRef'];
  getStatus?: SimpleInputProps['getStatus'];
  size?: SimpleInputProps['size'];
  jssStyle: SimpleInputProps['jssStyle'];
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
  delay?: number;
  onBlur?: React.FocusEventHandler;
  status?: CommonType['status'];
}

export type GetCommonProps<Props, V> = Omit<
  Props,
  | 'value'
  | 'onChange'
  | 'defaultValue'
  | 'clearable'
  | 'onClear'
  | 'name'
  | 'step'
  | 'min'
  | 'max'
  | 'rootRef'
  | 'inputRef'
  | 'getStatus'
  | 'renderInput'
  | 'addEnd'
> &
  InputCommonProps<V>;

export interface InputProps
  extends GetCommonProps<SimpleInputProps, string | undefined>,
    Omit<InputFormatProps, 'value' | 'onChange'> {}
