/**
 * cn - 可输入
 *    -- 设置 `inputable` 使日期可输入
 * en - Inputable
 *    -- Set `inputable` to make date inputable
 */
import React from 'react';
import { DatePicker } from 'shineout';

// todo 输入禁用日期
const App: React.FC = () => (
  <div>
    <DatePicker inputable style={{ marginBottom: 16 }} /> <br />
    <DatePicker inputable range />
  </div>
);

export default App;
