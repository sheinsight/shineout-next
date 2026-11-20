import { TreeSelect } from 'shineout-v3';

const treeData = [
  { id: '1', name: 'Asia', children: [{ id: '1-1', name: 'China' }, { id: '1-2', name: 'Japan' }] },
  { id: '2', name: 'Europe', children: [{ id: '2-1', name: 'France' }, { id: '2-2', name: 'Germany' }] },
];

export default function Demo() {
  return (
    <TreeSelect
      data={treeData}
      keygen='id'
      renderItem={(node: any) => node.name}
      placeholder='Select a location'
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 6 },
        header: { background: '#f0f7ff' },
        popup: { borderRadius: 4 },
        list: { padding: 4 },
        option: { borderRadius: 4 },
      }}
    />
  );
}
