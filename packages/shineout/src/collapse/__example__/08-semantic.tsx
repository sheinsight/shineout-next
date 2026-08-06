/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / header / title / extra / content / icon）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / header / title / extra / content / icon).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Collapse } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* icon left (default) */}
      <Collapse
        defaultActive={['1']}
        styles={{
          root: { borderRadius: 8 },
          header: { background: '#fafafa' },
          title: { fontWeight: 600 },
          extra: { color: '#1890ff' },
          content: { padding: '16px 24px', color: '#333' },
          icon: { color: '#1890ff' },
        }}
      >
        <Collapse.Item keygen='1' title='Panel Title 1' extra='Extra'>
          Content of panel 1 with semantic styles.
        </Collapse.Item>
        <Collapse.Item keygen='2' title='Panel Title 2'>
          Content of panel 2 with semantic styles.
        </Collapse.Item>
      </Collapse>

      {/* icon right + extra left */}
      <Collapse
        defaultActive={['1']}
        expandIconPosition='right'
        extraPosition='left'
        styles={{
          header: { background: '#f0f7ff' },
          icon: { color: '#52c41a' },
          extra: { color: '#999' },
        }}
      >
        <Collapse.Item keygen='1' title='Right Icon' extra='Hint'>
          Icon on the right side with semantic styles.
        </Collapse.Item>
        <Collapse.Item keygen='2' title='Another Panel' extra='Info'>
          Another panel content.
        </Collapse.Item>
      </Collapse>
    </div>
  );
};
