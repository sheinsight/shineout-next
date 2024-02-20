import { TreeSelectProps as UnStyledTreeSelectProps, ComponentRef } from '@sheinx/base';

/**
 * @title TreeSelect
 */
export type TreeSelectProps<DataItem, Value> = Omit<
  UnStyledTreeSelectProps<DataItem, Value>,
  'jssStyle'
>;

/**
 * @title TreeSelectRef
 */
export type TreeSelectRef<DataItem, Value> = ComponentRef<DataItem, Value>;