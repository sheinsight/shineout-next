import React from 'react';
import { CommonType } from '../common/type';
import { BaseTextareaProps } from '@sheinx/hooks';

export interface TextareaClasses {
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
  textarea: string;
  wrapperLarge: string;
  wrapperSmall: string;
  wrapperUnderline: string;
  wrapperNoBorder: string;
  paddingBox: string;
  resize: string;
  shadow: string;
  info: string;
  infoError: string;
  footer: string;
}

export interface SimpleTextareaProps
  extends BaseTextareaProps,
    Pick<CommonType, 'status' | 'style' | 'className' | 'size'> {
  jssStyle: TextareaClasses;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  getStatus?: (status: { focused?: boolean }) => void;
  underline?: boolean;
  /**
   * @default: true
   */
  border?: boolean;
  resize?: boolean;
  onEnterPress?: (value: string, e: React.KeyboardEvent) => void;
  renderTextarea?: (textareaEl: React.ReactElement) => React.ReactElement;
}

type TextareaValueType = string;

export interface TextareaProps
  extends Omit<SimpleTextareaProps, 'value' | 'onChange' | 'defaultValue'> {
  innerTitle?: React.ReactNode;
  placeTitle?: React.ReactNode;
  autosize?: boolean;
  info?: number | ((value: string | undefined) => React.ReactNode | Error);
  value?: TextareaValueType;
  defaultValue?: TextareaValueType;
  onChange?: (value: TextareaValueType) => void;
  beforeChange?: (value: TextareaValueType) => void | string;
  maxHeight?: string | number;
  trim?: boolean;
  renderFooter?: (value?: string) => React.ReactNode;
  width?: number | string;
}
