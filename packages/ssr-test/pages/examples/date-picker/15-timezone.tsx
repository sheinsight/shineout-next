/**
 * cn - 时区
 *    -- 设置 timeZone
 * en - timeZone
 *    -- set timeZone
 */
import React, { useState } from 'react';
import { DatePicker, Select } from 'shineout';

const offsetList = new Array(26).fill(undefined).map((_, index) => {
  const num = index - 12;
  const abs = Math.abs(num);
  const str = abs < 10 ? `0${abs}` : `${abs}`;
  return `${num < 0 ? '-' : '+'}${str}`;
});

const App: React.FC = () => {
  const [tz, setTz] = useState('+08');
  return (
    <div>
      <DatePicker
        format='X'
        timeZone={tz}
        type='datetime'
        defaultValue={new Date(2024, 10, 10, 12, 12, 12)}
        placeholder='Select datetime'
        onChange={(d) => console.log(d)}
        formatResult='YYYY-MM-DD HH:mm:ss'
      />
      <Select
        keygen
        renderItem={(d) => d}
        width={90}
        value={tz}
        data={offsetList}
        onChange={(v) => setTz(v)}
        style={{ marginInlineStart: 12 }}
      />
    </div>
  );
};

export default App;
