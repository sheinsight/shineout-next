import { SelectProps as UnStyledSelectProps } from '@sheinx/base';

export type SelectProps<DataItem, Value> = Omit<UnStyledSelectProps<DataItem, Value>, 'jssStyle'>;
