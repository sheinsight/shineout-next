/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / icon）。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`disabled`），可按状态动态返回 class。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / icon).
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`disabled`) and can return different classes based on state.
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Link } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Link
        href="#"
        icon
        classNames={{
          root: ({ disabled }) => disabled ? 'link link--disabled' : 'link',
          icon: 'link-icon',
        }}
        styles={{
          icon: { marginRight: 8 },
        }}
      >
        Semantic Link
      </Link>

      <Link
        href="#"
        type="danger"
        styles={{ root: { fontWeight: 'bold' } }}
      >
        Styled Link
      </Link>
    </div>
  );
};
