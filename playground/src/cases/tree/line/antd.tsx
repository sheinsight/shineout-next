import { Tree } from 'antd';

const treeData = [
  {
    key: '0',
    title: 'node 0',
    children: [
      { key: '0-0', title: 'node 0-0', children: [{ key: '0-0-0', title: 'node 0-0-0', children: [{ key: '0-0-0-0', title: 'node 0-0-0-0' }] }] },
      { key: '0-1', title: 'node 0-1', children: [{ key: '0-1-0', title: 'node 0-1-0' }] },
    ],
  },
];

export default function Demo() {
  return <Tree defaultExpandedKeys={['0', '0-0']} treeData={treeData} />;
}
