import { CheckboxGroupProps as UnStyledCheckboxGroupProps } from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type BaseCheckboxGroupProps<DataItem, Value extends any[]> = Omit<
  UnStyledCheckboxGroupProps<DataItem, Value>,
  'jssStyle'
>;

export type CheckboxGroupProps<DataItem, Value extends any[]> = GetWithFieldProps<
  BaseCheckboxGroupProps<DataItem, Value>,
  BaseCheckboxGroupProps<DataItem, Value>['value']
>;
