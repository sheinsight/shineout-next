/**
 * Menu Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { MenuSemanticKey } from '@sheinx/base';
import { Menu } from 'shineout';

const menuData = [
  {
    id: '1',
    title: 'Navigation One',
    children: [
      { id: '1-1', title: 'Option 1' },
      { id: '1-2', title: 'Option 2' },
    ],
  },
  { id: '2', title: 'Navigation Two' },
  { id: '3', title: 'Navigation Three' },
];

const MenuSemanticDemo: React.FC = () => (
  <Menu
    keygen='id'
    data={menuData}
    renderItem={(d: any) => d.title}
    style={{ width: 256, height: 'auto' }}
    defaultOpenKeys={['1']}
    header='Menu Title'
  />
);

const menuSemantic: SemanticSchema<MenuSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Menu 最外层容器',
      en: 'Menu outermost wrapper element',
      version: '3.10.0',
      example: `<Menu
  classNames={{ root: 'my-menu' }}
  styles={{ root: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'header',
      cn: '菜单头部区域（仅 inline 模式）',
      en: 'Menu header area (inline mode only)',
      version: '3.10.0',
      example: `<Menu
  header="My Menu"
  classNames={{ header: 'my-header' }}
  styles={{ header: { padding: '8px 16px' } }}
/>`,
    },
    {
      key: 'list',
      cn: '菜单列表容器（ul 元素）',
      en: 'Menu list container (ul element)',
      version: '3.10.0',
      example: `<Menu
  classNames={{ list: 'my-list' }}
  styles={{ list: { padding: 4 } }}
/>`,
    },
    {
      key: 'item',
      cn: '菜单项（li 元素）',
      en: 'Menu item (li element)',
      version: '3.10.0',
      example: `<Menu
  classNames={{ item: ({ active }) => active ? 'item-active' : '' }}
  styles={{ item: { borderRadius: 4 } }}
/>`,
    },
    {
      key: 'itemContent',
      cn: '菜单项内容区',
      en: 'Menu item content area',
      version: '3.10.0',
      example: `<Menu
  classNames={{ itemContent: 'my-item-content' }}
  styles={{ itemContent: { padding: '4px 8px' } }}
/>`,
    },
    {
      key: 'title',
      cn: '菜单项标题/链接',
      en: 'Menu item title/link',
      version: '3.10.0',
      example: `<Menu
  classNames={{ title: 'my-title' }}
  styles={{ title: { fontSize: 14 } }}
/>`,
    },
    {
      key: 'icon',
      cn: '菜单项图标',
      en: 'Menu item icon',
      version: '3.10.0',
      example: `<Menu
  classNames={{ icon: 'my-icon' }}
  styles={{ icon: { marginRight: 8 } }}
/>`,
    },
    {
      key: 'expand',
      cn: '展开/折叠箭头',
      en: 'Expand/collapse arrow',
      version: '3.10.0',
      example: `<Menu
  classNames={{ expand: ({ open }) => open ? 'expanded' : '' }}
  styles={{ expand: { color: '#1890ff' } }}
/>`,
    },
  ],
  demo: MenuSemanticDemo,
};

export default menuSemantic;