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
  darkIndicatorWrapper: string;
}

export interface SimpleRadioProps
  extends Omit<BaseCheckProps, 'defaultChecked'>,
    Pick<CommonType, 'style' | 'className' | 'size'> {
  jssStyle?: {
    radio?: () => RadioClasses;
  };
  /**
   * @en Content
   * @cn 内容
   */
  children?: React.ReactNode;
  /**
   * @private 内部属性用于封装按钮单选框样式
   */
  renderRadio?: (...args: any) => React.ReactElement;
  /**
   * @private 内部属性用于控制热区样式
   */
  theme?: 'dark';
}

export interface RadioProps<T> extends Omit<SimpleRadioProps, 'onChange' | 'checked' | 'theme'> {
  /**
   * @en Specifies the result
   * @cn 选中后返回的值
   * @default true
   */
  htmlValue?: T;
  /**
   * @en Change callback when the selected state changes
   * @cn 改变选中状态时触发回调
   */
  onChange?: (value: T) => void;
  /**
   * @en If not set, use (value === htmlValue)
   * @cn checked 传入时为受控组件
   */
  checked?: boolean | ((d: T) => boolean);
  /**
   * @en Checkbox click callback
   * @cn 勾选框点击回调
   */
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}
