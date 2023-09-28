/**
 * cn - 选择时间
 *    -- 设置 type 为 time，选择时间，根据 format 自动加载相应的选择列
 * en - Time Mode
 *    -- Set type to be time to select time and automatically load the corresponding selection column according to the format property.
 */
import React from 'react';
import { DatePicker } from 'shineout';

const style = { marginBottom: 16 };

const now = Date.now();

const App: React.FC = () => (
  <div>
    <DatePicker style={style} type='time' defaultValue={now} showSelNow /> <br />
    <DatePicker style={style} type='time' format='HH:mm' defaultValue={now} /> <br />
    <DatePicker style={style} type='time' format='hh:mm a' defaultValue={now} />
  </div>
);

export default App;
