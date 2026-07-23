/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / item）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / item).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Gap } from 'shineout';

export default () => {
  return (
    <Gap
      column={12}
      row={12}
      classNames={{ root: 'my-gap', item: 'my-gap-item' }}
      styles={{
        root: { padding: 16, background: '#fafafa', borderRadius: 8 },
        item: { flex: '0 0 auto' },
      }}
    >
      <div style={{ padding: '8px 16px', background: '#e6f4ff', borderRadius: 4 }}>Item 1</div>
      <div style={{ padding: '8px 16px', background: '#e6f4ff', borderRadius: 4 }}>Item 2</div>
      <div style={{ padding: '8px 16px', background: '#e6f4ff', borderRadius: 4 }}>Item 3</div>
    </Gap>
  );
};
