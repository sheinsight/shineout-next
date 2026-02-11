/**
 * cn - 指示器顶对齐
 *    -- 设置 `verticalAlign` 为 "top"，实现指示器和文字顶对齐
 * en - Vertical Align
 *    -- Set `verticalAlign` to "top" to achieve vertical align.
 */
import React from 'react';
import { Checkbox } from 'shineout';

const App: React.FC = () => {
  return (
    <div>
      <Checkbox verticalAlign={"top"}>
        <div style={{ width: 200 }}>Checkbox Checkbox Checkbox Checkbox </div>
      </Checkbox>
    </div>
  );
};

export default App;
