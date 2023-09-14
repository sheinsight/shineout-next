/**
 * cn - 尺寸
 *    -- 设置 `size` 属性改变组件的尺寸大小, 内置三种尺寸：small、default、large。
 * en - Base
 *    -- Set the size property to change the size of the component. There are three built-in sizes: small, default, and large.
 */
import React from 'react';
import { Checkbox } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Checkbox size={'small'}>Checkbox</Checkbox>
    <Checkbox>Checkbox</Checkbox>
    <Checkbox size={'large'}>Checkbox</Checkbox>
  </div>
);

export default App;
