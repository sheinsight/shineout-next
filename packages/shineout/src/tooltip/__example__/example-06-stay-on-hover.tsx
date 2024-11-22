/**
 * cn - 鼠标悬停
 *    -- 设置 `stayOnHover` 属性后，鼠标悬停提示信息时将不会关闭 tooltip
 * en - Stay on hover
 *    -- Set the `stayOnHover` property, the tooltip will not close when the mouse hovers over the tooltip content
 */
import React from 'react';
import { Tooltip, Button } from 'shineout';

const App: React.FC = () => (
  <div>
    <Tooltip tip='i will not close when hover' trigger='hover' stayOnHover>
      <Button type='primary'>hover me</Button>
    </Tooltip>
  </div>
);
export default App;
