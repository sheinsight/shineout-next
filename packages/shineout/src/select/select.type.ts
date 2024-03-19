import {
  SelectPropsBase as UnStyledSelectPropsBase,
  SelectProps as UnStyledSelectProps,
  SelectPropsA as UnStyledSelectPropsA,
  SelectPropsB as UnStyledSelectPropsB,
} from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type SelectPropsComponent<DataItem, Value> = Omit<
  UnStyledSelectProps<DataItem, Value>,
  'jssStyle'
>;
export type SelectPropsComponentA<DataItem, Value> = Omit<
  UnStyledSelectPropsA<DataItem, Value>,
  'jssStyle'
>;
export type SelectPropsComponentB<DataItem, Value> = Omit<
  UnStyledSelectPropsB<DataItem, Value>,
  'jssStyle'
>;

export type SelectPropsBaseComp<DataItem, Value> = Omit<
  UnStyledSelectPropsBase<DataItem, Value>,
  'jssStyle'
>;

export type SelectProps<DataItem, Value> = GetWithFieldProps<
  SelectPropsComponent<DataItem, Value>,
  SelectPropsComponent<DataItem, Value>['value']
>;

export type SelectPropsA<DataItem, Value> = GetWithFieldProps<
  SelectPropsComponentA<DataItem, Value>,
  SelectPropsComponentA<DataItem, Value>['value']
>;

export type SelectPropsB<DataItem, Value> = GetWithFieldProps<
  SelectPropsComponentB<DataItem, Value>,
  SelectPropsComponentB<DataItem, Value>['value']
>;

/**
 * @title Select
 */
export type SelectPropsBase<DataItem, Value> = GetWithFieldProps<
  SelectPropsBaseComp<DataItem, Value>,
  SelectPropsBaseComp<DataItem, Value>['value']
>;
