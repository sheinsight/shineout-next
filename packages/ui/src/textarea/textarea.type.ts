import React from 'react';
import { CommonType } from '../types/common';
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
  // wrapperInGroup: string;
}

export interface TextareaBaseProps extends BaseTextareaProps, Pick<CommonType, 'status'> {
  jssStyle: TextareaClasses;
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'default' | 'large';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  getStatus?: (status: { focused?: boolean }) => void;
  underline?: boolean;
  /**
   * @default: true
   */
  border?: boolean;
  // inGroup?: boolean;
  onEnterPress?: (value: string, e: React.KeyboardEvent) => void;
  renderTextarea?: (textareaEl: React.ReactElement) => React.ReactElement;
}

export type TextareaProps = TextareaBaseProps;
