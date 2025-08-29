/**
 * cn - 选择行
 *    -- 设置 `onRowSelect` 属性，会自动添加选择列
 * en - Select
 *    -- Set the onRowSelect property will automatically add a column with checkbox
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
type TableProps = TYPE.Table.Props<TableRowData, TableRowData[]>;
type TableOnRowSelect = TableProps['onRowSelect'];

const data: TableRowData[] = user.fetchSync(20);

const columns: TableColumnItem[] = [
  {
    type: 'checkbox',
    width: 40,
  },
  {
    title: 'id',
    render: 'id',
    width: 60,
  },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState([data[2]]);
  const handelRowSelect: TableOnRowSelect = (v) => {
    setSelectedValue(v);
  };

  return (
    <div>
      <Table
        data={data}
        width={3000}
        keygen='id'
        columns={columns}
        value={selectedValue}
        style={{ height: 300 }}
        onRowSelect={handelRowSelect}
        prediction={(v, d) => v.id === d.id}
      />
      <div style={{ marginTop: 24, fontSize: 14 }}>{`selected rows: [${selectedValue
        .map((v) => v.id)
        .join(', ')}]`}</div>
    </div>
  );
};

export default App;
