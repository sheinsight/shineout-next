import { CascaderProps as UnStyledCascaderProps } from '@sheinx/base';
import { KeygenResult } from '@sheinx/hooks';
import { GetWithFieldProps } from '../hooks/use-field-common';
export type BaseCascaderProps<DataItem, Value extends KeygenResult[]> = Omit<
  UnStyledCascaderProps<DataItem, Value>,
  'jssStyle'
>;

export type CascaderProps<DataItem, Value extends KeygenResult[]> = GetWithFieldProps<
  BaseCascaderProps<DataItem, Value>,
  BaseCascaderProps<DataItem, Value>['value']
>;
