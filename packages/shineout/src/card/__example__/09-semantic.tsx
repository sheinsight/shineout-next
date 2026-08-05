/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / header / headerContent / headerExtra / body / footer）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / header / headerContent / headerExtra / body / footer).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Card } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Card
        style={{ width: 320 }}
        classNames={{ root: 'my-card' }}
        styles={{
          root: { borderRadius: 12 },
          header: { background: '#fafafa', borderRadius: '12px 12px 0 0' },
          headerContent: { fontWeight: 600, fontSize: 16 },
          headerExtra: { color: '#1890ff' },
          body: { padding: '16px 24px', color: '#333' },
          footer: { borderTop: '1px solid #f0f0f0' },
        }}
      >
        <Card.Header extra='More'>Card Title</Card.Header>
        <Card.Body>This is the card content area with semantic styles applied.</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    </div>
  );
};
