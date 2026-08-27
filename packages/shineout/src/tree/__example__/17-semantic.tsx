/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / node / content / icon）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / node / content / icon).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
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
  { id: '3', name: 'Node 3 (leaf)' },
];

export default () => {
  return (
    <Tree
      data={treeData}
      keygen='id'
      renderItem={(node: any) => node.name}
      defaultExpandAll
      styles={{
        root: { border: '1px solid #f0f0f0', borderRadius: 8, padding: 8 },
        node: { marginBottom: 2 },
        content: { borderRadius: 4, padding: '2px 8px' },
        icon: { color: '#1890ff' },
      }}
    />
  );
};
