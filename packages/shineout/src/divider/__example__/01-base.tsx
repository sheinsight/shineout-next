/**
 * cn - 基本用法
 *    --默认为水平分割线
 * en - Base
 *    --Divider is horizontal by default. You can add text within Divider.
 */
import React from 'react';
import { Divider } from 'shineout';

const App: React.FC = () => (
  <div style={{ fontSize: 12 }}>
    <p>A design is a plan or specification for the construction of an object.</p>
    <Divider />
    <p>A design is a plan or specification for the construction of an object.</p>
  </div>
);

export default App;
