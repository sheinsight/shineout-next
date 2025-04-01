import * as React from 'react';
import { ReactNode } from 'react';
import { InputStyle } from './input.type';
import { CommonType } from '../common/type';

export interface InputGroupProps extends Pick<CommonType, 'status' | 'style' | 'size'> {
  /**
   * @en Custom class name
   * @cn 自定义类名
   */
  className?: string;
  /**
   * @en children
   * @cn 子元素
   */
  children?: ReactNode;
  /**
   * @en width
   * @cn 宽度
   */
  width?: string | number;
  /**
   * @cn 是否禁用 Input.Group 区域内容
   * @en Whether to disable
   */
  disabled?: boolean;
  jssStyle: InputStyle;
  /**
   * @cn 错误信息
   * @en error message
   * @private 内部属性
   */
  error?: string | { message?: string };
  /**
   * @en The callback of blur
   * @cn 失去焦点后的回调
   */
  onBlur?: React.FocusEventHandler;
  /**
   * @en Whether to seperate the border
   * @cn 是否分离边框
   * @default true
   */
  seperate?: boolean;
}
