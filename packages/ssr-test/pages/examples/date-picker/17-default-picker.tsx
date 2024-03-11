/**
 * cn - 面板默认时间
 *    -- 打开面板后的默认时间，仅在未选择日期时生效
 * en - DefaultPickerValue
 *    -- default date of panel，work under has no value
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker defaultPickerValue='2022-09' type='date' />

    <DatePicker range type='date' defaultPickerValue={['2022-11', '2022-12']} />
  </div>
);

export default App;
