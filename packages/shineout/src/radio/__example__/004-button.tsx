/**
 * cn - 按钮单选框
 *    -- 设置 button 属性可以展示为按钮样式
 * en - Button Radio
 *    -- set button to show button style
 */
import React from 'react';
import { Radio } from 'shineout';

const data = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const App: React.FC = () => (
  <>
    <Radio.Group button keygen data={data} defaultValue='Wednesday' />
    <br />
    <Radio.Group
      button
      keygen
      data={data}
      defaultValue='Wednesday'
      disabled
      style={{ marginTop: 24 }}
    />
  </>
);

export default App;
