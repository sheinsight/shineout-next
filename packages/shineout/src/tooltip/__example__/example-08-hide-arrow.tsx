/**
 * cn - 不带箭头
 *    -- 设置 `showArrow` 属性为 `false` 可以隐藏箭头
 * en - Hide arrow
*     -- Set the `showArrow` property to `false` to hide the arrow
 */
import React from 'react';
import { Tooltip, Button } from 'shineout';

const App: React.FC = () => (
  <Tooltip tip='Tip message has no arrow.' showArrow={false} persistent>
    <Button type='primary'>hover me</Button>
  </Tooltip>
);
export default App;
