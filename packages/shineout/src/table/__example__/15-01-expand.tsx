/**
 * cn - 可展开
 *    -- 需要展开行时，可以增加一个 `type` 为 'expand' 的 column，`render` 函数返回函数时，表示此行可以展开，内容为此函数返回结果
 * en - Expand
 *    -- Add a column with `type` 'expand' and the render function returns a function, that means the row can be expanded. The content is the result returned by this function
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
  {
    width: 10,
    type: 'row-expand',
    render: (d) => {
      if (d.salary < 300000) return undefined;
      return () => (
        <div style={{ padding: '8px 12px', wordBreak: 'break-all' }}>{JSON.stringify(d)}</div>
      );
    },
  },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary($)',
    align: 'right',
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const App: React.FC = () => (
  <Table
    keygen='id'
    data={data}
    columns={columns}
    style={{ height: 300 }}
    onRowClick={(d, i) => console.log(d, i)}
  />
);

export default App;
