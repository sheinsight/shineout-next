/**
 * cn - 尺寸大小
 *    -- 设置 `size` 属性改变输入框组件的尺寸大小。内置三种尺寸：small、default、large。
 * en - Size
 *    -- Set the size property to change the size of the input box component. There are three built-in sizes available: small, default, and large.
 */

import React from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { width: 120, marginInlineEnd: 12 };

const App: React.FC = () => (
  <div>
    <Input size='small' style={style} placeholder='small size' clearable />
    <Input style={style} placeholder='default size' clearable />
    <Input size='large' style={style} placeholder='large size' clearable />
  </div>
);

export default App;
