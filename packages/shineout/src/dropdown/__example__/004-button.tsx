/**
 * cn - 按钮下拉
 *    -- 和 Button 属性相同, 支持 type text outline
 * en - Button
 *    -- Same as Button, support type text outline
 */
import React from 'react';
import { Dropdown } from 'shineout';

const menu: {
  id: string;
  content: string;
}[] = [];

for (let i = 1; i <= 3; i++) {
  menu.push({
    id: `${i}`,
    content: `item${i}`,
  });
}

const columnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 24,
};
const App: React.FC = () => (
  <div style={{ display: 'flex', gap: 24 }}>
    <div style={columnStyle}>
      <Dropdown data={menu} type={'primary'} placeholder={'Default'} />
      <Dropdown data={menu} type={'secondary'} placeholder={'Default'} />
      <Dropdown data={menu} type={'danger'} placeholder={'Default'} />
      <Dropdown data={menu} type={'warning'} placeholder={'Default'} />
      <Dropdown data={menu} type={'success'} placeholder={'Default'} />
    </div>
    <div style={columnStyle}>
      <Dropdown data={menu} type={'primary'} placeholder={'Outline'} outline />
      <Dropdown data={menu} type={'secondary'} placeholder={'Outline'} outline />
      <Dropdown data={menu} type={'danger'} placeholder={'Outline'} outline />
      <Dropdown data={menu} type={'warning'} placeholder={'Outline'} outline />
      <Dropdown data={menu} type={'success'} placeholder={'Outline'} outline />
    </div>
    <div style={columnStyle}>
      <Dropdown data={menu} type={'primary'} placeholder={'Text'} text />
      <Dropdown data={menu} type={'secondary'} placeholder={'Text'} text />
      <Dropdown data={menu} type={'danger'} placeholder={'Text'} text />
      <Dropdown data={menu} type={'warning'} placeholder={'Text'} text />
      <Dropdown data={menu} type={'success'} placeholder={'Text'} text />
    </div>
  </div>
);

export default App;
