/**
 * cn - scroll-y-debug
 *    -- scroll-y-debug
 * en - scroll-y-debug
 *    -- scroll-y-debug
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

const data: TableRowData[] = user.fetchSync(10);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  {
    title: 'First Name',
    group: 'Name',
    render: 'firstName',
    width: 120,
  },
  {
    title: 'Last Name',
    fixed: 'left',
    group: 'Name',
    render: 'lastName',
    width: 120,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    fixed: 'right',
    align: 'right',
    width: 100,
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => (
  <>
    <div style={{ height: 300, background: 'yellow', overflow: 'auto' }}>
      <Table
        bordered
        keygen='id'
        width={1500}
        columns={columns}
        data={data}
        sticky={{ top: 0, css: true }}
      />
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
      <p>占位内容……</p>
    </div>
  </>
);

export default App;
