/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / icon / description）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / icon / description).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Empty } from 'shineout';

export default () => {
  return (
    <Empty
      styles={{
        root: { padding: '40px 0' },
        icon: { marginBottom: 16 },
        description: { color: '#999', fontSize: 14 },
      }}
    />
  );
};
