/**
 * cn - 禁用
 *    -- 日期选择框禁用状态
 * en - Disabled
 *    -- Disabled date picker
 */
import React from 'react';
import { DatePicker } from 'shineout';

const Now = new Date(2024, 5, 15, 12, 0, 0);

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker disabled={true} defaultValue={Now} />
    <DatePicker range disabled={true} defaultValue={['2017-05-10', '2017-05-20']} />
    <DatePicker range disabled={[false, true]} defaultValue={['2017-05-10', '2017-05-20']} />
    <DatePicker range disabled={[true, false]} defaultValue={['2017-05-10', '2017-05-20']} />
  </div>
);

export default App;
