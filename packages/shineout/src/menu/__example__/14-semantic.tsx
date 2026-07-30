/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / header / list / item / itemContent / title / icon / expand）。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`mode` / `theme` / `active` / `open` / `level` 等），可按状态动态返回 class。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / header / list / item / itemContent / title / icon / expand).
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`mode` / `theme` / `active` / `open` / `level`, etc.) and can return different classes based on state.
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Menu } from 'shineout';

const data = [
  {
    id: '1',
    title: 'Navigation One',
    children: [
      { id: '1-1', title: 'Option 1' },
      { id: '1-2', title: 'Option 2' },
      { id: '1-3', title: 'Option 3' },
    ],
  },
  {
    id: '2',
    title: 'Navigation Two',
    children: [
      { id: '2-1', title: 'Option 1' },
      { id: '2-2', title: 'Option 2' },
    ],
  },
  { id: '3', title: 'Navigation Three' },
];

export default () => {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      {/* 静态 classNames + styles */}
      <Menu
        keygen='id'
        data={data}
        renderItem={(d: any) => d.title}
        defaultOpenKeys={['1']}
        style={{ width: 256, height: 'auto' }}
        classNames={{ root: 'my-menu' }}
        styles={{
          root: { borderRadius: 8 },
          item: { borderRadius: 4 },
          title: { fontSize: 14 },
        }}
      />

      {/* 函数式 classNames（根据状态动态设置） */}
      <Menu
        keygen='id'
        data={data}
        renderItem={(d: any) => d.title}
        defaultOpenKeys={['2']}
        style={{ width: 256, height: 'auto' }}
        classNames={{
          item: ({ active, open }) => {
            if (active) return 'menu-item-active';
            if (open) return 'menu-item-open';
            return '';
          },
          expand: ({ open }) => (open ? 'expand-rotated' : ''),
        }}
        styles={{
          header: { padding: '12px 16px', fontWeight: 'bold' },
        }}
        header="My Menu"
      />
    </div>
  );
};
