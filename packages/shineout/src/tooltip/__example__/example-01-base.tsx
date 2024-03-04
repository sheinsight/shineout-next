/**
 * cn - 基本用法
 *    -- children 只能为一个 ReactElement 并且不可以使用 Fragment
 *    -- 内置了四个弹出方向
 * en - Base
 *    -- children can only be a ReactElement and cannot be a Fragment
 *    -- There are four pop-up directions built in
 */
import React from 'react';
import { Tooltip, Button } from 'shineout';

const App: React.FC = () => (
  <div>
    <Tooltip tip='hello world' trigger='hover'>
      <Button type='primary'>hover me</Button>
    </Tooltip>
  </div>
);
export default App;
