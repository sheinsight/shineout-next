import { Tree } from 'antd';

const treeData = [
  { key: '1', title: 'Node 1', children: [{ key: '1-1', title: 'Child 1-1' }, { key: '1-2', title: 'Child 1-2' }] },
  { key: '2', title: 'Node 2', children: [{ key: '2-1', title: 'Child 2-1' }] },
  { key: '3', title: 'Node 3 (leaf)' },
];

export default function Demo() {
  return (
    <Tree
      treeData={treeData}
      defaultExpandAll
      styles={{
        root: { border: '1px solid #f0f0f0', borderRadius: 8, padding: 8 },
        item: { marginBottom: 2 },
        itemTitle: { borderRadius: 4, padding: '2px 8px' },
        itemSwitcher: { color: '#1890ff' },
      }}
    />
  );
}
