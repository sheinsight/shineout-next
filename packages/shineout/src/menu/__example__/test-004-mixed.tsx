/**
 * cn - 混合使用埋点属性
 *    -- 同时使用数据中的 data-* 属性和 getItemProps 函数，getItemProps 优先级更高
 * en - Mixed Tracking
 *    -- Use both data-* attributes in data and getItemProps function, getItemProps has higher priority
 */

import React, { useState } from 'react';
import { Menu, TYPE } from 'shineout';

interface MenuItem {
  id: string;
  title: string;
  children?: MenuItem[];
  // 数据中的埋点属性（方案2）
  'data-apmclick'?: string;
  'data-custom'?: string;
}

type MenuProps = TYPE.Menu.Props<MenuItem, string>;
type MenuActive = MenuProps['active'];
type MenuRenderItem = MenuProps['renderItem'];
type MenuGetItemProps = MenuProps['getItemProps'];

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
    'data-apmclick': 'from-data-nav-one',
    'data-custom': 'custom-value-1',
  },
  {
    id: '3',
    title: 'Navigation Two',
    'data-apmclick': 'from-data-nav-two',
    'data-custom': 'custom-value-2',
    children: [
      {
        id: '4',
        title: 'Option 1',
        'data-apmclick': 'from-data-option-1',
      },
      {
        id: '5',
        title: 'Option 2',
        // 这个会被 getItemProps 覆盖
        'data-apmclick': 'this-will-be-overridden',
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
    ],
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

  // getItemProps 会覆盖数据中的属性
  const getItemProps: MenuGetItemProps = (item, { level, hasChildren }) => {
    // 只为有子节点的项设置 data-apmclick（会覆盖数据中的值）
    if (hasChildren) {
      return {
        'data-apmclick': `from-function-parent-${item.id}`,
        'data-level': String(level),
      };
    }

    // 叶子节点不返回 data-apmclick，使用数据中的值
    return {
      'data-level': String(level),
    };
  };

  return (
    <div>
      <div style={{ marginBottom: 16, color: '#666' }}>
        <p>提示：打开浏览器开发者工具，检查每个菜单项的属性</p>
        <p>
          <strong>混合使用规则：</strong>
        </p>
        <ul style={{ marginLeft: 20 }}>
          <li>Navigation One: 使用数据中的 data-apmclick=&quot;from-data-nav-one&quot;</li>
          <li>
            Navigation Two (父节点): getItemProps 覆盖为
            data-apmclick=&quot;from-function-parent-3&quot;
          </li>
          <li>Option 1: 使用数据中的 data-apmclick=&quot;from-data-option-1&quot;</li>
          <li>
            Option 2: getItemProps 没有设置，使用数据中的
            data-apmclick=&quot;this-will-be-overridden&quot;
          </li>
          <li>所有项都有 data-level 属性（来自 getItemProps）</li>
          <li>data-custom 属性会保留（getItemProps 没有覆盖）</li>
        </ul>
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
