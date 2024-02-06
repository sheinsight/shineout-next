/**
 * cn - 尺寸大小
 *    -- 设置 `size` 属性改变输入框组件的尺寸大小。内置三种尺寸：small、default、large
 * en - Size
 *    -- Set the size property to change the size of the input box component. There are three built-in sizes available: small, default, and large.
 */

import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => (
  <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
    <Input size='small' width={240} placeholder='small size' clearable />
    <Input width={240} placeholder='default size' clearable />
    <Input size='large' width={240} placeholder='large size' clearable />
  </div>
);

export default App;
