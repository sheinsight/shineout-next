import { InputNumberProps as NumberProps } from '@sheinx/hooks';

import { GetCommonProps, InputStyle, SimpleInputProps } from './input.type';

export type NumValueType = string | number | null | undefined;

export interface InputNumberProps
  extends GetCommonProps<SimpleInputProps, NumValueType>,
    Omit<NumberProps, 'value' | 'onChange'> {
  jssStyle: InputStyle;
  /**
   * @en Whether to hide increase/decrease buttons
   * @cn 是否隐藏增减按钮
   * @default false
   */
  hideArrow?: boolean;
}
