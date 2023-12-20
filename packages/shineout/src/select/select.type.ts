import {
  SelectProps as UnStyledSelectProps,
  SelectPropsA as UnStyledSelectPropsA,
  SelectPropsB as UnStyledSelectPropsB,
} from '@sheinx/base';

export type SelectProps<DataItem, Value> = Omit<UnStyledSelectProps<DataItem, Value>, 'jssStyle'>;
export type SelectPropsA<DataItem, Value> = Omit<UnStyledSelectPropsA<DataItem, Value>, 'jssStyle'>;
export type SelectPropsB<DataItem, Value> = Omit<UnStyledSelectPropsB<DataItem, Value>, 'jssStyle'>;
