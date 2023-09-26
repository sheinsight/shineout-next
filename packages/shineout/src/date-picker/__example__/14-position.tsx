/**
 * cn - 弹出框位置
 *    -- 通过设置 `position` 指定弹出面板的位置。默认为自动
 * en - Position
 *    -- Set `Position` can control the different position of DatePicker
 */
import React from 'react';
import { DatePicker } from 'shineout';

const style = { marginRight: '12px' };

const App: React.FC = () => (
  <div style={{ display: 'flex', gap: 16, flexFlow: 'row wrap', marginBottom: 300 }}>
    <DatePicker style={style} type='date' placeholder='top-left' position='top-left' />
    <DatePicker style={style} type='date' placeholder='top-right' position='top-right' />
    <DatePicker style={style} type='date' placeholder='bottom-left' position='bottom-left' />
    <DatePicker style={style} type='date' placeholder='bottom-right' position='bottom-right' />
  </div>
);

export default App;
