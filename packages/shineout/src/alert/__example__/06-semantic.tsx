/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / icon / title / content / close）。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`type`），可按状态动态返回 class。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / icon / title / content / close).
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`type`) and can return different classes based on state.
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Alert } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 标题模式 + 静态 classNames + styles */}
      <Alert
        type='info'
        icon
        title='Heading'
        closable
        classNames={{
          icon: 'my-alert-icon',
          title: 'my-alert-title',
          content: 'my-alert-content',
          close: 'my-alert-close',
        }}
        styles={{
          root: { borderRadius: 8 },
          title: { fontSize: 16 },
          content: { color: '#555' },
        }}
      >
        This is a line of important text for alerting purposes
      </Alert>

      {/* 函数式 classNames：根据 type 动态切换 class */}
      <Alert
        type='danger'
        icon
        closable
        classNames={{
          root: ({ type }) => `my-alert my-alert--${type}`,
        }}
        styles={{
          root: { borderRadius: 8 },
        }}
      >
        Danger alert with functional classNames
      </Alert>
    </div>
  );
};
