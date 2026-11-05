# Tag

- Review 日期：2026-11-05
- 核实状态：初审过浅
- 涉及文件：
  - packages/shineout/src/tag/tag.tsx
  - packages/base/src/tag/tag.tsx
  - packages/base/src/tag/use-tag.ts
  - packages/base/src/tag/tag.type.ts
  - packages/shineout-style/src/tag/
- 状态：待优化

## 概要

Tag 组件支持可编辑、可关闭、多种颜色和大小。通过 useTag hook 管理状态，包括关闭动画和异步关闭处理。整体功能完整。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|-----|------|------|------|------|------|
| TAG-001 | P2 | bug | packages/base/src/tag/use-tag.ts:81-84 | useEffect 依赖缺失 onCompleted 和 children，当这些值变化时不会更新内部 value 状态 | 补充依赖：[children, onCompleted] 或根据设计意图调整 |
| TAG-002 | P2 | a11y | packages/base/src/tag/tag.tsx:128-136 | 关闭按钮（closeIcon）用 div 实现，不可聚焦，缺少键盘事件处理 | 改用 button 或补充 role、tabIndex、onKeyDown 处理 |

## 详细说明

### TAG-001：useEffect 依赖缺漏 (P2)

**触发场景**: 父组件更新 children 或 onCompleted 时，Tag 的内部 value 状态不会同步更新。

**原因分析**: 第81-84 行 useEffect 只在组件挂载时执行（依赖为空数组），未追踪 children 和 onCompleted。

**修复思路**:
```tsx
useEffect(() => {
  if (onCompleted && isString(children) && !isEmpty(children)) {
    setValue(children);
  }
}, [children, onCompleted]);
```

### TAG-002：关闭按钮不可聚焦 (P2)

**触发场景**: 用户无法用键盘（Tab、Enter）访问关闭按钮，只能鼠标点击。

**原因分析**: 第128 行的 closeIcon 为 div，不可聚焦；缺少键盘事件处理。

**修复思路**: 改用 button 或补充 a11y 属性：
```tsx
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClose(e as any);
    }
  }}
  // ...
>
```

## 测试覆盖

缺少对状态变化、关闭按钮 a11y 的测试。

## TODO

- [ ] 初审一次看了 20 个组件，结论不可靠，需完整阅读源码重新 review
- [ ] 逐条核实现有条目并补全 `packages/...:行号`
