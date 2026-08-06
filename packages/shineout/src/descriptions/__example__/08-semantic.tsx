/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / header / title / extra / table / label / value）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / header / title / extra / table / label / value).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Descriptions } from 'shineout';

const items = [
  { label: 'Name', value: 'Tom' },
  { label: 'Age', value: '28' },
  { label: 'Address', value: 'New York No. 1 Lake Park' },
  { label: 'Phone', value: '123-456-7890' },
  { label: 'Company', value: 'Shein' },
  { label: 'Position', value: 'Engineer' },
];

export default () => {
  return (
    <Descriptions
      title='User Info'
      extra='Detail'
      items={items}
      border
      column={3}
      styles={{
        root: { borderRadius: 8 },
        header: { marginBottom: 12 },
        title: { fontSize: 16, fontWeight: 600 },
        extra: { color: '#1890ff', cursor: 'pointer' },
        table: { width: '100%' },
        label: { fontWeight: 500, color: '#666' },
        value: { color: '#333' },
      }}
    />
  );
};
