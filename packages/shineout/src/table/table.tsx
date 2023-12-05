import React from 'react';
import { Table } from '@sheinx/base';
import {
  useTableStyle,
  useCheckboxStyle,
  useRadioStyle,
  useSpinStyle,
  usePaginationStyle,
  useInputStyle,
  useButtonStyle,
  useEmptyStyle,
} from '@sheinx/shineout-style';
import { TableProps } from './table.type';

const jssStyle = {
  table: useTableStyle,
  checkbox: useCheckboxStyle,
  radio: useRadioStyle,
  spin: useSpinStyle,
  pagination: usePaginationStyle,
  input: useInputStyle,
  button: useButtonStyle,
  empty: useEmptyStyle,
};
export default <DataItem, Value>(props: TableProps<DataItem, Value>) => {
  return <Table jssStyle={jssStyle} {...props} />;
};
