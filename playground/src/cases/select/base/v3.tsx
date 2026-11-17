import { useState } from 'react';
import { Select } from 'shineout-v3';
import { colors } from '../_shared/data';

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <Select width={300} clearable data={colors} keygen placeholder='Select Color' open={open} onCollapse={setOpen} />
    </>
  );
}
