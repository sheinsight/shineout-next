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
        <Popover visible={open} onVisibleChange={setOpen} onOpen={() => undefined} onClose={() => undefined} trigger='click'>
          Some text
        </Popover>
        Click me
      </Button>
    </>
  );
}
