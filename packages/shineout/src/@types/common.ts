import { FormFieldProps } from '@sheinx/base';
import { PopoverProps } from '../popover/popover.type';
import React from 'react';

export interface ExtendsFieldProps<T>
  extends Omit<FormFieldProps<T>, 'value' | 'defaultValue' | 'children' | 'onChange' | 'name'> {
  /**
   * @en The key access data in the Form
   * @cn Form 内存取数据的 key
   */
  name?: string;
  defaultValue?: T;
}

export interface TipProps {
  /**
   * @en The position where the validation info pop up
   * @cn 校验信息弹出位置
   * @override PopoverProps["position"]
   */

  popover?: boolean | PopoverProps['position'];
  /**
   * @en Prompt information
   * @cn 提示信息
   */
  tip?: React.ReactNode;
  /**
   * @en Vilidate popup properties
   * @cn 校验或者tip弹框接受的属性
   * @type PopoverProps
   */
  popoverProps?: PopoverProps;
}

export interface CommonType {
  size?: 'small' | 'large' | 'default';
  className?: string;
  style?: React.CSSProperties;
}
