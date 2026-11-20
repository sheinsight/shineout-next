import { TreeSelect } from 'antd';

const treeData = [
  { value: '1', title: 'Asia', children: [{ value: '1-1', title: 'China' }, { value: '1-2', title: 'Japan' }] },
  { value: '2', title: 'Europe', children: [{ value: '2-1', title: 'France' }, { value: '2-2', title: 'Germany' }] },
];

export default function Demo() {
  return (
    <TreeSelect
      style={{ width: '100%' }}
      treeData={treeData}
      placeholder='Select a location'
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 6 },
        popup: {
          root: { borderRadius: 4 },
          item: { borderRadius: 4 },
        },
      }}
    />
  );
}
