import { Table } from 'shineout-v2';
import { fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(4);

const columns: any[] = [
  { title: 'Name', render: (d: Person) => fullName(d) },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

export default function Demo() {
  return (
    <Table keygen='id' columns={columns} data={DATA} bordered striped />
  );
}
