/**
 * cn - 进度条状态
 *    -- 内置了四种样式，通过 type 来调用
 * en - Type
 *    -- There are 4 built-in style
 */
import React from 'react';
import { Progress } from 'shineout';

const App: React.FC = () => (
  <div style={{ width: 400, display: 'flex', flexDirection: "column", gap: 24 }}>
    <Progress value={100} type='success'>100%</Progress>
    <Progress value={90} type='info'>90%</Progress>
    <Progress value={80} type='warning'>80%</Progress>
    <Progress value={70} type='danger'>70%</Progress>
  </div>
);

export default App;
