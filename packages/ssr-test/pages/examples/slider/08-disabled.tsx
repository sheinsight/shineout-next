/**
 * cn - 禁用
 *    -- 设置 disabled 属性，禁用组件
 * en - Disabled
 *    -- Set the disabled property to disable the component
 */
import React from 'react';
import { Slider } from 'shineout';

const App: React.FC = () => <Slider range disabled defaultValue={[25, 75]} />;

export default App;
