/**
 * cn -
 *    -- disabledTime 属性支持单独禁用时间。
 * en -
 *    -- The disabledTime attribute supports separate disable time
 */
import React from 'react';
import { DatePicker } from 'shineout';

const Now = Date.now();

const App: React.FC = () => (
  <div>
    <DatePicker
      type='datetime'
      defaultValue={Now}
      defaultTime='10:00:00'
      disabledTime={(time) => time === '12:00:00'}
    />
  </div>
);

export default App;
