/**
 * cn - 无数据
 *    -- empty
 * en - empty
 *    -- empty
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

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

const data: TableRowData[] = [];

const columns: TableColumnItem[] = [
  {
    title: 'id',
    render: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: 'Name',
    fixed: 'left',
    render: (d) => `${d.firstName} ${d.lastName}`,
    width: 160,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', fixed: 'right' },
];

const App: React.FC = () => (
  <Table
    striped
    keygen='id'
    data={data}
    width={1200}
    rowsInView={10}
    columns={columns}
    style={{ height: 400 }}
  />
);

export default App;
