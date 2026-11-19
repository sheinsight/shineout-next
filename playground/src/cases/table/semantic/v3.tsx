import { Table } from 'shineout-v3';

interface Item { id: number; name: string; age: number; email: string }
const DATA: Item[] = [
  { id: 1, name: 'Alice', age: 28, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 32, email: 'bob@example.com' },
  { id: 3, name: 'Carol', age: 25, email: 'carol@example.com' },
];

const columns: any[] = [
  { title: 'Name', render: (d: Item) => d.name, width: 120 },
  { title: 'Age', render: (d: Item) => d.age, width: 80 },
  { title: 'Email', render: (d: Item) => d.email },
];
const summary = [[{ render: () => 'Total', colSpan: 2 }, { render: () => '3 records' }]];

export default function Demo() {
  return (
    <Table
      keygen='id'
      columns={columns}
      data={DATA}
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
}
