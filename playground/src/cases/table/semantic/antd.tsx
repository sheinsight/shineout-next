import { Table } from 'antd';

interface Item { id: number; name: string; age: number; email: string }
const DATA: Item[] = [
  { id: 1, name: 'Alice', age: 28, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 32, email: 'bob@example.com' },
  { id: 3, name: 'Carol', age: 25, email: 'carol@example.com' },
];

const columns = [
  { title: 'Name', dataIndex: 'name', width: 120 },
  { title: 'Age', dataIndex: 'age', width: 80 },
  { title: 'Email', dataIndex: 'email' },
];

export default function Demo() {
  return (
    <Table
      rowKey='id'
      columns={columns}
      dataSource={DATA}
      bordered
      sticky
      pagination={{ pageSize: 10 }}
      summary={() => (
        <Table.Summary>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={2}>
              Total
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2}>3 records</Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
      styles={{
        root: { borderRadius: 8, overflow: 'hidden' },
        header: {
          wrapper: { background: '#fafafa' },
          cell: { padding: 4, fontWeight: 600 },
        },
        body: {
          row: { transition: 'background 0.2s' },
          cell: { padding: 4 },
        },
        footer: { background: '#f5f5f5' },
        pagination: { root: { marginTop: 16, padding: '0 8px' } },
      }}
    />
  );
}
