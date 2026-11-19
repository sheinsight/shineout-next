import { Table } from 'shineout-v2';
import { makeTree, fullName, type TreeNode } from '../_shared/data';

const DATA = makeTree();

const columns: any[] = [
  { title: 'Name', render: (d: TreeNode) => fullName(d as any), width: 300, treeIndent: 22, treeColumnsName: 'children' },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

export default function Demo() {
  return (
    <Table bordered height={300} keygen='id' columns={columns} data={DATA} />
  );
}
