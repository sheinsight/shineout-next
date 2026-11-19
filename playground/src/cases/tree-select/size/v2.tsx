import { useState } from 'react';
import { TreeSelect } from 'shineout-v2';
import { data } from '../_shared/data';

export default function Demo() {
  const [value, setValue] = useState<any>();
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24 }}>
      <TreeSelect
        size='small'
        width={300}
        value={value}
        onChange={setValue}
        clearable
        keygen='id'
        renderItem={(node: any) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      />
      <TreeSelect
        width={300}
        value={value}
        onChange={setValue}
        clearable
        keygen='id'
        renderItem={(node: any) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      />
      <TreeSelect
        size='large'
        width={300}
        value={value}
        onChange={setValue}
        clearable
        keygen='id'
        renderItem={(node: any) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      />
    </div>
  );
}
