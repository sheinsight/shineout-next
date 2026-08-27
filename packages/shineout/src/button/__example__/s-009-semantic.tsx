/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / loading）。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`disabled` / `loading`），可按状态动态返回 class。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / loading).
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`disabled` / `loading`) and can return different classes based on state.
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Button } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      {/* 静态 classNames + styles */}
      <Button
        type="primary"
        classNames={{ root: 'my-button' }}
        styles={{ root: { borderRadius: 20 } }}
      >
        Rounded Button
      </Button>

      {/* 函数式 classNames */}
      <Button
        type="primary"
        loading
        classNames={{
          root: ({ loading }) => loading ? 'btn btn--loading' : 'btn',
          loading: 'my-spinner',
        }}
        styles={{
          loading: { marginRight: 8 },
        }}
      >
        Submitting
      </Button>
    </div>
  );
};
