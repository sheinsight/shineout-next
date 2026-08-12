/**
 * Tree Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { TreeSemanticKey } from '@sheinx/base';
import { Tree } from 'shineout';

const treeData = [
  {
    id: '1',
    name: 'Node 1',
    children: [
      { id: '1-1', name: 'Child 1-1' },
      { id: '1-2', name: 'Child 1-2' },
    ],
  },
  {
    id: '2',
    name: 'Node 2',
    children: [{ id: '2-1', name: 'Child 2-1' }],
  },
  { id: '3', name: 'Node 3' },
];

const TreeSemanticDemo: React.FC = () => (
  <div style={{ width: 300 }}>
    <Tree
      data={treeData}
      keygen='id'
      renderItem={(node) => node.name}
      defaultExpandAll
    />
  </div>
);

const treeSemantic: SemanticSchema<TreeSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Tree 最外层容器',
      en: 'Tree outermost wrapper element',
      version: '3.10.0',
      example: `<Tree
  classNames={{ root: 'my-tree' }}
  styles={{ root: { border: '1px solid #eee' } }}
/>`,
    },
    {
      key: 'node',
      cn: '每个树节点容器',
      en: 'Each tree node wrapper',
      version: '3.10.0',
      example: `<Tree
  classNames={{ node: 'my-node' }}
  styles={{ node: { padding: '4px 0' } }}
/>`,
    },
    {
      key: 'content',
      cn: '节点内容区域（含 checkbox 和文本）',
      en: 'Node content area (includes checkbox and text)',
      version: '3.10.0',
      example: `<Tree
  classNames={{ content: 'my-content' }}
  styles={{ content: { borderRadius: 4 } }}
/>`,
    },
    {
      key: 'icon',
      cn: '展开/折叠图标',
      en: 'Expand/collapse icon',
      version: '3.10.0',
      example: `<Tree
  classNames={{ icon: 'my-icon' }}
  styles={{ icon: { color: '#1890ff' } }}
/>`,
    },
  ],
  demo: TreeSemanticDemo,
};

export default treeSemantic;
