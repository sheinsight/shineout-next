import { Table } from 'antd';
import { makePeople } from '../_shared/data';

const DATA = makePeople(4);

const name = (
  <span style={{ background: '#E8EBF0', display: 'block', lineHeight: '40px', color: '#141737' }}>Name</span>
);
const columns = [
  {
    title: name,
    children: [
      {
        title: 'True Name',
        children: [
          { title: 'First Name', dataIndex: 'firstName' },
          { title: 'Last Name', dataIndex: 'lastName' },
        ],
      },
      { title: 'Nick Name', render: () => 'nickname' },
    ],
  },
  { title: 'Country', dataIndex: 'country' },
  {
    title: 'Other',
    children: [
      { title: 'Office', dataIndex: 'office' },
      { title: 'Position', dataIndex: 'position' },
    ],
  },
];

export default function Demo() {
  return (
    <Table bordered rowKey='id' columns={columns} dataSource={DATA} pagination={false} />
  );
}
