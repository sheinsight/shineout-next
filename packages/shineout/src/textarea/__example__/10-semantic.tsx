/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / textarea）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / textarea).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Textarea } from 'shineout';

export default () => {
  return (
    <Textarea
      placeholder='Please input'
      rows={3}
      styles={{
        root: { borderRadius: 8, border: '2px solid #1890ff' },
        textarea: { fontFamily: 'monospace', fontSize: 14 },
      }}
    />
  );
};
