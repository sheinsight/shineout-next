/**
 * cn - 允许删除
 *    -- 设置 `clearable` 属性，Input 将显示删除按钮，点击删除按钮清空内容。
 * en -  allow clear
 *    -- Set the `clearable` property, the Input will display the clear button, click the clear button to clear the content.
 */
import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => <Input clearable placeholder='input something' />;

export default App;
