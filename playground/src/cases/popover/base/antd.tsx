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
      <Popover open={open} onOpenChange={setOpen} content='some Text' placement='bottomLeft'>
        <Button>Hover</Button>
      </Popover>
    </>
  );
}
