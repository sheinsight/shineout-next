/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / section / indicator / description）。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`loading`），可按状态动态返回 class。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / section / indicator / description).
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`loading`) and can return different classes based on state.
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Spin } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {/* 独立模式 + tip + styles */}
      <Spin
        name="ring"
        tip="Loading..."
        classNames={{
          indicator: 'my-indicator',
          description: 'my-description',
        }}
        styles={{
          root: { padding: 16, flex: 1, },
          description: { fontSize: 14, marginTop: 8 },
        }}
      />

      {/* 容器模式 + 函数式 classNames */}
      <Spin
        name="ring"
        tip="Please wait"
        loading
        classNames={{
          root: ({ loading }) => loading ? 'my-spin my-spin--loading' : 'my-spin',
          section: 'my-loading-mask',
        }}
        styles={{
          root: { padding: 16, flex: 1, },
          section: { backdropFilter: 'blur(2px)' },
        }}
      >
        <div style={{ padding: 24, background: '#f5f5f5', borderRadius: 8, width: '100%' }}>
          <p>Some content here</p>
          <p>More content below</p>
        </div>
      </Spin>
    </div>
  );
};
