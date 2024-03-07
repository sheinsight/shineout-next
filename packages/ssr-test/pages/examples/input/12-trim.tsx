/**
 * cn - 清除空格
 *    -- 开启 `trim` 属性，Input 组件会在键入内容后去除内容两端的空格字符
 * en - Trim whitespace
 *    -- After enabling the `trim` attribute, the Input component will remove the whitespace characters at both ends of the content after typing
 */

import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => <Input width={300} placeholder='input something' trim />;

export default App;
