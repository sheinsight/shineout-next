/**
 * cn - 基本用法
 *    -- children 只能为一个 ReactElement 并且不可以使用 Fragment
 *    -- 内置了四个弹出方向
 * en - Base
 *    -- children can only be a ReactElement and cannot be a Fragment
 *    -- There are four pop-up directions built in.
 */
import React from 'react';
import { Tooltip } from 'shineout';

const fontStyle = { fontSize: 20, lineHeight: 1, margin: 4 };

const App: React.FC = () => (
  <div>
    <Tooltip tip='Some text.' position='left'>
      <span style={fontStyle}>left</span>
    </Tooltip>
    <Tooltip tip='Some text.' position='top'>
      <span style={fontStyle}>top</span>
    </Tooltip>
    <Tooltip tip='Some text.' position='bottom'>
      <span style={fontStyle}>bottom</span>
    </Tooltip>
    <Tooltip tip='Some text.' position='right'>
      <span style={fontStyle}>right</span>
    </Tooltip>
  </div>
);
export default App;
