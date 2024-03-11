/**
 * cn - 内嵌进度条
 *    -- 设置 shape 为 'line-inner' 展示内嵌的进度条
 * en - Line inner
 *    -- set shape to 'line-inner' to show line inner progress
 */
import React from 'react';
import { Progress } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: 400 }}>
    <Progress value={0} shape='line-inner' type='info'>
      0%
    </Progress>
    <Progress value={5} shape='line-inner' type='info'>
      5%
    </Progress>
    <Progress value={40} shape='line-inner' type='info'>
      10%
    </Progress>
    <Progress value={50} shape='line-inner' type='warning'>
      50%
    </Progress>
    <Progress value={100} shape='line-inner' type='success'>
      100%
    </Progress>
    <Progress value={60} shape='line-inner' type='danger'>
      60%
    </Progress>
  </div>
);

export default App;
