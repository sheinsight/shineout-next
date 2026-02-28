/**
 * cn - 显示清除按钮
 *    -- 设置 `showClear` 可以显示清除按钮
 * en - showClear
 *    -- Set `showClear` to show clear button
 */
import React from 'react';
import { Textarea } from 'shineout';

const App: React.FC = () => (
  <Textarea placeholder='input something' showClear />
);

export default App;
