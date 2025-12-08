/**
 * cn - 可展开嵌套Table
 *    --
 * en - Expand nested Table
 *    --
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

const data1: TableRowData[] = user.fetchSync(1);

const columns1: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  {
    title: 'First Name2',
    group: 'Name',
    fixed: 'left',
    render: 'firstName',
    width: 120,
  },
  {
    title: 'Last Name2',
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

const App1: React.FC = () => (
  <Table keygen='id' width={1500} columns={columns1} data={data1} bordered />
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

const data: TableRowData[] = user.fetchSync(10);

const columns: TableColumnItem[] = [
  {
    width: 50,
    type: 'row-expand',
    fixed: 'left',
    render: () => {
      return () => (
        <App1 />
      );
    },
  },
  { title: 'Name', fixed: 'left', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    fixed: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => (
  <Table
    keygen='id'
    data={data}
    columns={columns}
    style={{ height: 300 }}
    width={1500}
    onRowClick={(d, i) => console.log(d, i)}
  />
);

export default App;
