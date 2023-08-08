import { CommonType } from '../common/type';
import { BaseCheckProps } from '@sheinx/hooks';
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
  indicatorWrapper: string;
  indicator: string;
  desc: string;
  // 组
  group: string;
  groupBlock: string;
  groupButton: string;
}

export interface SimpleRadioProps
  extends BaseCheckProps,
    Pick<CommonType, 'status' | 'style' | 'className'> {
  jssStyle?: {
    radio?: RadioClasses;
  };
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
  // 内部属性用于封装按钮单选框样式
  renderContent?: (info: {
    content: React.ReactNode;
    disabled?: boolean;
    checked?: boolean;
  }) => React.ReactNode;
}
