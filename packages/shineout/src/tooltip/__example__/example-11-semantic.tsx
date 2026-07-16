/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / arrow / content）。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`open` / `position` / `type`），可按状态动态返回 class。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / arrow / content).
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`open` / `position` / `type`) and can return different classes based on state.
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Tooltip } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {/* 静态字符串用法 */}
      <Tooltip
        tip="Static className on arrow & content"
        trigger="hover"
        classNames={{
          arrow: 'my-tooltip-arrow',
        }}
        styles={{
          content: { padding: 16 },
        }}
      >
        <span style={{ padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: 4, cursor: 'pointer' }}>
          Static classNames
        </span>
      </Tooltip>

      {/* 函数式 classNames：根据 open 状态动态切换 root 的 class */}
      <Tooltip
        tip="Root class changes when open"
        trigger="click"
        classNames={{
          root: ({ open }) =>
            open ? 'my-tooltip my-tooltip--visible' : 'my-tooltip',
          content: 'my-tooltip-content',
        }}
        styles={{
          content: { padding: 16 },
        }}
      >
        <span style={{ padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: 4, cursor: 'pointer' }}>
          Functional (open state)
        </span>
      </Tooltip>

      {/* 函数式 classNames：根据 type 状态动态加 class */}
      <Tooltip
        tip="Content class reflects type=danger"
        trigger="hover"
        type="danger"
        classNames={{
          root: ({ type }) =>
            type ? `my-tooltip my-tooltip--${type}` : 'my-tooltip',
          content: ({ type }) =>
            type === 'danger' ? 'my-content my-content--danger' : 'my-content',
        }}
        styles={{
          content: { padding: 16 },
        }}
      >
        <span style={{ padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: 4, cursor: 'pointer' }}>
          Functional (type state)
        </span>
      </Tooltip>

      {/* 混合：部分 key 用字符串，部分 key 用函数 */}
      <Tooltip
        tip="Mixed static + functional"
        trigger="hover"
        type="warning"
        classNames={{
          arrow: 'my-tooltip-arrow',
          root: ({ open, type }) =>
            [
              'my-tooltip',
              open && 'my-tooltip--open',
              type && `my-tooltip--${type}`,
            ]
              .filter(Boolean)
              .join(' '),
        }}
        styles={{
          content: { padding: 16 },
        }}
      >
        <span style={{ padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: 4, cursor: 'pointer' }}>
          Mixed usage
        </span>
      </Tooltip>
    </div>
  );
};
