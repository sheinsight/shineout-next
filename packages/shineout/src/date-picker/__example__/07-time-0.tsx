/**
 * cn - 选择时间
 *    -- 设置 type 为 time，选择时间，根据 format 自动加载相应的选择列
 * en - Time Mode
 *    -- Set type to be time to select time and automatically load the corresponding selection column according to the format property
 */
import React from 'react';
import { DatePicker } from 'shineout';

const now = Date.now();

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker type='time' defaultValue={now} showSelNow />
    <DatePicker type='time' format='HH:mm' defaultValue={now} />
    <DatePicker type='time' format='hh:mm A' defaultValue={now} />
  </div>
);

export default App;
