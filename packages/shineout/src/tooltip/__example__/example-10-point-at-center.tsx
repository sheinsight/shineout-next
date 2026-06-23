/**
 * cn - 箭头指向目标中心
 *    -- 使用 `pointAtCenter` 让箭头始终指向触发元素的中心（对非居中位置如 bottom-left、top-right 等有效）
 * en - Point at center
 *    -- Use `pointAtCenter` to make the arrow always point to the center of the trigger element (effective for non-center positions like bottom-left, top-right, etc.)
 *
 */

import React, { useState } from 'react';
import { Button, Tooltip, TYPE } from 'shineout';

type PopoverProps = TYPE.Popover.Props;
type PopoverPosition = PopoverProps['position'];

const positions: Array<PopoverPosition> = [
  'bottom-left',
  'bottom-right',
  'top-left',
  'top-right',
  'left-top',
  'left-bottom',
  'right-top',
  'right-bottom',
];

const App: React.FC = () => {
  const [pointAtCenter, setPointAtCenter] = useState(true);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          onClick={() => setPointAtCenter((v) => !v)}
          type='primary'
          mode='outline'
        >
          pointAtCenter: {String(pointAtCenter)}
        </Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {positions.map((p) => (
          <Tooltip
            key={p}
            position={p}
            pointAtCenter={pointAtCenter}
            tip={<div>{p}</div>}
          >
            <Button mode='outline' style={{ width: 140 }}>
              {p}
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default App;
