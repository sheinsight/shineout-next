import { useState } from 'react';
import { Button, Popover } from 'antd-v5';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <Popover
        open={open}
        onOpenChange={setOpen}
        afterOpenChange={() => undefined}
        trigger='click'
        placement='bottomLeft'
        content='Some text'
      >
        <Button>Click me</Button>
      </Popover>
    </>
  );
}
