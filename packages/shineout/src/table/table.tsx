import React from 'react';
import { Table } from '@sheinx/base';
import {
  useTableStyle,
  useSpinStyle,
  usePaginationStyle,
  useButtonStyle,
  useEmptyStyle,
  useInputStyle,
  useCheckboxStyle,
  useRadioStyle,
  useSelectStyle,
  useCascaderStyle,
  useTreeSelectStyle,
  useDatePickerStyle,
  useSwitchStyle,
  usePopoverStyle,
  useTreeStyle,
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
  select: useSelectStyle,
  cascader: useCascaderStyle,
  treeSelect: useTreeSelectStyle,
  datePicker: useDatePickerStyle,
  switch: useSwitchStyle,
  popover: usePopoverStyle,
  tree: useTreeStyle
};
export default <DataItem, Value>(props: TableProps<DataItem, Value>) => {
  return <Table jssStyle={jssStyle} {...props} />;
};
