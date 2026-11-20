import { Table } from 'shineout-v3';
import { fmtSalary, fullName, makePeople, type Person } from '../_shared/data';

// 每 3 行有 1 行 salary >= 300000，才有可展开的行（原示例的随机数据里也有一部分行可展开）
const DATA = makePeople(100).map((d, i) => (i % 3 === 0 ? { ...d, salary: 300000 + (d.salary % 100000) } : d));

const columns: any[] = [
  {
    width: 40,
    type: 'row-expand',
    render: (d: Person) => {
      if (d.salary < 300000) return undefined;
      return () => <div style={{ padding: '8px 12px', wordBreak: 'break-all' }}>{JSON.stringify(d)}</div>;
    },
  },
  { title: 'Name', render: (d: Person) => fullName(d) },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  { title: 'Salary($)', align: 'right', render: (d: Person) => fmtSalary(d.salary) },
];

export default function Demo() {
  return (
    <Table keygen='id' data={DATA} columns={columns} style={{ height: 300 }} />
  );
}
