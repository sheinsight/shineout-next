/**
 * cn - 虚线分割
 *    --使用 `type`="dashed" 设置为虚线分割线
 * en - Dashed
 *    --Use type="dashed" make it dashed
 */
import React from 'react';
import { Divider } from 'shineout';

const App: React.FC = () => (
  <div style={{ fontSize: 12 }}>
    <p>A design is a plan or specification for the construction of an object.</p>
    <Divider type='dashed' />
    <p>A design is a plan or specification for the construction of an object.</p>
  </div>
);

export default App;
