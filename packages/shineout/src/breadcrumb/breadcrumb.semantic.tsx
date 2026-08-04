/**
 * Breadcrumb Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { BreadcrumbSemanticKey } from '@sheinx/base';
import { Breadcrumb } from 'shineout';

const breadcrumbData = [
  { title: 'Home', url: '#' },
  [
    { title: 'Products', url: '#' },
    { title: 'Services', url: '#' },
    { title: 'Solutions', url: '#' },
  ],
  { title: 'Category', url: '#' },
  { title: 'Current Page' },
];

const BreadcrumbSemanticDemo: React.FC = () => (
  <Breadcrumb data={breadcrumbData} />
);

const breadcrumbSemantic: SemanticSchema<BreadcrumbSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Breadcrumb 最外层容器',
      en: 'Breadcrumb outermost wrapper element',
      version: '3.10.0',
      example: `<Breadcrumb
  classNames={{ root: 'my-breadcrumb' }}
  styles={{ root: { padding: '8px 0' } }}
/>`,
    },
    {
      key: 'item',
      cn: '每个面包屑项的容器',
      en: 'Each breadcrumb item container',
      version: '3.10.0',
      example: `<Breadcrumb
  classNames={{ item: 'my-item' }}
  styles={{ item: { display: 'inline-flex' } }}
/>`,
    },
    {
      key: 'separator',
      cn: '分隔符节点',
      en: 'Separator element between items',
      version: '3.10.0',
      example: `<Breadcrumb
  classNames={{ separator: 'my-separator' }}
  styles={{ separator: { margin: '0 8px' } }}
/>`,
    },
    {
      key: 'content',
      cn: '文本/链接内容节点',
      en: 'Text or link content element',
      version: '3.10.0',
      example: `<Breadcrumb
  classNames={{ content: 'my-content' }}
  styles={{ content: { color: '#1890ff' } }}
/>`,
    },
    {
      key: 'dropdown',
      cn: '下拉面板（data 项为数组时展开的弹出层）',
      en: 'Dropdown panel (popup when a data item is an array)',
      version: '3.10.0',
      example: `<Breadcrumb
  classNames={{ dropdown: 'my-dropdown' }}
  styles={{ dropdown: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'dropdownItem',
      cn: '下拉面板内每一项',
      en: 'Each item inside the dropdown panel',
      version: '3.10.0',
      example: `<Breadcrumb
  classNames={{ dropdownItem: 'my-dropdown-item' }}
  styles={{ dropdownItem: { padding: '4px 12px' } }}
/>`,
    },
  ],
  demo: BreadcrumbSemanticDemo,
};

export default breadcrumbSemantic;
