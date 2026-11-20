import { useState } from 'react';
import { Dropdown } from 'shineout-v3';
import { nestedSo } from '../_shared/data';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <span>
        <Dropdown data={nestedSo} placeholder='Click me' open={open} onCollapse={setOpen} />
      </span>
    </>
  );
}
