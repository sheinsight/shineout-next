import { useState } from 'react';
import { Tree } from 'shineout-v2';

const data = [
  {
    id: '0',
    children: [
      { id: '0-0', children: [{ id: '0-0-0' }] },
      { id: '0-1', children: [{ id: '0-1-0' }] },
      { id: '0-2', children: [{ id: '0-2-0' }] },
    ],
  },
];

export default function Demo() {
  const [value, setValue] = useState<any>([]);
  return (
    <Tree
      line={false}
      value={value}
      data={data}
      keygen='id'
      mode={0}
      defaultExpanded={['0']}
      onChange={setValue}
      disabled={(node: any) => node.id === '0-0'}
      renderItem={(node: any) => <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>}
    />
  );
}
