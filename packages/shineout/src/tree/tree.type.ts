import { KeygenResult } from '@sheinx/hooks';

import { TreeProps as UnStyledTreeProps } from '@sheinx/base';

/**
 * @title Tree
 */
export type TreeProps<DataItem, Value extends KeygenResult> = Omit<
  UnStyledTreeProps<DataItem, Value>,
  'jssStyle'
>;
