/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / wrapper / closeIcon）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / wrapper / closeIcon).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Tag } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* root + wrapper styling */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag
          color='info'
          styles={{
            root: { borderRadius: 16, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
            wrapper: { padding: '0 12px', fontWeight: 500 },
          }}
        >
          Custom Root &amp; Wrapper
        </Tag>

        <Tag
          color='success'
          shape='rounded'
          classNames={{
            root: 'custom-tag-root',
          }}
          styles={{
            root: { border: '2px solid #52c41a' },
          }}
        >
          Rounded
        </Tag>
      </div>

      {/* closeIcon styling */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag
          color='warning'
          onClose
          styles={{
            closeIcon: { color: '#fa8c16', fontSize: 14 },
          }}
        >
          Close Style
        </Tag>

        <Tag
          color='danger'
          onClose
          styles={{
            root: { borderRadius: 4 },
            wrapper: { padding: '0 8px' },
            closeIcon: { color: '#ff4d4f' },
          }}
        >
          All Slots
        </Tag>
      </div>
    </div>
  );
};
