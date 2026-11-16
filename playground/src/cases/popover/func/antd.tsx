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
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger='click'
        placement='bottomLeft'
        content={
          <div>
            <div>Are you sure you want to close this panel?</div>
            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <Button size='small' onClick={() => setOpen(false)}>
                close
              </Button>
            </div>
          </div>
        }
      >
        <Button>Click me</Button>
      </Popover>
    </>
  );
}
