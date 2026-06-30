/**
 * cn - 箭头居中
 *    -- 使用 `pointAtCenter` 让箭头指向触发元素的中心
 * en - Point at center
 *    -- Use `pointAtCenter` to make the arrow point to the center of the trigger element
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
  width: 110,
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
              pointAtCenter
              tip={<div>{p}</div>}
            >
              <Button mode='outline' style={style}>
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
