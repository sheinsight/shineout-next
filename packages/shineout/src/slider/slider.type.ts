import { SliderProps as UnStyledSliderProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type SliderValueType = number | number[];
export type BaseSliderProps<Value extends SliderValueType> = Omit<
  UnStyledSliderProps<Value>,
  'jssStyle'
>;

/**
 * @title Slider
 */
export type SliderProps<Value extends SliderValueType> = GetWithFieldProps<
  BaseSliderProps<Value>,
  BaseSliderProps<Value>['value']
>;
