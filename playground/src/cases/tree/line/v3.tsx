import { Tree } from 'shineout-v3';

const data = [
  {
    id: '0',
    children: [
      { id: '0-0', children: [{ id: '0-0-0', children: [{ id: '0-0-0-0' }] }] },
      { id: '0-1', children: [{ id: '0-1-0' }] },
    ],
  },
];

export default function Demo() {
  return (
    <Tree
      defaultExpanded={['0', '0-0']}
      line={false}
      data={data}
      keygen='id'
      renderItem={(node: any) => <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>}
    />
  );
}
