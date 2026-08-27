/**
 * Table Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { TableSemanticKey } from '@sheinx/base';
import { Table } from 'shineout';

const columns = [
  { title: 'Name', render: (d: any) => d.name, width: 120 },
  { title: 'Age', render: (d: any) => d.age, width: 80 },
  { title: 'Email', render: (d: any) => d.email },
];

const data = [
  { id: 1, name: 'Alice', age: 28, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 32, email: 'bob@example.com' },
  { id: 3, name: 'Carol', age: 25, email: 'carol@example.com' },
];

const summary = [[
  { render: () => 'Total', colSpan: 2 },
  { render: () => '3 records' },
]];

const TableSemanticDemo: React.FC = () => (
  <div>
    <Table
      keygen='id'
      columns={columns}
      data={data}
      bordered
      sticky
      summary={summary}
      pagination={{ pageSize: 10 }}
    />
  </div>
);

const tableSemantic: SemanticSchema<TableSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Table 最外层容器',
      en: 'Table outermost wrapper element',
      version: '3.10.0',
      example: `<Table
  classNames={{ root: 'my-table' }}
  styles={{ root: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'header',
      cn: '表头容器（仅 sticky/virtual 模式下生效）',
      en: 'Table header wrapper (only in sticky/virtual mode)',
      version: '3.10.0',
      example: `<Table
  sticky
  classNames={{ header: 'my-header' }}
  styles={{ header: { background: '#fafafa' } }}
/>`,
    },
    {
      key: 'headerRow',
      cn: '表头行 tr',
      en: 'Table header row (tr element)',
      version: '3.10.0',
      example: `<Table
  classNames={{ headerRow: 'my-header-row' }}
  styles={{ headerRow: { height: 48 } }}
/>`,
    },
    {
      key: 'headerCell',
      cn: '表头单元格 th',
      en: 'Table header cell (th element)',
      version: '3.10.0',
      example: `<Table
  classNames={{ headerCell: 'my-header-cell' }}
  styles={{ headerCell: { fontWeight: 600 } }}
/>`,
    },
    {
      key: 'bodyRow',
      cn: '表体行 tr',
      en: 'Table body row (tr element)',
      version: '3.10.0',
      example: `<Table
  classNames={{ bodyRow: 'my-body-row' }}
  styles={{ bodyRow: { height: 40 } }}
/>`,
    },
    {
      key: 'bodyCell',
      cn: '表体单元格 td',
      en: 'Table body cell (td element)',
      version: '3.10.0',
      example: `<Table
  classNames={{ bodyCell: 'my-body-cell' }}
  styles={{ bodyCell: { padding: '8px 12px' } }}
/>`,
    },
    {
      key: 'footer',
      cn: '表脚容器（仅 sticky/virtual 模式下生效）',
      en: 'Table footer wrapper (only in sticky/virtual mode)',
      version: '3.10.0',
      example: `<Table
  sticky
  summary={[[{ render: () => 'Total' }]]}
  classNames={{ footer: 'my-footer' }}
  styles={{ footer: { background: '#fafafa' } }}
/>`,
    },
    {
      key: 'footerCell',
      cn: '表脚单元格 td',
      en: 'Table footer cell (td element)',
      version: '3.10.0',
      example: `<Table
  summary={[[{ render: () => 'Total' }]]}
  classNames={{ footerCell: 'my-footer-cell' }}
  styles={{ footerCell: { fontWeight: 600 } }}
/>`,
    },
    {
      key: 'pagination',
      cn: '分页组件容器',
      en: 'Pagination wrapper',
      version: '3.10.0',
      example: `<Table
  classNames={{ pagination: 'my-pagination' }}
  styles={{ pagination: { marginTop: 16 } }}
/>`,
    },
  ],
  demo: TableSemanticDemo,
};

export default tableSemantic;
