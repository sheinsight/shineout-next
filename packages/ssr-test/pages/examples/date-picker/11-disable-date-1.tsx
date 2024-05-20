/**
 * cn - 不可选取的时间
 *    -- 当 `disabled` 为函数时，可以根据返回值禁用某些时间
 * en - Disabled date
 *    -- When `disabled` is a function, you can disable some date according to the return value
 */
import React from 'react';
import { DatePicker } from 'shineout';

const Now = new Date(2024, 5, 15, 12, 0, 0);

const App: React.FC = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    <DatePicker
      type='datetime'
      inputable
      defaultValue={Now}
      disabled={(d) => {
        return d.getDay() === 0 || d.getDay() === 6;
      }}
    />

    <DatePicker
      type='time'
      defaultValue='14:30:30'
      disabled={(d) => {
        if (d.getHours() > 15) return true;
        return false;
      }}
    />
  </div>
);

export default App;
