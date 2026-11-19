import { useState } from 'react';
import { TreeSelect } from 'shineout-v3';
import { data } from '../_shared/data';

export default function Demo() {
  const [value, setValue] = useState<any>([]);
  const [open, setOpen] = useState(false);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <TreeSelect
        width={300}
        multiple
        value={value}
        onChange={setValue}
        clearable
        keygen='id'
        renderItem={(node: any) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
        open={open}
        onCollapse={setOpen}
      />
    </>
  );
}
