import { Table } from 'shineout-v3';
import { makePeople } from '../_shared/data';

const DATA = makePeople(4);

const name = (
  <span style={{ background: '#E8EBF0', display: 'block', lineHeight: '40px', color: '#141737' }}>Name</span>
);
const other = <span>Other</span>;
const columns: any[] = [
  { title: 'First Name', render: 'firstName', group: [name, 'True Name'] },
  { title: 'Last Name', render: 'lastName', group: [name, 'True Name'] },
  { title: 'Nick Name', render: () => 'nickname', group: name },
  { title: 'Country', render: 'country' },
  { title: 'Office', render: 'office', group: other },
  { title: 'Position', render: 'position', group: other },
];

export default function Demo() {
  return (
    <Table bordered keygen='id' columns={columns} data={DATA} />
  );
}
