/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / item / footer）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / item / footer).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { List } from 'shineout';

const data = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

export default () => {
  return (
    <List
      keygen={(d) => d}
      data={data}
      bordered
      renderItem={(d) => d}
      footer='Total: 5 items'
      styles={{
        root: { borderRadius: 8 },
        item: { padding: '12px 16px' },
        footer: { padding: '8px 16px', color: '#999', borderTop: '1px solid #f0f0f0' },
      }}
    />
  );
};
