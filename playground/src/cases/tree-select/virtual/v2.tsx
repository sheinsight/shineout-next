import { useState } from 'react';
import { TreeSelect } from 'shineout-v2';
import { makeTree } from '../_shared/data';

const data = makeTree([10, 10, 10]);

export default function Demo() {
  const [value, setValue] = useState<any>([]);
  return (
    <span data-bench='open'>
      <TreeSelect
        width={300}
        value={value}
        mode={2}
        multiple
        onChange={setValue}
        clearable
        keygen='id'
        renderItem={(node: any) => `node ${node.id}`}
        data={data}
        placeholder='Please select content'
      />
    </span>
  );
}
