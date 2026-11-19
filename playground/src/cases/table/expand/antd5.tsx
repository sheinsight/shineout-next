import { Table } from 'antd-v5';
import { fmtSalary, fullName, makePeople, type Person } from '../_shared/data';

// 每 3 行有 1 行 salary >= 300000，才有可展开的行（原示例的随机数据里也有一部分行可展开）
const DATA = makePeople(100).map((d, i) => (i % 3 === 0 ? { ...d, salary: 300000 + (d.salary % 100000) } : d));

const columns = [
  { title: 'Name', render: (_: unknown, d: Person) => fullName(d) },
  { title: 'Office', dataIndex: 'office' },
  { title: 'Start Date', dataIndex: 'start' },
  { title: 'Salary($)', align: 'right' as const, render: (_: unknown, d: Person) => fmtSalary(d.salary) },
];

export default function Demo() {
  return (
    <Table
      rowKey='id'
      dataSource={DATA}
      columns={columns}
      pagination={false}
      scroll={{ y: 300 }}
      expandable={{
        expandedRowRender: (d) => <div style={{ padding: '8px 12px', wordBreak: 'break-all' }}>{JSON.stringify(d)}</div>,
        rowExpandable: (d) => d.salary >= 300000,
      }}
    />
  );
}
