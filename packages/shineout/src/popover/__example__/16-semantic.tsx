/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / arrow / content）。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`open` / `position` / `type`），可按状态动态返回 class。
 *    -- **`styles.arrow` 注意**：该 prop 作用于箭头 div 容器本身，箭头三角形由 `::before` 的 `clip-path` 绘制。直接设置 `backgroundColor` 会遮盖三角形，修改箭头颜色请用 `background` prop。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / arrow / content).
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`open` / `position` / `type`) and can return different classes based on state.
 *    -- **`styles.arrow` note**: This prop targets the arrow wrapper div. The triangle is drawn by `::before` via `clip-path` — setting `backgroundColor` on the div will cover it. Use the `background` prop to change the arrow color instead.
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Button, Popover } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {/* 静态字符串用法：用 background prop 同时改内容区和箭头颜色 */}
      <Button mode='outline'>
        Static classNames
        <Popover
          background='#f0f7ff'
          classNames={{
            arrow: 'my-popover-arrow',
          }}
          styles={{
            content: { padding: 16 },
          }}
        >
          Static className on arrow
        </Popover>
      </Button>

      {/* 函数式 classNames：根据 open 状态动态切换 root 的 class */}
      <Button mode='outline'>
        Functional (open state)
        <Popover
          classNames={{
            root: ({ open }) =>
              open ? 'my-popover my-popover--visible' : 'my-popover',
            content: 'my-popover-content',
          }}
          styles={{
            content: { padding: 16 },
          }}
        >
          Root class changes when open
        </Popover>
      </Button>

      {/* 函数式 classNames：根据 type 状态动态加 class */}
      <Button mode='outline'>
        Functional (type state)
        <Popover
          type='danger'
          classNames={{
            root: ({ type }) =>
              type ? `my-popover my-popover--${type}` : 'my-popover',
            content: ({ type }) =>
              type === 'danger' ? 'my-content my-content--danger' : 'my-content',
          }}
          styles={{
            content: { padding: 16 },
          }}
        >
          Content class reflects type=danger
        </Popover>
      </Button>

      {/* 混合：部分 key 用字符串，部分 key 用函数 */}
      <Button mode='outline'>
        Mixed usage
        <Popover
          type='warning'
          background='#fffbe6'
          classNames={{
            arrow: 'my-popover-arrow',                       // 静态字符串
            root: ({ open, type }) =>                        // 函数式
              [
                'my-popover',
                open && 'my-popover--open',
                type && `my-popover--${type}`,
              ]
                .filter(Boolean)
                .join(' '),
          }}
          styles={{
            content: { padding: 16 },
          }}
        >
          Mixed static + functional
        </Popover>
      </Button>
    </div>
  );
};
