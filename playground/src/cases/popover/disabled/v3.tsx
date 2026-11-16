import { useState } from 'react';
import { Button, Popover } from 'shineout-v3';
import { useOpenBench } from '../_shared/bench';

const style: React.CSSProperties = { display: 'inline-block' };

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <div style={style}>
        <Popover visible={open} onVisibleChange={setOpen}>
          Disabled parent
        </Popover>
        <Button disabled mode='outline'>
          Disabled
        </Button>
      </div>
    </>
  );
}
