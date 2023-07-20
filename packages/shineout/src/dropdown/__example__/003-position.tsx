/**
 * cn - 弹出位置
 *    -- 设置 position 属性可以控制下拉菜单弹出的方向和位置
 * en - Position
 *    -- Set position property can control the direction and position of the drop-down menu.
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
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
    <div>
      <Dropdown placeholder='Right Top' position='right-top' data={menu} />
    </div>
    <div>
      <Dropdown placeholder='Bottom Left' position='bottom-left' data={menu} />
    </div>
    <div>
      <Dropdown placeholder='Bottom' position='bottom' data={menu} />
    </div>
    <div>
      <Dropdown placeholder='Bottom Right' position='bottom-right' data={menu} />
    </div>
    <div>
      <Dropdown placeholder='Left Top' position='left-top' data={menu} />
    </div>
    <div>
      <Dropdown placeholder='Right' position='right' data={menu} />
    </div>
    <div style={{ gridColumn: 'span 3' }}></div>
    <div>
      <Dropdown placeholder='Left' position='left' data={menu} />
    </div>
    <div>
      <Dropdown placeholder='Right Bottom' position='right-bottom' data={menu} />
    </div>
    <div>
      <Dropdown placeholder='Top Left' position='top-left' data={menu} />
    </div>
    <div>
      <Dropdown placeholder='Top' position='top' data={menu} />
    </div>
    <div>
      <Dropdown placeholder='Top Right' position='top-right' data={menu} />
    </div>
    <div>
      <Dropdown placeholder='Left Bottom' position='left-bottom' data={menu} />
    </div>

    <div>
      <Dropdown placeholder='Auto Position' position='auto' data={menu} />
    </div>
  </div>
);

export default App;
