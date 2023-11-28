import React from 'react';
import { Table } from '@sheinx/base';
import {
  useTableStyle,
  useCheckboxStyle,
  useRadioStyle,
  useSpinStyle,
} from '@sheinx/shineout-style';
import { TableProps } from './table.type';

const jssStyle = {
  table: useTableStyle,
  checkbox: useCheckboxStyle,
  radio: useRadioStyle,
  spin: useSpinStyle,
};
export default <DataItem, Value>(props: TableProps<DataItem, Value>) => {
  return <Table jssStyle={jssStyle} {...props} />;
};
