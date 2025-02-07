/**
 * cn - 带输入框
 *    -- 和数组输入框保持同步
 * en - Input
 *    -- change with number input
 */
import React, { useState } from 'react';
import { Slider, Input } from 'shineout';

const container: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const slider: React.CSSProperties = {
  flex: 1,
  marginInlineEnd: 16,
};

const App: React.FC = () => {
  const [value, setValue] = useState<number | undefined>(50);

  return (
    <div style={container}>
      <Slider value={value} onChange={(n) => setValue(n)} style={slider} />
      <Input.Number
        digits={0}
        width={100}
        max={100}
        min={0}
        value={value}
        onChange={(n) => {
          if (n === '') {
            setValue(undefined);
          } else {
            setValue(Number(n || 0));
          }
        }}
      />
    </div>
  );
};

export default App;
