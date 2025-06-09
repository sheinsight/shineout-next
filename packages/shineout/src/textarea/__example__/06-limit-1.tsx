/**
 * cn - 字数统计
 *    -- 设置 `limit` 为数字，右下角显示字数统计
 *    -- 输入达到最大字数后，不再允许输入
 * en - Limit
 *    -- Set the `limit` property to display the word count
 */
import React from 'react';
import { Textarea } from 'shineout';

const App: React.FC = () => (
  <Textarea rows={3} limit={50} placeholder='input something' />
);

export default App;
