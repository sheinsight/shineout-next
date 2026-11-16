import { useState } from 'react';
import { Button, Popover } from 'shineout-v2';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <Button outline>
        <Popover visible={open} onVisibleChange={setOpen} priorityDirection='horizontal' trigger='click'>
          {(close: () => void) => (
            <div style={{ padding: 16 }}>
              <div>Are you sure you want to close this panel?</div>
              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <Button size='small' outline onClick={() => close()}>
                  close
                </Button>
              </div>
            </div>
          )}
        </Popover>
        Click me
      </Button>
    </>
  );
}
