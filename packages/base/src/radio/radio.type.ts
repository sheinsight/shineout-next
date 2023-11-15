import { CommonType } from '../common/type';
import { BaseCheckProps } from '@sheinx/hooks';
import React from 'react';

export interface RadioClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  /**
   * 最外层class
   */
  wrapperSmall: string;
  /**
   * 最外层class
   */
  wrapperLarge: string;
  /**
   * 当 input 禁用时最外层class
   */
  wrapperDisabled: string;
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
  extends Omit<BaseCheckProps, 'defaultChecked'>,
    Pick<CommonType, 'style' | 'className' | 'size'> {
  jssStyle?: {
    radio?: () => RadioClasses;
  };
  children?: React.ReactNode;
  /**
   * @private 内部属性用于封装按钮单选框样式
   */
  renderRadio?: (...args: any) => React.ReactElement;
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
