/**
 * cn - 虚拟列
 *    -- 设置 `virtualColumn` 为 true 开启虚拟列的水平虚拟滚动，前提条件是需要给每一列设置宽度
 * en - Virtual Column
 *    -- Set `virtualColumn` to true to enable horizontal virtual scrolling for virtual columns
 *    -- The prerequisite is to set the width for each column
 */

import React from 'react';
import { Table, TYPE } from 'shineout';
import { user } from '@sheinx/mock';


interface TableRowData {
  id: number;
  salary: number;
}
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData> & { width: number };

const data: TableRowData[] = user.fetchSync(10);

const columns: TableColumnItem[] = []

const count = 100;
for (let i = 0; i < count; i++) {
  columns.push({
    title: `${i + 1}($)`,
    align: 'right',
    width: 100,
    fixed: i  === 1 ? 'left' : i === count - 2 ? 'right' : undefined,
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  });
}

const App: React.FC = () => (
  <Table
    virtualColumn
    keygen='id'
    width={columns.reduce((sum, col) => sum + col.width, 0)}
    columns={columns}
    data={data}
    bordered
  />
);

export default App;
