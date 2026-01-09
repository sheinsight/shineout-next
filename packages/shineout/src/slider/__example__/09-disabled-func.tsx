/**
 * cn -
 *    -- 设置 `disabled` 为函数格式，根据当前值动态判断是否禁用
 * en -
 *    -- Set the disabled property to a function to dynamically determine whether to disable based on the current value
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => <Slider disabled={v => v > 30} />;

export default App;
