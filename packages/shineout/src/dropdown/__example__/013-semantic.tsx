/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / button / caret / list / item / group）。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`open` / `disabled`），可按状态动态返回 class。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / button / caret / list / item / group).
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`open` / `disabled`) and can return different classes based on state.
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Dropdown } from 'shineout';

const data = [
  { content: 'Edit' },
  { content: 'Copy' },
  { content: 'Delete', disabled: true },
  { content: 'More', children: [{ content: 'Archive' }, { content: 'Export' }] },
];

export default () => {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      {/* 静态 classNames + styles */}
      <Dropdown
        data={data}
        placeholder='Actions'
        classNames={{ root: 'my-dropdown' }}
        styles={{
          list: { borderRadius: 8 },
          item: { padding: '4px 12px' },
        }}
      />

      {/* 函数式 classNames */}
      <Dropdown
        data={data}
        placeholder='Dynamic'
        classNames={{
          root: ({ open }) => (open ? 'dropdown-open' : ''),
          caret: ({ open }) => (open ? 'caret-rotated' : ''),
        }}
        styles={{
          button: { borderRadius: 20 },
        }}
      />
    </div>
  );
};
