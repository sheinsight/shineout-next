# Tabs

- Review 日期：2026-11-05
- 核实状态：仅初审
- 涉及文件：
  - packages/shineout/src/tabs/tabs.tsx
  - packages/base/src/tabs/tabs.tsx
  - packages/base/src/tabs/tabs-header.tsx
  - packages/base/src/tabs/tabs-panel.tsx
  - packages/hooks/src/components/use-tabs/use-tabs.ts
  - packages/shineout-style/src/tabs/
- 状态：待优化

## 概要

Tabs 组件通过 useTabs hook 管理激活 tab 和面板列表，支持 lazy 加载、collapsible 折叠、sticky 粘性等高级特性。整体设计合理，但存在受控/非受控混淆、动画定时器未清理、语义化 DOM 配置未正确传递等问题。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| TABS-1 | P1 | bug | packages/hooks/src/components/use-tabs/use-tabs.ts:6-14 | useTabs hook 中 active 的初始化存在逻辑问题。行 6 中 `active = defaultActive` 且 `defaultActive` 的初始值为 undefined，导致第一次渲染时 getActive() 返回 undefined 而非 defaultActive 的实际值 | 改为 `const active = props.active !== undefined ? props.active : defaultActive` |
| TABS-2 | P1 | bug | packages/base/src/tabs/tabs.tsx:158-175 | collapsible 动画中使用 setTimeout 硬编码延迟 10ms 和 200ms，未在组件卸载时清理定时器。若快速卸载和重新挂载 Tabs，定时器仍会执行 | 使用 useEffect 返回清理函数清除定时器；考虑将延迟作为可配置参数 |
| TABS-3 | P1 | a11y | packages/base/src/tabs/tabs.tsx:1-330 | tab 按钮缺少 role="tab"、role="tablist"、aria-selected、aria-controls 等属性，无键盘导航（Arrow Left/Right/Home/End） | 在 TabsHeader 中为 tab 添加 role="tab" 和 aria-selected；在 tab list 容器添加 role="tablist"；实现键盘导航 |
| TABS-4 | P1 | perf | packages/base/src/tabs/tabs.tsx:84-85 | panelRef 和 panelHeight 使用 useRef 保存，但 panelStyle 使用 useState。动画时频繁调用 setPanelStyle，导致每次都重新计算 contentStyle（虽有 useMemo，但依赖包含 semStyle） | 将 panelStyle 改为 useRef，使用 requestAnimationFrame 更新 DOM，减少 setState 调用 |
| TABS-5 | P2 | types | packages/base/src/tabs/tabs.tsx:63 | shape 属性的处理逻辑混乱：行 63 中检查 `shapeProps !== 'bordered'` 然后赋值 'card'，但 TabsProps 中定义的 shape 类型可能不包含 'bordered' | 明确 shape 类型定义，更新注释说明弃用的值 |
| TABS-6 | P2 | maintainability | packages/base/src/tabs/tabs.tsx:145-151 | getDataProps 返回的数据属性中包含 position、shape、size 等，但这些值的映射关系不清晰（如 position 与 getPosition() 的关系） | 在 TabsProps 文档中明确说明 data-* 属性的含义 |
| TABS-7 | P2 | test | packages/shineout/src/tabs/__test__/ | 现有测试缺少：受控/非受控切换、快速卸载时的定时器清理、collapsible 动画完整性、键盘导航 | 补充上述测试用例 |

## 详细说明

### TABS-1: 受控/非受控初始化 bug

**触发场景**：使用 `<Tabs defaultActive={2}><TabsPanel /><TabsPanel /><TabsPanel /></Tabs>` 时，第一个 tab 不应被激活。

**原因分析**：
- use-tabs.ts 行 6：`const { defaultActive, active = defaultActive, onChange } = props`
- 当 `props.active` 为 undefined 时，`active` 被赋值 `defaultActive`
- 但 `defaultActive` 在解构时也可能是 undefined（如果未传入）
- 行 14 中 `getActive()` 返回 `props.active` 或 `activeTabs`，但两者初始化不一致

**修复思路**：
- 在 useTabs 中明确初始化 active 的优先级：`props.active !== undefined ? props.active : props.defaultActive`
- 在 tabs.tsx 中确保 defaultActive 有默认值（如 0）

### TABS-2: 动画定时器未清理

**触发场景**：在 collapsible tabs 上快速切换折叠状态，然后卸载组件。定时器仍会执行并可能改变已卸载组件的状态。

**原因分析**：
- tabs.tsx 行 158-175 中 useLayoutEffect 内部使用了两个 setTimeout（行 164 和 170）
- 这些定时器没有在组件卸载时清理
- 如果在定时器执行之前组件被卸载，会导致内存泄漏和"Can't perform a React state update on an unmounted component"警告

**修复思路**：
```tsx
useLayoutEffect(() => {
  if (!panelRef.current) return;
  let timerId: NodeJS.Timeout;
  if (collapsible) {
    if (collapse) {
      panelHeight.current = panelRef.current.clientHeight;
      setPanelStyle({ height: panelRef.current.clientHeight });
      timerId = setTimeout(() => {
        setPanelStyle({ height: 0, flex: autoFill ? 0 : 'none', overflow: 'hidden' });
      }, 10);
    } else {
      // ...
    }
  }
  return () => clearTimeout(timerId); // 清理定时器
}, [collapse, collapsible, autoFill]);
```

### TABS-3: 缺少辅助功能属性

**触发场景**：屏幕阅读器用户或仅使用键盘导航的用户访问 Tabs。

**原因分析**：
- tabs-header.tsx 中渲染的 tab 按钮缺少 `role="tab"` 和 `aria-selected` 属性
- tab list 容器缺少 `role="tablist"`
- 没有键盘事件处理（Arrow Left/Right 切换 tab，Home/End 切换到第一个/最后一个）

**修复思路**：
- 在 TabsHeader 中为 tab 容器添加 `role="tablist"`
- 为每个 tab 按钮添加 `role="tab"` 和 `aria-selected={tab.id === active}`
- 实现 onKeyDown 事件处理 ArrowLeft/Right/Home/End

### TABS-4: 动画性能问题

**触发场景**：快速点击 collapsible tab 多次，观察渲染次数。

**原因分析**：
- 行 84-85 定义 panelRef 和 panelHeight，但 panelStyle 使用 useState
- 行 85-94 中 contentStyle 使用 useMemo，但依赖包含 semStyle（可能频繁变化）
- 每次 setPanelStyle 都会导致重新渲染和 contentStyle 重新计算

**修复思路**：
- 使用 useRef 保存 panelStyle，通过 requestAnimationFrame 直接操作 DOM 的 style 属性
- 减少 setState 调用，从而减少重新渲染次数

## 测试覆盖

现有测试覆盖了基本的 tab 切换和渲染。缺失的测试：
- 受控模式下 active 值变化
- defaultActive 的正确初始化
- collapsible 动画的完整周期和定时器清理
- 快速卸载时的内存泄漏
- 键盘导航（Arrow、Home、End）
- 屏幕阅读器兼容性

## TODO

- [ ] P0/P1 未经核实，修复前先对照源码确认
- [ ] 补全不完整的位置（“全文”、“1-187” 之类的区间）
