/**
 * cn -
 *    -- 设置 button 为 outline 可以展示透明背景的按钮样式
 * en -
 *    -- set button with outline to show outline button style
 */
import React from 'react';
import { Radio } from 'shineout';

const data = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const App: React.FC = () => (
  <>
    <Radio.Group button='outline' keygen data={data} defaultValue='Wednesday' />
    <br />
    <Radio.Group
      button='outline'
      keygen
      data={data}
      defaultValue='Wednesday'
      disabled
      style={{ marginTop: 24 }}
    />
  </>
);

export default App;
