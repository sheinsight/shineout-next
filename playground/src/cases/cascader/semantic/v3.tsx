import { Cascader } from 'shineout-v3';

const data = [
  { id: '1', name: 'Asia', children: [{ id: '1-1', name: 'China', children: [{ id: '1-1-1', name: 'Shanghai' }, { id: '1-1-2', name: 'Beijing' }] }, { id: '1-2', name: 'Japan', children: [{ id: '1-2-1', name: 'Tokyo' }] }] },
  { id: '2', name: 'Europe', children: [{ id: '2-1', name: 'France', children: [{ id: '2-1-1', name: 'Paris' }] }, { id: '2-2', name: 'Germany', children: [{ id: '2-2-1', name: 'Berlin' }] }] },
];

export default function Demo() {
  return (
    <Cascader
      data={data}
      keygen='id'
      renderItem={(node: any) => node.name}
      placeholder='Select a location'
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 6 },
        header: { background: '#f0f7ff' },
        popup: { borderRadius: 4 },
        list: { borderRight: '1px solid #f0f0f0' },
        option: { padding: '8px 12px' },
      }}
    />
  );
}
