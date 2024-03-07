/**
 * cn - 弹出位置
 *    -- 内置了十二个弹出的位置
 * en - Position
 *    -- Twelve pop-up positions are built in
 * 
 */

import React from 'react';
import { Button, Tooltip, TYPE } from 'shineout';

type PopoverProps = TYPE.Popover.Props;
type PopoverPosition = PopoverProps['position'];

const positions: Array<PopoverPosition[]> = [
  [undefined, 'bottom-left', 'bottom', 'bottom-right', undefined],
  ['right-top', undefined, undefined, undefined, 'left-top'],
  ['right', undefined, undefined, undefined, 'left'],
  ['right-bottom', undefined, undefined, undefined, 'left-bottom'],
  [undefined, 'top-left', 'top', 'top-right', undefined],
];

const style: React.CSSProperties = {
  margin: 4,
  width: 100,
  display: 'inline-block',
};

const App: React.FC = () => (
  <div>
    {positions.map((row, i) => (
      <div key={i}>
        {row.map((p, j) =>
          p ? (
            <Tooltip
              key={j}
              position={p}
              tip={
                <div>
                  <div>i am popover content</div>
                  <div>{p}</div>
                </div>
              }
            >
              <Button key={j} mode={'outline'} style={style}>
                {p}
              </Button>
            </Tooltip>
          ) : (
            <div key={j} style={{ ...style, border: 0 }} />
          ),
        )}
      </div>
    ))}
  </div>
);

export default App;
