/**
 * cn - getItemProps 埋点
 *    -- 使用 getItemProps 函数动态生成埋点属性，可以根据层级、是否有子节点等信息灵活配置
 * en - getItemProps Tracking
 *    -- Use getItemProps function to dynamically generate tracking attributes based on level, hasChildren and other information
 */

import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
}

type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuRenderItem = MenuProps['renderItem'];
type MenuGetItemProps = MenuProps['getItemProps'];

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
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Sub Option 1',
          },
          {
            id: '10',
            title: 'Sub Option 2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
  },
];

const App: React.FC = () => {
  const [active, setActive] = useState('1');

  const handleClick = (d: MenuItem) => {
    console.log('Clicked item:', d);
    setActive(d.id);
  };

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title;

  const checkActive: MenuActive = (d: MenuItem) => active === d.id;

  // 使用 getItemProps 动态生成埋点属性
  const getItemProps: MenuGetItemProps = (item, { level, hasChildren, index }) => {
    // 基础埋点属性
    const baseAttrs = {
      'data-menu-id': item.id,
      'data-level': String(level),
      'data-index': String(index),
    };

    // 根据是否有子节点设置不同的埋点标识
    if (hasChildren) {
      return {
        ...baseAttrs,
        'data-apmclick': `menu-parent-${item.id}`,
        'data-node-type': 'parent',
      };
    }

    return {
      ...baseAttrs,
      'data-apmclick': `menu-leaf-${item.id}`,
      'data-node-type': 'leaf',
    };
  };

  return (
    <div>
      <div style={{ marginBottom: 16, color: '#666' }}>
        <p>提示：打开浏览器开发者工具，检查每个菜单项的属性</p>
        <p>getItemProps 会根据是否有子节点自动生成不同的 data-apmclick 值</p>
        <p>父节点: menu-parent-*, 子节点: menu-leaf-*</p>
        <p>同时还会生成 data-level 和 data-index 等额外信息</p>
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
        getItemProps={getItemProps}
      />
    </div>
  );
};

export default App;
