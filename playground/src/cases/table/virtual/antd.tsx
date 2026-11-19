import { Table } from 'antd';
import { fmtSalary, fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(10000);

const columns: any[] = [
  { title: 'id', dataIndex: 'id', width: 80 },
  { title: 'Name', fixed: 'left', render: (_: unknown, d: Person) => fullName(d), width: 160 },
  { title: 'Country', dataIndex: 'country', width: 200 },
  { title: 'Position', dataIndex: 'position', width: 200 },
  { title: 'Office', dataIndex: 'office', width: 200 },
  { title: 'Start Date', dataIndex: 'start', width: 140 },
];
for (let i = 0; i < 50; i++) {
  columns.push({ title: `${i + 1}($)`, align: 'right', width: 100, render: (_: unknown, d: Person) => fmtSalary(d.salary) });
}
const WIDTH = columns.reduce((sum, c) => sum + c.width, 0);

export default function Demo() {
  return (
    <Table
      virtual
      bordered
      rowKey='id'
      scroll={{ x: WIDTH, y: 600 }}
      columns={columns}
      dataSource={DATA}
      pagination={false}
    />
  );
}
