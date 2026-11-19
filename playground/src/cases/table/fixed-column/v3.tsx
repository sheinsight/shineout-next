import { Table } from 'shineout-v3';
import { fmtSalary, fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(20);

const columns: any[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'First Name', group: 'Name', render: 'firstName', width: 120 },
  { title: 'Last Name', fixed: 'left', group: 'Name', render: 'lastName', width: 120 },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  { title: 'Salary($)', fixed: 'right', align: 'right', width: 100, render: (d: Person) => fmtSalary(d.salary) },
];

export default function Demo() {
  return (
    <Table bordered keygen='id' width={1500} style={{ height: 300 }} columns={columns} data={DATA} />
  );
}
