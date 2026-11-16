import { useState } from 'react';
import { Button, Popover } from 'antd';
import { useOpenBench } from '../_shared/bench';

const buttonStyle: React.CSSProperties = { margin: '100px 0' };
const targetStyle: React.CSSProperties = { height: 200, overflowY: 'auto', position: 'relative' };

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <div id='popup-target' style={targetStyle}>
        <Popover
          open={open}
          onOpenChange={setOpen}
          placement='bottomLeft'
          content='render in parent element'
          getPopupContainer={() => document.querySelector('#popup-target') as HTMLElement}
        >
          <Button style={buttonStyle}>Scrollable</Button>
        </Popover>
      </div>
    </>
  );
}
