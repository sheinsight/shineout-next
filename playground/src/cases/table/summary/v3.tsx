import { Table } from 'shineout-v3';
import { fmtSalary, fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(4);

const columns: any[] = [
  { title: 'Name', render: (d: Person) => fullName(d) },
  { title: 'Age', render: 'age' },
  { title: 'Salary($)', align: 'right', render: (d: Person) => fmtSalary(d.salary) },
];
const summary = [
  [{ render: () => <span>Total</span> }, { render: () => <span>{1347016}</span> }, { render: () => <span>{2341312}</span> }],
  [{ render: () => <span>Balance</span> }, { render: () => <span>{1234}</span>, colSpan: 2 }],
];

export default function Demo() {
  return (
    <Table bordered keygen='id' columns={columns} data={DATA} summary={summary} />
  );
}
