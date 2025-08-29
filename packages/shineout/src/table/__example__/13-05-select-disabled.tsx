/**
 * cn - 选择行禁用
 *    -- `disabled` 属性设置为 true 时禁用全部, 设置为函数时禁用指定行
 * en - Select disabled
 *    -- Set `disabled` to true to disable all, set to a function to disable a specific row
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
        disabled={(d) => d.id === 3}
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
