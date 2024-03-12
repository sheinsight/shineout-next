/**
 * cn - 下边框
 *    -- 开启 `underline` 属性后，组件将支持下边框样式，仅展示下部的边框
 * en - Bottom border
 *    -- After enabling the `underline` attribute, the component will support the bottom border style and display only the border at the bottom
 */

import React from 'react';
import { Input } from 'shineout';

const App: React.FC = () => <Input width={300} underline clearable placeholder='Underline' />;

export default App;
