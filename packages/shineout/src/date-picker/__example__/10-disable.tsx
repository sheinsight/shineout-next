/**
 * cn - 禁用
 *    -- 日期选择框禁用状态
 * en - Disabled
 *    -- Disabled date picker
 */
import React from 'react';
import { DatePicker } from 'shineout';

const Now = Date.now();

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker disabled={true} defaultValue={Now} width={240} />
    <DatePicker range disabled={true} defaultValue={['2017-05-10', '2017-05-20']} width={240} />
    <DatePicker range disabled={[false, true]} defaultValue={['2017-05-10', '2017-05-20']} width={240} />
    <DatePicker range disabled={[true, false]} defaultValue={['2017-05-10', '2017-05-20']} width={240} />
  </div>
);

export default App;
