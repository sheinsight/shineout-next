import { RadioGroupProps as UnStyledRadioGroupProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';
export type BaseRadioGroupProps<DataItem, Value> = Omit<
  UnStyledRadioGroupProps<DataItem, Value>,
  'jssStyle'
>;

/**
 * @title Radio.Group
 * @sort 2
 */
export type RadioGroupProps<DataItem, Value> = GetWithFieldProps<
  BaseRadioGroupProps<DataItem, Value>,
  BaseRadioGroupProps<DataItem, Value>['value']
>;
