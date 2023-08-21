/**
 * cn - 点击触发
 *    -- 默认是移入组件触发，设置 trigger 为 'click'，可以改为点击触发
 * en - Trigger
 *    -- Set the trigger property to change the trigger event to 'click'.
 */
import React from 'react';
import { Button, Popover } from 'shineout';

const PopoverStyle: React.CSSProperties = { marginInlineEnd: 12 };

const App: React.FC = () => (
  <Button>
    <Popover style={PopoverStyle} trigger='click'>
      hello shineout
    </Popover>
    Click me
  </Button>
);

export default App;
