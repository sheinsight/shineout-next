/**
 * cn - 自动选中
 *    -- 开启 `autoSelect` 属性后，当 Input 组件聚焦时，将自动全选当前 Input 组件的内容
 * en - Automatically select Input
 *    -- After enabling the `autoSelect` attribute, when the Input component is focused, the content of the current Input component will be automatically selected
 */

import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => (
  <Input width={300} defaultValue={'hello world'} placeholder='input something' autoSelect />
);

export default App;
