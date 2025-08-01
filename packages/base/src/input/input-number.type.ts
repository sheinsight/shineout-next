import { InputNumberProps as NumberProps } from '@sheinx/hooks';

import { GetCommonProps, InputStyle, SimpleInputProps } from './input.type';

export type NumValueType = string | number | null | undefined;

export interface InputNumberProps
  extends GetCommonProps<SimpleInputProps, NumValueType>,
    Omit<NumberProps, 'value' | 'onChange'> {
  jssStyle: InputStyle;
  /**
   * @en Hides the increment/decrement arrow buttons. Users can still type values or use keyboard arrows
   * @cn 隐藏增加/减少箭头按钮。用户仍可以输入值或使用键盘箭头
   * @default false
   * @when For cleaner UI or when step controls are not needed
   */
  hideArrow?: boolean;
}
