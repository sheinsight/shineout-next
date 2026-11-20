import { useState } from 'react';
import { Button, Popover } from 'shineout-v2';
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
        <Button style={buttonStyle} outline>
          Scrollable
          <Popover
            visible={open}
            onVisibleChange={setOpen}
            getPopupContainer={() => document.querySelector('#popup-target')}
          >
            render in parent element
          </Popover>
        </Button>
      </div>
    </>
  );
}
