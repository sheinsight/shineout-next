import { CommonType } from '../common/type';
import { BaseRadioProps } from '@sheinx/hooks';
import React from 'react';

export interface RadioClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  /**
   * 当 input 禁用时最外层class
   */
  wrapperDisabled: string;
  /**
   * 当 status 为 error 时
   */
  wrapperError: string;
  wrapperLarge: string;
  wrapperSmall: string;
  wrapperChecked: string;
  indicator: string;
  desc: string;
}

export interface SimpleRadioProps
  extends BaseRadioProps,
    Pick<CommonType, 'status' | 'style' | 'className'> {
  jssStyle: RadioClasses;
  children?: React.ReactNode;
}

export interface RadioProps<T> extends Omit<SimpleRadioProps, 'onChange' | 'checked'> {
  /**
   * 选中后返回的值默认为 true
   */
  htmlValue?: T;
  onChange?: (value: T) => void;
  checked?: boolean | ((d: T) => boolean);
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}
