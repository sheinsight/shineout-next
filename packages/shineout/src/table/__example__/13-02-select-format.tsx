/**
 * cn - 选择行格式化
 *    -- 使用 format，可以格式化返回的数据
 * en - Select format
 *    -- Set format property to format the returned value
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
type TableProps = TYPE.Table.Props<TableRowData, string[]>;
type TableOnRowSelect = TableProps['onRowSelect'];

const data: TableRowData[] = user.fetchSync(20);
const value = [2, 3, 5].map((i) => `${data[i].firstName} ${data[i].lastName}`);

const columns: TableColumnItem[] = [
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
  const [selectedValue, setSelectedValue] = useState(value);

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
        format={(d) => `${d.firstName} ${d.lastName}`}
      />
      <div style={{ wordBreak: 'break-all', marginTop: 24, fontSize: 14 }}>
        selected rows:
        {JSON.stringify(selectedValue)}
      </div>
    </div>
  );
};

export default App;
