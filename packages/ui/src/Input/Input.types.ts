import React from 'react';
import type { CommonType } from '../types/common';

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
}
export interface InputBaseProps extends Pick<CommonType, 'status'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value?: string) => void;
  disabled?: boolean;
  clearable?: boolean;
  jssStyle: InputClasses;
  className?: string;
  style?: React.CSSProperties;
  beforeChange?: (value?: string) => string | void;
}

export type InputProps = InputBaseProps &
  Omit<React.HTMLAttributes<HTMLInputElement>, keyof InputBaseProps>;
