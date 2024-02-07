import { TreeSelectProps as UnStyledTreeSelectProps } from '@sheinx/base';

/**
 * @title TreeSelect
 */
export type TreeSelectProps<DataItem, Value> = Omit<
  UnStyledTreeSelectProps<DataItem, Value>,
  'jssStyle'
>;
