/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 选项精准定制 Message 内部 DOM 节点（root / item / message）。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`position`），可按状态动态返回 class。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` options to customize internal DOM nodes (root / item / message).
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`position`) and can return different classes based on state.
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Button, Message } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {/* 静态 classNames + styles */}
      <Button
        onClick={() => {
          Message.info('Styled message with custom shadow', 3, {
            classNames: {
              item: 'my-message-item',
              message: 'my-message-content',
            },
            styles: {
              item: { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
              message: { borderRadius: 8 },
            },
          });
        }}
      >
        Static classNames
      </Button>

      {/* 函数式 classNames */}
      <Button
        onClick={() => {
          Message.success('Position-aware styling', 3, {
            position: 'top-right',
            classNames: {
              root: ({ position }) => `msg-root msg-root--${position}`,
            },
            styles: {
              root: { zIndex: 2000 },
            },
          });
        }}
      >
        Functional classNames
      </Button>
    </div>
  );
};
