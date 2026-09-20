/**
 * cn - 表头附着
 *    -- 在滚屏场景下，可以设置 `sticky` 属性使表头附着顶部。同时设置固定列和 `width` 可以产生横向滚动。
 * en - Sticky Header
 *    -- Use the `sticky` attribute to sticky the header. Setting fixed columns and `width` enables horizontal scrolling.
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

const data: TableRowData[] = user.fetchSync(100);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 80, fixed: 'left' },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Country', render: 'country', width: 200 },
  { title: 'Position', render: 'position', width: 200 },
  { title: 'Office', render: 'office', width: 200 },
  { title: 'Start Date', render: 'start', width: 200 },
  {
    title: 'Salary($)',
    align: 'right',
    width: 120,
    fixed: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => {
  return (
    <Table
      sticky={{ top: 0, css: true }}
      data={data}
      columns={columns}
      keygen='id'
      width={1200}
    />
  );
};

export default App;
