import { useState } from 'react';
import { Dropdown } from 'shineout-v2';
import { baseSo } from '../_shared/data';
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
          <Dropdown placeholder='Click me' data={baseSo} open={open} onCollapse={setOpen} />
      </span>
      <Dropdown placeholder='Click me' data={baseSo} disabled />
    </>
  );
}
