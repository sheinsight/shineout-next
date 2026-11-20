import { useState } from 'react';
import { TreeSelect } from 'shineout-v2';
import { data } from '../_shared/data';

export default function Demo() {
  const [value, setValue] = useState<any>();
  return (
    <span data-bench='open'>
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
    </span>
  );
}
