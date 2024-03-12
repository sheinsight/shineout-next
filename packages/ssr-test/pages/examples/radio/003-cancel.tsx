/**
 * cn - 支持取消
 *    -- 使用组件形式来支持取消选中
 * en - Cancel
 *    -- Use component list for toggle radio
 */
import React, { useState } from 'react';
import { Radio } from 'shineout';

type RadioGroupItem = string;

const data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => {
  const [current, setCurrent] = useState<RadioGroupItem>('red');

  return (
    <Radio.Group keygen value={current}>
      {data.map((d) => (
        <Radio
          key={d}
          htmlValue={d}
          onClick={() => {
            if (current === d) {
              setCurrent('');
            } else {
              setCurrent(d);
            }
          }}
        >
          {d}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default App;
