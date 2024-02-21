import React from 'react';
import { BaseCheckProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';

export interface SwitchClasses {
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperSmall: string;
  wrapperLarge: string;
  indicator: string;
  content: string;
  wrapperChecked: string;
  wrapperDisabled: string;
  loading: string;
  textPadding: string;
}

export interface SwitchProps
  extends Omit<BaseCheckProps, 'defaultChecked'>,
    Pick<CommonType, 'style' | 'className' | 'size'> {
  jssStyle?: {
    switch?: () => SwitchClasses;
  };
  /**
   * @en content with checked and unchecked
   * @cn 选中和未选中时的内容
   */
  content?: [React.ReactNode, React.ReactNode];
   /**
   * @en loading
   * @cn 加载中
   * @default false
   */
  loading?: boolean;
   /**
   * @en set while no checked
   * @cn checked 未设置的情况下， checked = value
   */
  value?: boolean;
  /**
   * @en defaultValue 和 value 类型相同
   * @cn 默认值  和 value 类型相同
   */
  defaultValue?: boolean;
  /**
   * @en checked is status
   * @cn checked 表示选中状态
   */
  onChange?: (value: boolean) => void;
  beforeChange?: (value: boolean) => boolean | undefined;
}
