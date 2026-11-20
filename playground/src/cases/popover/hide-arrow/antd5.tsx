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
      <Popover open={open} onOpenChange={setOpen} arrow={false} placement='bottomLeft' content='This is some notice content.'>
        <Button>Text prompt without arrow</Button>
      </Popover>
    </>
  );
}
