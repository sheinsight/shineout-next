/**
 * cn - 双栏布局
 *    -- Menu 通过数据来生成菜单项，设置 `inlineAnimate` 属性可以开启展开收起动画效果。
 * en - Base
 *    -- Menu generates menu items through data
 */

import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles(
  {
    doubleColumnMenu: {
      // background: '#f00',
      '@global': {
        '.soui-menu-children': {
          gridTemplateColumns: 'repeat(var(--menu-submenu-columns, 2), minmax(0, 1fr))',
        },
        '.soui-menu-item-open > .soui-menu-children': {
          display: 'grid !important',
        },
      }
    },
  },
  { name: 'custom-double-column-menu' },
);


interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
      {
        id: '12',
        title: 'Option 3',
      },
      {
        id: '13',
        title: 'Option 4',
      }
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
  },
  {
    id: '2',
    title: 'Navigation Four',
  },
  {
    id: '11',
    title: 'This is a very very very very long menu title',
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState('1');

  const handleClick = (d: MenuItem) => setActive(d.id);

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  const checkActive: MenuActive = (d: MenuItem) => active === d.id;

  const classNames = useStyle();

  return (
    <div>
      <Menu
        keygen='id'
        data={data}
        inlineAnimate
        inlineIndent={14}
        active={checkActive}
        onClick={handleClick}
        style={{ width: 256, border: '1px solid #e8ebf0' }}
        renderItem={renderItem}
        className={classNames.doubleColumnMenu}
      />
    </div>
  );
};

export default App;
