import { useState } from 'react';
import { Button, Popover } from 'antd';
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
      <Popover open={open} onOpenChange={setOpen} content='Disabled parent' placement='bottomLeft'>
        <div style={style}>
          <Button disabled>Disabled</Button>
        </div>
      </Popover>
    </>
  );
}
