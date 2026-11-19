import { Table } from 'antd-v5';
import { makeTree, fullName, type TreeNode } from '../_shared/data';

const DATA = makeTree();

const columns = [
  { title: 'Name', render: (_: unknown, d: TreeNode) => fullName(d as any), width: 300 },
  { title: 'Country', dataIndex: 'country' },
  { title: 'Position', dataIndex: 'position' },
  { title: 'Office', dataIndex: 'office' },
];

export default function Demo() {
  return (
    <Table bordered rowKey='id' columns={columns} dataSource={DATA} pagination={false} scroll={{ y: 300 }} expandable={{ indentSize: 22 }} />
  );
}
