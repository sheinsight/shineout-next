import { useState } from 'react';
import { Link, Popover } from 'shineout-v3';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <div style={{ display: 'flex', gap: 24 }}>
        <Link type='primary'>
          disabled popover
          <Popover.Confirm disabled visible={open} onVisibleChange={setOpen}>
            Are you sure?
          </Popover.Confirm>
        </Link>
        <Link type='primary'>
          enabled popover
          <Popover.Confirm visible={open} onVisibleChange={setOpen}>
            Are you sure?
          </Popover.Confirm>
        </Link>
      </div>
    </>
  );
}
