/**
 * cn - 表头附着
 *    -- 在滚屏场景下，可以设置 sticky 属性使表头附着顶部
 * en - Sticky Header
 *    -- Use the sticky attribute to sticky the header
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

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

const data: TableRowData[] = user.fetchSync(20);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => {
  return <Table sticky={{ top: 65, css: true }} data={data} columns={columns} keygen='id' />;
};

export default App;
