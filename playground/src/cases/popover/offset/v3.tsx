import { useState } from 'react';
import { Button, Popover } from 'shineout-v3';
import { useOpenBench } from '../_shared/bench';

const style: React.CSSProperties = {
  height: 60,
  padding: 12,
  backgroundColor: '#f7f8f9',
  display: 'flex',
  alignItems: 'center',
};

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <div style={style}>
        <Button mode='outline'>
          <Popover visible={open} onVisibleChange={setOpen} showArrow={false} popupGap={12}>
            popover content.
          </Popover>
          PopupGap
        </Button>
      </div>
    </>
  );
}
