/**
 * cn - 可输入
 *    -- 设置 `inputable` 使日期可输入
 * en - Inputable
 *    -- Set `inputable` to make date inputable
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <div>
    <DatePicker inputable style={{ marginBottom: 16 }} /> <br />
    <DatePicker type={'datetime'} inputable range absolute />
  </div>
);

export default App;
