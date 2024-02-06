/**
 * cn - 内嵌标题
 *    -- 使用 innerTitle 展示内嵌标题
 * en - inner title
 *    -- -- use innerTitle to display the inner title
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker type='date' innerTitle='Select date' clearable showSelNow />

    <DatePicker range innerTitle='Select date' clearable showSelNow />

    <DatePicker type='datetime' inputable clearable innerTitle='Select datetime' showSelNow />
  </div>
);

export default App;
