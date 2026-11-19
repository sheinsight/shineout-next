import { Table } from 'antd';
import { fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(4);

const SIZES: any[] = ['small', 'middle', 'large'];

const columns = [
  { title: 'Name', render: (_: unknown, d: Person) => fullName(d) },
  { title: 'Country', dataIndex: 'country' },
  { title: 'Position', dataIndex: 'position' },
  { title: 'Office', dataIndex: 'office' },
];

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {SIZES.map((s) => (
        <Table key={s} rowKey='id' size={s} columns={columns} dataSource={DATA} pagination={false} />
      ))}
    </div>
  );
}
