import { Table } from 'antd';
import { fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(4);

const columns = [
  { title: 'Name', render: (_: unknown, d: Person) => fullName(d) },
  { title: 'Country', dataIndex: 'country' },
  { title: 'Position', dataIndex: 'position' },
  { title: 'Office', dataIndex: 'office' },
];

export default function Demo() {
  return (
    <Table rowKey='id' columns={columns} dataSource={DATA} pagination={false} />
  );
}
