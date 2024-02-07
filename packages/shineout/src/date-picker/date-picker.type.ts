import type { DatePickerProps as UnStyledDatePickerProps, DateTimeType } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type DatePickerValueType = DateTimeType | DateTimeType[];

export type BaseDatePickerProps<Value extends DatePickerValueType> = Omit<
  UnStyledDatePickerProps<Value>,
  'jssStyle'
>;

/**
 * @title DatePicker
 */
export type DatePickerProps<Value extends DatePickerValueType = DatePickerValueType> =
  GetWithFieldProps<
    BaseDatePickerProps<Value>,
    BaseDatePickerProps<Value>['value'],
    string | string[]
  >;
