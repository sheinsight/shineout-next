/**
 * cn - 点击触发
 *    -- 默认触发事件为 hover，如果需要点击触发，可以设置 trigger 为 click
 * en - Click
 *    -- Set the trigger property to change the trigger event to 'click'.
 */
import React from 'react';
import { Tooltip } from 'shineout';

const fontStyle = { fontSize: 20, lineHeight: 1, margin: 4 };

const App: React.FC = () => (
  <div>
    <Tooltip tip='Some text.' trigger='click' position='left'>
      <span style={fontStyle}>left</span>
    </Tooltip>
    <Tooltip tip='Some text.' trigger='click' position='top'>
      <span style={fontStyle}>top</span>
    </Tooltip>
    <Tooltip tip='Some text.' trigger='click' position='bottom'>
      <span style={fontStyle}>bottom</span>
    </Tooltip>
    <Tooltip tip='Some text.' trigger='click' position='right'>
      <span style={fontStyle}>right</span>
    </Tooltip>
  </div>
);
export default App;
