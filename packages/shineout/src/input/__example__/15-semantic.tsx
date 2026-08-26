/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / input）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / input).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Input } from 'shineout';

export default () => {
  return (
    <Input
      placeholder='Enter text'
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 8 },
        input: { fontSize: 16, color: '#333' },
      }}
    />
  );
};
