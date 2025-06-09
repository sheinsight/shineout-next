/**
 * cn - 可清除
 *    -- 设置 `clearable` 可以显示清除按钮
 * en - Clearable
 *    -- Set `clearable` to show clear button
 */
import React from 'react';
import { Textarea } from 'shineout';

const App: React.FC = () => (
  <Textarea placeholder='input something' clearable />
);

export default App;
