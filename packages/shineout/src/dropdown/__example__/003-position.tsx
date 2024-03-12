/**
 * cn - 弹出位置
 *    -- 设置 position 属性可以控制下拉菜单弹出的方向和位置
 * en - Position
 *    -- Set position property can control the direction and position of the drop-down menu
 */
import React from 'react';
import { Dropdown, TYPE } from 'shineout';

type DropdownItem = TYPE.Dropdown.Item;

const menu: DropdownItem[] = [
  {
    content: 'First',
    children: [
      {
        content: 'link1',
      },
      {
        content: 'link2',
      },
    ],
  },
  {
    content: 'Second',
    children: [
      {
        content: 'link3',
      },
      {
        content: 'link4',
        children: [
          {
            content: 'link5',
          },
          {
            content: 'link6',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12 }}>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '0 120px' }}>
      <Dropdown placeholder='Bottom left' position='bottom-left' data={menu} />
      <Dropdown placeholder='Bottom' position='bottom' data={menu} />
      <Dropdown placeholder='Bottom right' position='bottom-right' data={menu} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropdown placeholder='Right Top' position='right-top' data={menu} />
      <Dropdown placeholder='Left Top' position='left-top' data={menu} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropdown placeholder='Right' position='right' data={menu} />
      <Dropdown placeholder='Left' position='left' data={menu} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropdown placeholder='Right Bottom' position='right-bottom' data={menu} />
      <Dropdown placeholder='Left Bottom' position='left-bottom' data={menu} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
      <Dropdown placeholder='Top Left' position='top-left' data={menu} />
      <Dropdown placeholder='Top' position='top' data={menu} />
      <Dropdown placeholder='Top right' position='top-right' data={menu} />
    </div>
  </div>
);

export default App;
