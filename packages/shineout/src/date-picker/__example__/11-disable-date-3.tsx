/**
 * cn -
 *    -- 同时禁用日期和时间
 * en -
 *    -- Disable both special date and special time
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <div>
    <DatePicker
      inputable
      type='datetime'
      defaultValue={'2023-10-12 12:00:00'}
      style={{ marginInlineEnd: 12 }}
      disabled={(d) => {
        return d.getDay() === 0 || d.getDay() === 6;
      }}
      disabledTime={'11:00:00'}
    />
  </div>
);

export default App;
