/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / header / list / item / operations）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / header / list / item / operations).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Transfer } from 'shineout';

const data = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

export default () => {
  return (
    <Transfer
      data={data}
      keygen='id'
      renderItem='name'
      defaultValue={[5, 6]}
      titles={['Source', 'Target']}
      styles={{
        root: { borderRadius: 8 },
        header: { background: '#f0f7ff', padding: '8px 12px' },
        list: { padding: 4 },
        item: { borderRadius: 4 },
        operations: { padding: '0 16px' },
      }}
    />
  );
};
