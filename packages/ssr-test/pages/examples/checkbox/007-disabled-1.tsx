/**
 * cn - 复选框组禁用
 *    -- 设置 Checkbox.Group 的 disabled 为 true，禁用全部选项
 * en - Group disabled
 *    -- Set the disabled property of Checkbox.Group to true to disable all options
 */
import React from 'react';
import { Checkbox } from 'shineout';

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

const App: React.FC = () => (
  <>
    <Checkbox.Group disabled keygen={(c) => c} data={data} defaultValue={['blue', 'cyan']} />
  </>
);

export default App;
