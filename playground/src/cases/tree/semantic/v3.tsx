import { Tree } from 'shineout-v3';

const treeData = [
  { id: '1', name: 'Node 1', children: [{ id: '1-1', name: 'Child 1-1' }, { id: '1-2', name: 'Child 1-2' }] },
  { id: '2', name: 'Node 2', children: [{ id: '2-1', name: 'Child 2-1' }] },
  { id: '3', name: 'Node 3 (leaf)' },
];

export default function Demo() {
  return (
    <Tree
      data={treeData}
      keygen='id'
      renderItem={(node: any) => node.name}
      defaultExpandAll
      styles={{
        root: { border: '1px solid #f0f0f0', borderRadius: 8, padding: 8 },
        node: { marginBottom: 2 },
        content: { borderRadius: 4, padding: '2px 8px' },
        icon: { color: '#1890ff' },
      }}
    />
  );
}
