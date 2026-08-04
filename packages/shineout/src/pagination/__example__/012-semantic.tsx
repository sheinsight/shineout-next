/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / item / prev / next / jumper / sizeList）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / item / prev / next / jumper / sizeList).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Pagination } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* classNames + styles */}
      <Pagination
        total={200}
        defaultCurrent={3}
        layout={['links', 'jumper', 'list']}
        text={{ jumper: 'Go to {input}' }}
        classNames={{ root: 'my-pagination', prev: 'my-prev', next: 'my-next' }}
        styles={{
          item: { borderRadius: '50%' },
          jumper: { marginLeft: 16 },
          sizeList: { marginLeft: 16 },
        }}
      />

      {/* styles only */}
      <Pagination
        total={100}
        defaultCurrent={1}
        layout={['links']}
        styles={{
          root: { padding: '8px 16px', background: '#f5f5f5', borderRadius: 4 },
          prev: { color: '#1890ff' },
          next: { color: '#1890ff' },
          item: { fontWeight: 500 },
        }}
      />
    </div>
  );
};
