// import { } from '@sheinx/hooks';
// import classNames from 'classnames';
import React from 'react';
import { TableProps } from './table.type';
import SimpleTable from './simple-table';

const Table = <DataItem,>(props: TableProps<DataItem>) => {
  const {} = props;
  // ...

  return <SimpleTable {...props} />;
};

export default Table;
