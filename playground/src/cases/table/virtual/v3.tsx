import { Table } from 'shineout-v3';
import { fmtSalary, fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(10000);

const columns: any[] = [
  { title: 'id', render: 'id', width: 80 },
  { title: 'Name', fixed: 'left', render: (d: Person) => fullName(d), width: 160 },
  { title: 'Country', render: 'country', width: 200 },
  { title: 'Position', render: 'position', width: 200 },
  { title: 'Office', render: 'office', width: 200 },
  { title: 'Start Date', render: 'start', width: 140 },
];
for (let i = 0; i < 50; i++) {
  columns.push({ title: `${i + 1}($)`, align: 'right', width: 100, render: (d: Person) => fmtSalary(d.salary) });
}
const WIDTH = columns.reduce((sum, c) => sum + c.width, 0);

export default function Demo() {
  return (
    <Table
      virtual
      keygen='id'
      width={WIDTH}
      style={{ height: 600 }}
      columns={columns}
      data={DATA}
      bordered
    />
  );
}
