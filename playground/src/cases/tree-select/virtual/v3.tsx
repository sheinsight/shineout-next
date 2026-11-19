import { useState } from 'react';
import { TreeSelect } from 'shineout-v3';
import { makeTree } from '../_shared/data';

const data = makeTree([10, 10, 10]);

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>([]);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <TreeSelect
        width={300}
        value={value}
        mode={2}
        multiple
        onChange={setValue}
        clearable
        virtual
        keygen='id'
        renderItem={(node: any) => `node ${node.id}`}
        data={data}
        placeholder='Please select content'
        open={open}
        onCollapse={setOpen}
      />
    </>
  );
}
