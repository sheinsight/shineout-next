/**
 * Dropdown Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { DropdownSemanticKey } from '@sheinx/base';
import { Dropdown } from 'shineout';

const dropdownData = [
  { content: 'Option 1' },
  { content: 'Option 2' },
  { content: 'Option 3', children: [{ content: 'Sub Option 1' }, { content: 'Sub Option 2' }] },
];

const DropdownSemanticDemo: React.FC = () => (
  <Dropdown
    data={dropdownData}
    placeholder='Dropdown'
    position='bottom-left'
  />
);

const dropdownSemantic: SemanticSchema<DropdownSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Dropdown 最外层容器',
      en: 'Dropdown outermost wrapper element',
      version: '3.10.0',
      example: `<Dropdown
  classNames={{ root: 'my-dropdown' }}
  styles={{ root: { display: 'inline-block' } }}
/>`,
    },
    {
      key: 'button',
      cn: '触发按钮',
      en: 'Trigger button',
      version: '3.10.0',
      example: `<Dropdown
  classNames={{ button: 'my-button' }}
  styles={{ button: { borderRadius: 4 } }}
/>`,
    },
    {
      key: 'caret',
      cn: '箭头图标',
      en: 'Arrow icon',
      version: '3.10.0',
      example: `<Dropdown
  classNames={{ caret: 'my-caret' }}
  styles={{ caret: { color: '#1890ff' } }}
/>`,
    },
    {
      key: 'list',
      cn: '下拉菜单面板',
      en: 'Dropdown menu panel',
      version: '3.10.0',
      example: `<Dropdown
  classNames={{ list: 'my-list' }}
  styles={{ list: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'item',
      cn: '菜单项',
      en: 'Menu item',
      version: '3.10.0',
      example: `<Dropdown
  classNames={{ item: ({ open }) => open ? 'item-open' : '' }}
  styles={{ item: { padding: '4px 12px' } }}
/>`,
    },
    {
      key: 'group',
      cn: '分组标题',
      en: 'Group title',
      version: '3.10.0',
      example: `<Dropdown
  classNames={{ group: 'my-group' }}
  styles={{ group: { fontWeight: 'bold' } }}
/>`,
    },
  ],
  demo: DropdownSemanticDemo,
};

export default dropdownSemantic;
