import { TreeProps as UnStyledTreeProps, TreeSemanticKey as _TreeSemanticKey } from '@sheinx/base';

export type TreeSemanticKey = _TreeSemanticKey;

/**
 * @title Tree
 */
export type TreeProps<DataItem, Value extends any[]> = Omit<
  UnStyledTreeProps<DataItem, Value>,
  'jssStyle' | 'getDatum'
>;
