import { useState } from 'react';
import { Select } from 'shineout-v3';
import { bigData, BigItem } from '../_shared/data';

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <Select
        width={300}
        data={bigData}
        keygen='id'
        placeholder='Static lineHeight'
        renderItem={(d: BigItem) => d.name}
        clearable
        onFilter={(v: string) => (d: BigItem) => d.name.indexOf(v) >= 0}
        open={open}
        onCollapse={setOpen}
      />
    </>
  );
}
