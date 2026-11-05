# Menu

- Review 日期：2026-11-05
- 核实状态：仅初审
- 涉及文件：
  - packages/shineout/src/menu/menu.tsx
  - packages/shineout/src/menu/menu.semantic.tsx
  - packages/base/src/menu/menu.tsx
  - packages/base/src/menu/item.tsx
  - packages/hooks/src/components/use-menu/use-menu.ts
  - packages/shineout-style/src/menu/
- 状态：待优化

## 概要

Menu 组件通过 useMenu hook 管理开闭状态和激活项目，支持 inline/vertical/horizontal/vertical-auto 四种模式。整体架构清晰，但存在几个关键问题：useMenu 中的异步更新机制可能存在竞态条件，内联动画逻辑中的定时器未在卸载时清理，popup 边界计算对大菜单项不够准确。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| MENU-1 | P1 | perf | packages/hooks/src/components/use-menu/use-menu.ts:75-81 | useMenu 中的 updateWithThreshold 使用固定延迟 50ms，且调用 update() 两次。在快速交互下可能导致不必要的重渲染 | 使用 useCallback 缓存函数，考虑使用 useEffect 的依赖优化，而非 setInterval 模式 |
| MENU-2 | P1 | bug | packages/base/src/menu/item.tsx:90-94 | useCollapseAnimation 返回的 shouldHideChildren 逻辑中，当 inlineAnimate 为 true 时，关闭菜单项但子菜单仍在 DOM 中。此时 shouldKeepOpen 状态传给 itemOpen 类名，可能导致样式混乱 | 确保 itemClosing 类名与 shouldHideChildren 状态同步 |
| MENU-3 | P1 | a11y | packages/base/src/menu/item.tsx:1-342 | 菜单项渲染时缺少 role="menuitem" 和 role="menu" 属性，仅有 aria 属性通过 getItemProps 传入。无键盘导航支持（Up/Down/Left/Right/Enter） | 为 ul 添加 role="menu"，li 添加 role="menuitem"，实现键盘导航 |
| MENU-4 | P2 | maintainability | packages/base/src/menu/item.tsx:96-113 | customAttributes 合并逻辑中，dataAttrs 使用 util.extractProps(dataItem, 'data-attr')，但该工具函数在代码中行为不明确 | 明确 extractProps 的行为，添加注释说明提取了哪些属性 |
| MENU-5 | P2 | test | packages/shineout/src/menu/__test__/ | 现有测试缺少：popover 边界计算、collapse 模式下的 popover 定位、inline 动画、快速切换菜单的竞态条件 | 补充测试用例覆盖上述场景 |

## 详细说明

### MENU-1: useMenu 更新机制的性能问题

**触发场景**：在树形菜单中快速展开/收起多个节点，或快速点击多个菜单项。

**原因分析**：
- `useMenu` hook 在行 75-81 中实现了 `updateWithThreshold`：先清除旧定时器，再设置新的 50ms 延迟
- 行 79-80 调用了两次 `update()`，注释说"需要更新两次 否则 inPath 状态错误"，这表明状态管理存在设计缺陷
- 快速交互会导致大量 `setTimeout` 和 `render()` 调用，造成不必要的渲染抖动

**修复思路**：
- 分析为什么需要两次更新：是否是因为第一次更新时某些状态还未计算完成？
- 如果确实需要两次更新，考虑使用 `useEffect` 依赖数组来精确控制更新时机，而非盲目延迟
- 或使用 `requestAnimationFrame` 替代 `setTimeout` 以实现与浏览器重排周期的对齐

### MENU-2: 内联动画和样式状态不同步

**触发场景**：设置 `inlineAnimate={true}`，快速展开然后收起菜单项，观察 DOM 中的类名变化。

**原因分析**：
- 行 90-94 中，`useCollapseAnimation` 返回的 `shouldHideChildren` 用于控制 `childrenHidden` 类名
- 行 326-327 中，`itemOpen` 类名由 `isOpen || popOpen || shouldKeepOpen` 决定
- `shouldKeepOpen` 是内联动画时菜单项处于关闭但 DOM 保留的状态，与 `itemClosing` 应该互斥，但代码中 itemOpen 和 itemClosing 同时应用会导致样式冲突

**修复思路**：
- 明确定义 itemOpen / itemClosing / closed 的状态转换规则
- 在 item.tsx 第 326-327 行检查是否存在样式冲突，确保类名互斥

### MENU-3: 缺少辅助功能属性和键盘导航

**触发场景**：屏幕阅读器用户访问菜单；使用键盘导航菜单。

**原因分析**：
- item.tsx 中 `<li>` 元素和 `<ul>` 元素缺少 `role="menuitem"` 和 `role="menu"` 属性
- 没有实现键盘事件监听（Up/Down/Left/Right/Enter/Escape）
- getItemProps 中虽然允许返回 aria 属性，但不是所有用户都会设置

**修复思路**：
- 在 `<ul>` 元素添加 `role="menu"`
- 在 `<li>` 或其内容区域添加 `role="menuitem"` 和 `aria-expanded`
- 在 item.tsx 中实现键盘事件处理，支持 ArrowDown/ArrowUp/ArrowLeft/ArrowRight/Enter/Escape

## 测试覆盖

现有 `__test__/menu.spec.tsx` 覆盖了基本的渲染和数据绑定。缺失的测试：
- useMenu 更新的竞态条件（快速展开/收起）
- popover 在不同边界条件下的定位计算
- inline 动画的完整周期
- 键盘导航
- 屏幕阅读器兼容性

## TODO

- [ ] P0/P1 未经核实，修复前先对照源码确认
- [ ] 补全不完整的位置（“全文”、“1-187” 之类的区间）
