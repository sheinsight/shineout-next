/**
 * cn -
 *    -- 步进设置
 * en - Step
 *    -- Set step of TimePicker
 */
import React from 'react';
import { DatePicker } from 'shineout';

const step: number = 2;

const App: React.FC = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <DatePicker placeholder='Hour Step' type='time' hourStep={step} />
    <DatePicker placeholder='Minute Step' type='time' minuteStep={step} />
    <DatePicker placeholder='Second Step' type='time' secondStep={step} />
  </div>
);

export default App;
