/**
 * TreeSelect Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { TreeSelectSemanticKey } from '@sheinx/base';
import { TreeSelect } from 'shineout';

const treeData = [
  {
    id: '1',
    name: 'Option 1',
    children: [
      { id: '1-1', name: 'Option 1-1' },
      { id: '1-2', name: 'Option 1-2' },
    ],
  },
  {
    id: '2',
    name: 'Option 2',
    children: [{ id: '2-1', name: 'Option 2-1' }],
  },
  { id: '3', name: 'Option 3' },
];

const TreeSelectSemanticDemo: React.FC = () => (
  <div style={{ width: 300 }}>
    <TreeSelect
      data={treeData}
      keygen='id'
      renderItem={(node: any) => node.name}
      placeholder='Please select'
    />
  </div>
);

const treeSelectSemantic: SemanticSchema<TreeSelectSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'TreeSelect 最外层容器',
      en: 'TreeSelect outermost wrapper element',
      version: '3.10.0',
      example: `<TreeSelect
  classNames={{ root: 'my-tree-select' }}
  styles={{ root: { border: '1px solid #eee' } }}
/>`,
    },
    {
      key: 'header',
      cn: '结果区域（显示已选值 / placeholder）',
      en: 'Header area (shows selected values / placeholder)',
      version: '3.10.0',
      example: `<TreeSelect
  classNames={{ header: 'my-header' }}
  styles={{ header: { padding: '8px' } }}
/>`,
    },
    {
      key: 'popup',
      cn: '下拉面板',
      en: 'Dropdown popup panel',
      version: '3.10.0',
      example: `<TreeSelect
  classNames={{ popup: 'my-popup' }}
  styles={{ popup: { background: '#fff' } }}
/>`,
    },
    {
      key: 'list',
      cn: '树列表容器',
      en: 'Tree list container',
      version: '3.10.0',
      example: `<TreeSelect
  classNames={{ list: 'my-list' }}
  styles={{ list: { padding: 8 } }}
/>`,
    },
    {
      key: 'option',
      cn: '树节点选项',
      en: 'Tree node option',
      version: '3.10.0',
      example: `<TreeSelect
  classNames={{ option: 'my-option' }}
  styles={{ option: { borderRadius: 4 } }}
/>`,
    },
  ],
  demo: TreeSelectSemanticDemo,
};

export default treeSelectSemantic;
