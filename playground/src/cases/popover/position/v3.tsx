import { useState } from 'react';
import { Button, Popover } from 'shineout-v3';
import { useOpenBench } from '../_shared/bench';

const positions: (string | undefined)[][] = [
  [undefined, 'bottom-left', 'bottom', 'bottom-right', undefined],
  ['right-top', undefined, undefined, undefined, 'left-top'],
  ['right', undefined, undefined, undefined, 'left'],
  ['right-bottom', undefined, undefined, undefined, 'left-bottom'],
  [undefined, 'top-left', 'top', 'top-right', undefined],
];

const style: React.CSSProperties = { margin: 4, width: 110, display: 'inline-block' };

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <div>
        {positions.map((row, i) => (
          <div key={i}>
            {row.map((p, j) =>
              p ? (
                <Button key={j} mode='outline' style={style}>
                  <Popover visible={open} onVisibleChange={setOpen} position={p as any} useTextStyle>
                    <div>i am popover content</div>
                    <div>{p}</div>
                  </Popover>
                  {p}
                </Button>
              ) : (
                <div key={j} style={{ ...style, border: 0 }} />
              ),
            )}
          </div>
        ))}
      </div>
    </>
  );
}
