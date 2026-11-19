import { Table } from 'shineout-v2';
import { fmtSalary, fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(10);

const columns: any[] = [
  { title: 'Name', fixed: 'left', sorter: 'firstName', defaultOrder: 'asc', render: (d: Person) => fullName(d) },
  { title: 'Age', render: 'age', sorter: 'age', align: 'right' },
  { title: 'Position', render: 'position' },
  { title: 'Salary($)', align: 'right', render: (d: Person) => fmtSalary(d.salary) },
];
const sorters: Record<string, (order: 'asc' | 'desc') => (a: Person, b: Person) => number> = {
  age: (order) => (a, b) => (order === 'asc' ? a.age - b.age : b.age - a.age),
  firstName: (order) => (a, b) => (order === 'asc' ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName)),
};

export default function Demo() {
  return (
    <Table striped keygen='id' data={DATA} columns={columns} sorter={(name: string, order: 'asc' | 'desc') => sorters[name](order)} />
  );
}
