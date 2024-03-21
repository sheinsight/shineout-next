import { CascaderProps as UnStyledCascaderProps, CascaderRef as ComponentRef } from '@sheinx/base';
import { KeygenResult } from '@sheinx/hooks';
import { GetWithFieldProps } from '../hooks/use-field-common';
export type BaseCascaderProps<DataItem, Value extends KeygenResult[]> = Omit<
  UnStyledCascaderProps<DataItem, Value>,
  'jssStyle'
>;

/**
 * @title Cascader
 */
export type CascaderProps<DataItem, Value extends KeygenResult[]> = GetWithFieldProps<
  BaseCascaderProps<DataItem, Value>,
  BaseCascaderProps<DataItem, Value>['value']
>;

/**
 * @title CascaderRef
 */
export type CascaderRef = ComponentRef;
