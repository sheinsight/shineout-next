# Alert

- Review 日期：2026-11-05
- 核实状态：初审过浅
- 涉及文件：
  - packages/shineout/src/alert/alert.tsx
  - packages/base/src/alert/alert.tsx
  - packages/base/src/alert/alert.type.ts
  - packages/shineout-style/src/alert/
- 状态：待优化

## 概要

Alert 组件实现了警告框的基本功能，支持关闭、标题、自定义图标等特性。整体结构清晰，但存在计时器清理和 a11y 问题。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|-----|------|------|------|------|------|
| ALERT-001 | P1 | bug | packages/base/src/alert/alert.tsx:91 | 关闭动画的 setTimeout 未在组件卸载时清理，可能导致内存泄漏和已卸载组件的状态更新 | 用 useRef 保存 timeoutId，在 useEffect cleanup 中清除 |
| ALERT-002 | P2 | a11y | packages/base/src/alert/alert.tsx:121 | 关闭按钮用 `<div>` 实现，不可用键盘访问，缺少 role、tabIndex、键盘事件处理 | 改用 `<button>` 或补充 role='button'、tabIndex={0}、onKeyDown 处理 Enter/Space |
| ALERT-003 | P2 | bug | packages/base/src/alert/alert.tsx:118 | cloneElement 时用 React.Attributes 类型可能覆盖 closeItem 的其他属性 | 保留原有 props，仅合并 onClick 事件处理器 |

## 详细说明

### ALERT-001：计时器泄漏 (P1)

**触发场景**: 关闭 Alert 时，延迟 300ms 隐藏。如果组件在延迟期间卸载，setTimeout 仍会执行 setDismiss，导致"已卸载的组件无法设置状态"警告。

**原因分析**: handleClose 中的 setTimeout 没有对应的清理机制。

**修复思路**: 
```tsx
const timeoutRef = useRef<NodeJS.Timeout | null>(null);

const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
  onClose?.(e);
  if (closable === 'only') return;
  setDismiss(PENDING);
  timeoutRef.current = setTimeout(() => {
    setDismiss(HIDE);
  }, 300);
};

useEffect(() => {
  return () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
}, []);
```

### ALERT-002：关闭按钮不可聚焦 (P2)

**触发场景**: 用户使用键盘导航，无法聚焦和操作关闭按钮，只能鼠标点击。

**原因分析**: 关闭按钮是 `<div>` 元素，默认不可聚焦；缺少键盘事件处理。

**修复思路**: 将 `<div>` 改为 `<button>` 或为 div 添加 role、tabIndex、onKeyDown 处理。

### ALERT-003：cloneElement 属性覆盖 (P2)

**触发场景**: 如果自定义 closeItem 已有其他属性，cloneElement 时类型转换可能导致覆盖。

**修复思路**: 显式合并 props，保留原有属性。

## 测试覆盖

现有 `__test__/alert.spec.tsx` 测试了基本渲染、类型、标题等功能。缺失测试：
- 计时器清理（卸载时是否清除 timeout）
- 关闭按钮的键盘操作
- 自定义 closeItem 的属性保留

## TODO

- [ ] 初审一次看了 20 个组件，结论不可靠，需完整阅读源码重新 review
- [ ] 逐条核实现有条目并补全 `packages/...:行号`
