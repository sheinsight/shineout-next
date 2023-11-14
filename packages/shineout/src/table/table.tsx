import React from 'react';
import { Table } from '@sheinx/base';
import { useTableStyle } from '@sheinx/shineout-style';
import { TableProps } from './table.type';

const jssStyle = {
  table: useTableStyle,
};
export default (props: TableProps) => {
  return <Table jssStyle={jssStyle} {...props} />;
};
