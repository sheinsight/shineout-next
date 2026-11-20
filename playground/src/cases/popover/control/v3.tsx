import { useState } from 'react';
import { Button, Popover } from 'shineout-v3';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <Button mode='outline'>
        Hover
        <Popover visible={open} onVisibleChange={(v) => setOpen(v)}>
          Some text1
        </Popover>
      </Button>
    </>
  );
}
