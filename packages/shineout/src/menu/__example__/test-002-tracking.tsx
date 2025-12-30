/**
 * cn - 埋点属性
 *    -- 在数据中直接配置 data-* 属性用于埋点上报，可以区分父节点和子节点
 * en - Tracking Attributes
 *    -- Configure data-* attributes directly in the data for tracking, can distinguish between parent and child nodes
 */

import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
  // 埋点属性
  'data-apmclick'?: string;
}

type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuRenderItem = MenuProps['renderItem'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
    'data-apmclick': 'menu-nav-one',
  },
  {
    id: '3',
    title: 'Navigation Two',
    'data-apmclick': 'menu-nav-two-parent',
    children: [
      {
        id: '4',
        title: 'Option 1',
        'data-apmclick': 'menu-option-1',
      },
      {
        id: '5',
        title: 'Option 2',
        'data-apmclick': 'menu-option-2',
      },
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
    'data-apmclick': 'menu-nav-three-parent',
    children: [
      {
        id: '7',
        title: 'Option 3',
        'data-apmclick': 'menu-option-3',
      },
      {
        id: '8',
        title: 'Option 4',
        'data-apmclick': 'menu-option-4-parent',
        children: [
          {
            id: '9',
            title: 'Sub Option 1',
            'data-apmclick': 'menu-sub-option-1',
          },
          {
            id: '10',
            title: 'Sub Option 2',
            'data-apmclick': 'menu-sub-option-2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
    'data-apmclick': 'menu-nav-four',
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState('1');

  const handleClick = (d: MenuItem) => {
    console.log('Clicked item:', {
      id: d.id,
      title: d.title,
      apmclick: d['data-apmclick'],
    });
    setActive(d.id);
  };

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  const checkActive: MenuActive = (d: MenuItem) => active === d.id;

  return (
    <div>
      <div style={{ marginBottom: 16, color: '#666' }}>
        <p>提示：打开浏览器开发者工具，检查每个菜单项的 data-apmclick 属性</p>
        <p>点击菜单项查看控制台输出的埋点信息</p>
      </div>
      <Menu
        keygen="id"
        data={data}
        inlineAnimate
        inlineIndent={14}
        active={checkActive}
        onClick={handleClick}
        style={{ width: 256, border: '1px solid #e8ebf0' }}
        renderItem={renderItem}
      />
    </div>
  );
};

export default App;
