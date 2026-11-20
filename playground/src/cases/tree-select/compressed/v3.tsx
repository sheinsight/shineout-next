import { useState } from 'react';
import { TreeSelect } from 'shineout-v3';
import { data } from '../_shared/data';

export default function Demo() {
  const [value, setValue] = useState<any>(['1-1-1','1-1-2','1-1','1-2','1','2-1','2-2','2','3-1','3']);
  return (
    <TreeSelect
      width={300}
      multiple
      value={value}
      compressed
      onChange={setValue}
      clearable
      keygen='id'
      renderItem={(node: any) => `node ${node.title}`}
      data={data}
      placeholder='Please select content'
    />
  );
}
