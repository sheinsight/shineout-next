/**
 * cn - 边框样式
 *    -- 设置 status 属性可以改变边框样式
 * en - Border style
 *    -- Set the status property to change the border style
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <DatePicker status='error' showSelNow onChange={(v) => console.log(v)} />
    <DatePicker tip='i am a tip' onChange={(v) => console.log(v)} />
    <DatePicker
      tip='i am a tip'
      error='something wrong'
      popover
      showSelNow
      onChange={(v) => console.log(v)}
    />
  </div>
);

export default App;
