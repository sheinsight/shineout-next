import { CommonType, CommonChangeType } from '../common/type';
import { BaseCheckProps } from '@sheinx/hooks';
import { InputClasses } from '../input/input.type';
import React from 'react';

export interface CheckboxClasses {
  rootClass: string;
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperSmall: string;
  wrapperLarge: string;
  /**
   * 当 input 禁用时最外层class
   */
  wrapperDisabled: string;
  /**
   * 当 status 为 error 时
   */
  wrapperChecked: string;
  wrapperIndeterminate: string;
  indicator: string;
  indicatorWrapper: string;
  darkIndicatorWrapper: string;
  desc: string;
  input: string;
  wrapperTop: string;
  group: string;
  groupBlock: string;
}

export interface CheckboxStyle {
  checkbox?: () => CheckboxClasses;
  input?: () => InputClasses;
}

export interface SimpleCheckboxProps
  extends Omit<BaseCheckProps, 'checked' | 'defaultChecked'>,
    Pick<CommonType, 'style' | 'className' | 'size'> {
  jssStyle?: CheckboxStyle;
  /**
   * @en Content
   * @cn 内容
   */
  children?: React.ReactNode;
  checked?: boolean | 'indeterminate';
  /**
   * @en Default checked status
   * @cn 默认选中状态
   */
  defaultChecked?: boolean | 'indeterminate';
  renderFooter?: (checked?: boolean) => React.ReactNode;
  /**
   * @private 内部属性
   */
  theme?: 'dark';

  /**
   * @private 内部属性
   */
  needStopPropagation?: boolean;

  /**
   * @en Vertical align of checkbox indicator
   * @cn 勾选框指示器的垂直对齐方式
   * @default "middle"
   * @version 3.9.9
   */
  verticalAlign?: 'middle' | 'top';
}

export interface CheckboxProps<T>
  extends CommonChangeType<T>,
    Omit<SimpleCheckboxProps, 'onChange' | 'checked' | 'renderFooter' | 'theme'> {
  /**
   * @en Specifies the result
   * @cn 选中后返回的值
   * @override any
   * @default true
   */
  htmlValue?: T;
  /**
   * @en Value chane callback
   * @cn 值改变回调函数
   */
  onChange?: (value: T | undefined, checked: boolean, raw: T) => void;
  /**
   * @en Value chane callback
   * @cn 值改变回调函数
   */
  onRawChange?: (value: T | undefined, checked: boolean, raw: T) => void;
  /**
   * @en If not set, use (value === htmlValue)
   * @cn checked 传入时为受控组件
   */
  checked?: boolean | 'indeterminate' | ((d: T) => boolean | 'indeterminate');
  /**
   * @en Checkbox click callback
   * @cn 勾选框点击回调
   */
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  /**
   * @en If checked is not set, checked status is value === htmlValue
   * @cn 如果 checked 未设置，checked 状态为 value === htmlValue
   * @override any
   */
  value?: T;
  /**
   * @en Whether to show the input box
   * @cn 默认值和 value 类型相同
   * @override Value
   */
  defaultValue?: T;
  /**
   * @deprecated: 废弃属性
   */
  inputable?: boolean;
}
