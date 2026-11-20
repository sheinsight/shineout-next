import { useState } from 'react';
import { Button, Popover } from 'antd-v5';
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
        <Popover
          open={open}
          onOpenChange={setOpen}
          arrow={false}
          placement='bottomLeft'
          align={{ offset: [0, 12] }}
          content='popover content.'
        >
          <Button>PopupGap</Button>
        </Popover>
      </div>
    </>
  );
}
