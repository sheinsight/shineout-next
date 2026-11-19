import { Table } from 'antd';
import { fmtSalary, fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(10);

const columns = [
  { title: 'Name', fixed: 'left' as const, defaultSortOrder: 'ascend' as const, sorter: (a: Person, b: Person) => a.firstName.localeCompare(b.firstName), render: (_: unknown, d: Person) => fullName(d) },
  { title: 'Age', dataIndex: 'age', sorter: (a: Person, b: Person) => a.age - b.age, align: 'right' as const },
  { title: 'Position', dataIndex: 'position' },
  { title: 'Salary($)', align: 'right' as const, render: (_: unknown, d: Person) => fmtSalary(d.salary) },
];

export default function Demo() {
  return (
    <Table rowKey='id' dataSource={DATA} columns={columns} pagination={false} onRow={(_, i) => ({ style: { background: (i ?? 0) % 2 === 1 ? '#fafafa' : undefined } })} />
  );
}
