import React from 'react';
import { CommonType } from '../types/common';
import { InputFormatProps, BaseInputProps } from '@shined/hooks';

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
}

export interface InputBaseProps
  extends Partial<BaseInputProps>,
    Partial<InputFormatProps>,
    Pick<CommonType, 'status'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value?: string) => void;
  jssStyle: InputClasses;
  className?: string;
  style?: React.CSSProperties;
  beforeChange?: (value?: string) => string | void;
  clearIcon?: React.ReactNode;
  size?: 'small' | 'default' | 'large';
}

export type InputProps = InputBaseProps &
  Omit<React.HTMLAttributes<HTMLInputElement>, keyof InputBaseProps>;
