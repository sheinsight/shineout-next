import { Table } from 'antd';
import { fmtSalary, fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(20);

const columns = [
  { title: 'id', dataIndex: 'id', width: 50 },
  {
    title: 'Name',
    children: [
      { title: 'First Name', dataIndex: 'firstName', width: 120 },
      { title: 'Last Name', dataIndex: 'lastName', width: 120, fixed: 'left' as const },
    ],
  },
  { title: 'Country', dataIndex: 'country', width: 200 },
  { title: 'Position', dataIndex: 'position', width: 200 },
  { title: 'Office', dataIndex: 'office', width: 200 },
  { title: 'Start Date', dataIndex: 'start', width: 200 },
  { title: 'Salary($)', fixed: 'right' as const, align: 'right' as const, width: 100, render: (_: unknown, d: Person) => fmtSalary(d.salary) },
];

export default function Demo() {
  return (
    <Table bordered rowKey='id' scroll={{ x: 1500, y: 300 }} columns={columns} dataSource={DATA} pagination={false} />
  );
}
