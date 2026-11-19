import { Table } from 'shineout-v3';
import { fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(4);

const SIZES: any[] = ['small', 'default', 'large'];

const columns: any[] = [
  { title: 'Name', render: (d: Person) => fullName(d) },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {SIZES.map((s) => (
        <Table key={s} keygen='id' size={s} columns={columns} data={DATA} />
      ))}
    </div>
  );
}
