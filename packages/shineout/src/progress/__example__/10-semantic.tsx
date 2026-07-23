/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / track / indicator / content / icon）。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`value` / `type` / `shape`），可按状态动态返回 class。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / track / indicator / content / icon).
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`value` / `type` / `shape`) and can return different classes based on state.
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Progress } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Line 模式 + 静态 classNames + styles */}
      <Progress
        shape="line"
        value={65}
        classNames={{
          root: 'my-progress',
          track: 'my-track',
          indicator: 'my-indicator',
        }}
        styles={{
          track: { borderRadius: 4, height: 10 },
          indicator: { borderRadius: 4 },
        }}
      >
        65%
      </Progress>

      {/* Circle 模式 + 函数式 classNames */}
      <div style={{ display: 'flex', gap: 24 }}>
        <Progress
          shape="circle"
          value={80}
          size={80}
          strokeWidth={6}
          classNames={{
            root: ({ value }) => value >= 100 ? 'progress-done' : 'progress-active',
            content: 'my-circle-content',
          }}
          styles={{
            content: { fontSize: 16, fontWeight: 'bold' },
          }}
        >
          80%
        </Progress>

        <Progress
          shape="circle"
          value={100}
          type="success"
          size={80}
          strokeWidth={6}
          icon
          classNames={{
            root: ({ type }) => `progress-${type}`,
            icon: 'my-icon',
          }}
        />
      </div>
    </div>
  );
};
