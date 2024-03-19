import {
  TreeSelectProps as UnStyledTreeSelectProps,
  TreeSelectRef as _TreeSelectRef,
} from '@sheinx/base';

import { GetWithFieldProps } from '../hooks/use-field-common';

export type BaseTreeSelectProps<DataItem, Value> = Omit<
  UnStyledTreeSelectProps<DataItem, Value>,
  'jssStyle'
>;

/**
 * @title TreeSelect
 */
export type TreeSelectProps<DataItem, Value> = GetWithFieldProps<
  BaseTreeSelectProps<DataItem, Value>,
  Value
>;

/**
 * @title TreeSelectRef
 */
export type TreeSelectRef<DataItem, Value> = _TreeSelectRef<DataItem, Value>;
