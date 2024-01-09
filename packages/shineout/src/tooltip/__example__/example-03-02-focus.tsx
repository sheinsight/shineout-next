/**
 * cn - 聚焦触发
 *    -- 需要聚焦触发，可以设置 `trigger` 为 'focus', children 需要是一个可以聚焦的元素
 * en - Focus
 *    -- Set the trigger property to change the `trigger` event to 'focus'.
 */
import React from 'react';
import { Tooltip, Input } from 'shineout';

const App: React.FC = () => (
  <div>
    <Tooltip tip='Some text.' trigger='focus'>
      <Input style={{ width: 300 }} />
    </Tooltip>
  </div>
);
export default App;
