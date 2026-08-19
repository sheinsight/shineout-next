/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / header / popup / list / option）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / header / popup / list / option).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { TreeSelect } from 'shineout';

const treeData = [
  {
    id: '1',
    name: 'Asia',
    children: [
      { id: '1-1', name: 'China' },
      { id: '1-2', name: 'Japan' },
    ],
  },
  {
    id: '2',
    name: 'Europe',
    children: [
      { id: '2-1', name: 'France' },
      { id: '2-2', name: 'Germany' },
    ],
  },
];

export default () => {
  return (
    <TreeSelect
      data={treeData}
      keygen='id'
      renderItem={(node: any) => node.name}
      placeholder='Select a location'
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 6 },
        header: { background: '#f0f7ff' },
        popup: { borderRadius: 4 },
        list: { padding: 4 },
        option: { borderRadius: 4 },
      }}
    />
  );
};
