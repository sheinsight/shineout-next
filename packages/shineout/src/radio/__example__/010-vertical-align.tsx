/**
 * cn - 指示器顶对齐
 *    -- 设置 `verticalAlign` 为 "top"，实现指示器和文字顶对齐
 * en - Vertical Align
 *    -- Set `verticalAlign` to "top" to achieve vertical align.
 */
import React from 'react';
import { Radio } from 'shineout';

const App: React.FC = () => {
  return (
    <div>
      <Radio verticalAlign={"top"}>
        <div style={{ width: 100 }}>Radio Radio Radio Radio </div>
      </Radio>
    </div>
  );
};

export default App;
