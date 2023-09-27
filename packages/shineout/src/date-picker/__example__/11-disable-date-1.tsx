/**
 * cn - 不可选取的时间
 *    -- 当 `disabled` 为函数时，可以根据返回值禁用某些时间
 * en - Disabled date
 *    -- When `disabled` is a function, you can disable some date according to the return value.
 */
import React from 'react';
import { DatePicker } from 'shineout';

const Now = Date.now();

const App: React.FC = () => (
  <div>
    <DatePicker
      type='datetime'
      inputable
      defaultValue={Now}
      style={{ marginInlineEnd: 12 }}
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
