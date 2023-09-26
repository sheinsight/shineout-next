/**
 * cn - 禁用
 *    -- 日期选择框禁用状态
 * en - Disabled
 *    -- Disabled date picker
 */
import React from 'react';
import { DatePicker } from 'shineout';

const Now = Date.now();

const style = { marginBottom: 16 };

const App: React.FC = () => (
  <>
    <DatePicker style={style} disabled={true} defaultValue={Now} /> <br />
    <DatePicker style={style} range disabled={true} defaultValue={['2017-05-10', '2017-05-20']} />
    <br />
    <DatePicker
      style={style}
      range
      disabled={[false, true]}
      defaultValue={['2017-05-10', '2017-05-20']}
    />
    <br />
    <DatePicker
      style={style}
      range
      disabled={[true, false]}
      defaultValue={['2017-05-10', '2017-05-20']}
    />
    <br />
  </>
);

export default App;
