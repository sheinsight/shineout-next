/**
 * cn - 带文字的分割线
 *    -- 分割线中带有文字，可以用 orientation 指定文字位置
 * en - Divider with title
 *    --Divider with inner title, set orientation="left/right" to align it
 */
import React from 'react';
import { Divider } from 'shineout';

const App: React.FC = () => (
  <div style={{ fontSize: 12 }}>
    <p>A design is a plan or specification for the construction of an object.</p>
    <Divider>Center</Divider>
    <p>A design is a plan or specification for the construction of an object.</p>
    <Divider orientation={'left'}>Left</Divider>
    <p>A design is a plan or specification for the construction of an object.</p>
    <Divider orientation={'right'}>Right</Divider>
    <p>A design is a plan or specification for the construction of an object.</p>
  </div>
);

export default App;
