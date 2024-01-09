/**
 * cn - 点击触发
 *    -- 默认触发事件为 hover，如果需要点击触发，可以设置 `trigger` 为 'click'
 * en - Click
 *    -- Set the trigger property to change the `trigger` event to 'click'.
 */
import React from 'react';
import { Tooltip, Button } from 'shineout';

const App: React.FC = () => (
  <div>
    <Tooltip tip='Some text.' trigger='click'>
      <Button type='primary'>click me</Button>
    </Tooltip>
  </div>
);
export default App;
