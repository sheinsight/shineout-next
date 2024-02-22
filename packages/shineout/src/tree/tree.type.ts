import { GetWithFieldProps } from '../hooks/use-field-common';

import { TreeProps as UnStyledTreeProps } from '@sheinx/base';

export type BaseTreeProps<DataItem, Value extends any[]> = Omit<
  UnStyledTreeProps<DataItem, Value>,
  'jssStyle'
>;

/**
 * @title Tree
 */
export type TreeProps<DataItem, Value extends any[]> = GetWithFieldProps<
  BaseTreeProps<DataItem, Value>,
  BaseTreeProps<DataItem, Value>['value']
>;
