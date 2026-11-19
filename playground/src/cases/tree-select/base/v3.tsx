import { useState } from 'react';
import { TreeSelect } from 'shineout-v3';
import { data } from '../_shared/data';

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>();
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <TreeSelect
        width={300}
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
