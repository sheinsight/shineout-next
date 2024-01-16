import { TreeSelectProps as UnStyledTreeSelectProps } from '@sheinx/base';

export type TreeSelectProps<DataItem, Value> = Omit<
  UnStyledTreeSelectProps<DataItem, Value>,
  'jssStyle'
>;
