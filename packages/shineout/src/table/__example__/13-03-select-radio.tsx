/**
 * cn - 单选
 *    -- 设置 `radio` 属性实现单选效果
 * en - Select signle
 *    -- Set the `radio` attribute to achieve the radio effect
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
type TableProps = TYPE.Table.Props<TableRowData, number>;
type TableOnRowSelect = TableProps['onRowSelect'];

const data: TableRowData[] = user.fetchSync(20);

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
  const [selectedValue, setSelectedValue] = useState(3);

  const handelRowSelect: TableOnRowSelect = (v) => {
    setSelectedValue(v);
  };
  return (
    <Table
      keygen='id'
      radio
      data={data}
      columns={columns}
      value={selectedValue}
      style={{ height: 300 }}
      onRowSelect={handelRowSelect}
      format='id'
    />
  );
};

export default App;
