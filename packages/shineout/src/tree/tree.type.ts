import { KeygenResult } from '@sheinx/hooks';
import { GetWithFieldProps } from '../hooks/use-field-common';

import { TreeProps as UnStyledTreeProps } from '@sheinx/base';

export type BaseTreeProps<DataItem, Value extends KeygenResult> = Omit<
  UnStyledTreeProps<DataItem, Value>,
  'jssStyle'
>;

/**
 * @title Tree
 */
export type TreeProps<DataItem, Value extends KeygenResult> = GetWithFieldProps<
  BaseTreeProps<DataItem, Value>,
  BaseTreeProps<DataItem, Value>['value']
>;
