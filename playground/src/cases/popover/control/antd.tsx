import { useState } from 'react';
import { Button, Popover } from 'antd';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <Popover open={open} onOpenChange={(v) => setOpen(v)} content='Some text1' placement='bottomLeft'>
        <Button>Hover</Button>
      </Popover>
    </>
  );
}
