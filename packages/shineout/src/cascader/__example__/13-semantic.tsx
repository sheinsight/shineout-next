/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / header / popup / list / option）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / header / popup / list / option).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Cascader } from 'shineout';

const cascaderData = [
  {
    id: '1',
    name: 'Asia',
    children: [
      {
        id: '1-1',
        name: 'China',
        children: [
          { id: '1-1-1', name: 'Shanghai' },
          { id: '1-1-2', name: 'Beijing' },
        ],
      },
      {
        id: '1-2',
        name: 'Japan',
        children: [{ id: '1-2-1', name: 'Tokyo' }],
      },
    ],
  },
  {
    id: '2',
    name: 'Europe',
    children: [
      {
        id: '2-1',
        name: 'France',
        children: [{ id: '2-1-1', name: 'Paris' }],
      },
      {
        id: '2-2',
        name: 'Germany',
        children: [{ id: '2-2-1', name: 'Berlin' }],
      },
    ],
  },
];

export default () => {
  return (
    <Cascader
      data={cascaderData}
      keygen='id'
      renderItem={(node: any) => node.name}
      placeholder='Select a location'
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 6 },
        header: { background: '#f0f7ff' },
        popup: { borderRadius: 4 },
        list: { borderRight: '1px solid #f0f0f0' },
        option: { padding: '8px 12px' },
      }}
    />
  );
};
