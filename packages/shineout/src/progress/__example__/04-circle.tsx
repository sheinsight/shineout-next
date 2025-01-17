/**
 * cn - 环形进度条
 *    -- 设置 shape 为 'circle' 展示环形进度条
 * en - Circle
 *    -- set shape to 'circle' to show circle progress
 */
import React from 'react';
import { Progress } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', gap: '32px' }}>
    <Progress value={0} shape='circle' type='info' size={64} strokeWidth={4}>0%</Progress>
    <Progress value={60} shape='circle' type='info' size={64} strokeWidth={4}>60%</Progress>
    <Progress value={70} shape='circle' type='warning' size={64} strokeWidth={4} icon />
    <Progress value={100} shape='circle' type='success' size={64} strokeWidth={4} icon />
    <Progress value={90} shape='circle' type='danger' size={64} strokeWidth={4} icon />
  </div>
);

export default App;
