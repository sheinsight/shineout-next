/**
 * cn - 行样式
 *    -- 通过 `rowClassName` 设置单行样式（使用了 rowClassName 必须给 td 指定背景色）
 * en - Row ClassName
 *    -- Set the `rowClassName` property to set row style. (You must specify td background-color when the rowClassName is set)
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles(
  {
    danger: {
      'table & td': {
        backgroundColor: '#FCE6E6',
      },
    },
    success: {
      'table & td': {
        backgroundColor: '#E4FCED',
      },
    },
  },
  { name: 'custom-table' },
);

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;
type TableProps = TYPE.Table.Props<TableRowData, TableRowData[]>;
type TableRowClassName = TableProps['rowClassName'];

const data: TableRowData[] = user.fetchSync(5);

const columns: TableColumnItem[] = [
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => {
  const classes = useStyle();

  const rowClassName: TableRowClassName = (d) => {
    if (d.id === 2) return classes.danger;
    if (d.id === 3) return classes.success;
    return undefined;
  };
  return <Table keygen='id' columns={columns} data={data} rowClassName={rowClassName} />;
};

export default App;
