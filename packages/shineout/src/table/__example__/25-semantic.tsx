/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / header / headerRow / headerCell / bodyRow / bodyCell / footer / footerCell / pagination）。
 *    -- `header` 和 `footer` 仅在 sticky/virtual 模式下生效。可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / header / headerRow / headerCell / bodyRow / bodyCell / footer / footerCell / pagination).
 *    -- `header` and `footer` only take effect in sticky/virtual mode. See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Table, TYPE } from 'shineout';

interface DataItem {
  id: number;
  name: string;
  age: number;
  email: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<DataItem>;

const columns: TableColumnItem[] = [
  { title: 'Name', render: (d) => d.name, width: 120 },
  { title: 'Age', render: (d) => d.age, width: 80 },
  { title: 'Email', render: (d) => d.email },
];

const data: DataItem[] = [
  { id: 1, name: 'Alice', age: 28, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 32, email: 'bob@example.com' },
  { id: 3, name: 'Carol', age: 25, email: 'carol@example.com' },
];

const summary = [[
  { render: () => 'Total', colSpan: 2 },
  { render: () => '3 records' },
]];

export default () => {
  return (
    <Table
      keygen='id'
      columns={columns}
      data={data}
      bordered
      sticky
      summary={summary}
      pagination={{ pageSize: 10 }}
      styles={{
        root: { borderRadius: 8, overflow: 'hidden' },
        header: { background: '#fafafa' },
        headerCell: { padding: 4, fontWeight: 600 },
        bodyRow: { transition: 'background 0.2s' },
        bodyCell: { padding: 4 },
        footer: { background: '#f5f5f5' },
        footerCell: { padding: 4, fontWeight: 600 },
        pagination: { marginTop: 16, padding: '0 8px' },
      }}
    />
  );
};
