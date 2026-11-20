import { Table } from 'antd';
import { fmtSalary, fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(4);

const columns = [
  { title: 'Name', render: (_: unknown, d: Person) => fullName(d) },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Salary($)', align: 'right' as const, render: (_: unknown, d: Person) => fmtSalary(d.salary) },
];

export default function Demo() {
  return (
    <Table
      bordered
      rowKey='id'
      columns={columns}
      dataSource={DATA}
      pagination={false}
      summary={() => (
        <Table.Summary>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
            <Table.Summary.Cell index={1}>{1347016}</Table.Summary.Cell>
            <Table.Summary.Cell index={2}>{2341312}</Table.Summary.Cell>
          </Table.Summary.Row>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}>Balance</Table.Summary.Cell>
            <Table.Summary.Cell index={1} colSpan={2}>
              {1234}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
    />
  );
}
