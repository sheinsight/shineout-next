/**
 * cn - 选择行合并
 *    -- 给 `type` 为 checkbox 的列设置 rowSpan 属性，可以合并选择行
 * en - Select row span
 *    -- Set the rowSpan property of the column with type checkbox to merge the selection row
 */
import React, { useState } from 'react';
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
type TableProps = TYPE.Table.Props<TableRowData, number[]>;
type TableOnRowSelect = TableProps['onRowSelect'];

const data: TableRowData[] = user.fetchSync(20);

const rowSpan = (a: TableRowData, _next: TableRowData) => a.id % 3 === 0;
const columns: TableColumnItem[] = [
  {
    type: 'checkbox',
    rowSpan,
  },
  {
    width: 60,
    title: 'id',
    render: 'id',
  },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState([2, 3, 5]);

  const handelRowSelect: TableOnRowSelect = (v) => {
    setSelectedValue(v);
  };
  return (
    <div>
      <Table
        keygen='id'
        data={data}
        columns={columns}
        value={selectedValue}
        style={{ height: 300 }}
        onRowSelect={handelRowSelect}
        format={'id'}
      />
      <div style={{ wordBreak: 'break-all', marginTop: 24, fontSize: 14 }}>
        selected rows:
        {JSON.stringify(selectedValue)}
      </div>
    </div>
  );
};

export default App;
