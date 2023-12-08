import { SliderProps as UnStyledSliderProps } from '@sheinx/base';

export type SliderProps<Value extends number | number[]> = Omit<
  UnStyledSliderProps<Value>,
  'jssStyle'
>;
