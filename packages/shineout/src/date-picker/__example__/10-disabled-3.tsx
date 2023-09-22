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
      type='datetime'
      defaultValue={Date.now()}
      style={{ marginInlineEnd: 12 }}
      disabled={(d) => {
        return [0, 5, 6].includes(d.getDay());
      }}
      disabledTime='22:22:22'
    />
  </div>
);

export default App;
