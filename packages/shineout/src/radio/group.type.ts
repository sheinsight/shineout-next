import { RadioGroupProps as UnStyledRadioGroupProps } from '@sheinx/base';
export type RadioGroupProps<DataItem, Value> = Omit<
  UnStyledRadioGroupProps<DataItem, Value>,
  'jssStyle'
>;
