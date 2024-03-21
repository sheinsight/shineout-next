import { TreeProps as UnStyledTreeProps } from '@sheinx/base';

/**
 * @title Tree
 */
export type TreeProps<DataItem, Value extends any[]> = Omit<
  UnStyledTreeProps<DataItem, Value>,
  'jssStyle' | 'getDatum'
>;
