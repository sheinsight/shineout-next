/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / badge）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / badge).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Badge } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      {/* styles */}
      <Badge
        count={5}
        styles={{
          badge: { background: '#1890ff', boxShadow: '0 0 0 2px #fff' },
        }}
      >
        <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4 }} />
      </Badge>

      {/* classNames + dot */}
      <Badge
        dot
        classNames={{ root: 'my-badge', badge: 'my-dot' }}
        styles={{
          badge: { background: '#52c41a' },
        }}
      >
        <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4 }} />
      </Badge>

      {/* standalone */}
      <Badge
        count={99}
        styles={{
          badge: { background: '#ff4d4f', borderRadius: 10 },
        }}
      />
    </div>
  );
};
