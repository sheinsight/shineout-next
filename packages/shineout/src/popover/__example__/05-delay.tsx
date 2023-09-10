/**
 * cn - 延迟
 *    -- 可以设置展示延时和关闭延时
 * en - delay
 *    -- the hidden/show delay
 */
import React from 'react';
import { Button, Popover } from 'shineout';

const App: React.FC = () => (
  <Button>
    <Popover mouseEnterDelay={200} mouseLeaveDelay={1000}>
      Some text
    </Popover>
    Hover
  </Button>
);

export default App;
