/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / header / popup / list / option / optionInner）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / header / popup / list / option / optionInner).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Select } from 'shineout';

const data = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Cherry' },
  { id: '4', name: 'Date' },
  { id: '5', name: 'Elderberry' },
];

export default () => {
  return (
    <Select
      data={data}
      keygen='id'
      renderItem='name'
      placeholder='Select a fruit'
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 6 },
        header: { background: '#f0f7ff' },
        popup: { borderRadius: 4 },
        list: { padding: 4 },
        option: { borderRadius: 4 },
        optionInner: { borderBottom: '1px dashed #ccc' },
      }}
    />
  );
};
