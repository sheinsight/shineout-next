# Editable Area

- Review 日期：2026-11-05
- 核实状态：仅初审
- 涉及文件：packages/shineout/src/editable-area、packages/base/src/editable-area、packages/shineout-style/src/editable-area
- 状态：待优化

## 概要

EditableArea 组件是可编辑区域的实现，具有切换编辑/显示模式的功能。整体结构简洁但存在内存泄漏问题、关键的无障碍访问缺陷（清除按钮、role/aria 属性）、RTL 不支持、API 一致性问题和性能优化空间。特别是 setTimeout 未清理导致内存泄漏、清除按钮缺乏无障碍属性和键盘支持是需要优先修复的问题。

## 问题清单

| ID | 级别 | 类别 | 位置 | 问题 | 建议 |
|----|------|------|------|------|------|
| EA-1 | P1 | bug | packages/base/src/editable-area/editable-area.tsx:62-68 | setTimeout 没有 cleanup 函数，组件卸载时定时器仍在运行导致内存泄漏 | 在 useEffect 中返回 cleanup 函数调用 `clearTimeout(timer)` |
| EA-2 | P2 | a11y | packages/base/src/editable-area/editable-area.tsx:155-168 | 清除按钮使用 `<span>`，缺少 role、onKeyDown、aria-label、tabIndex，键盘用户无法使用 | 改为 `<button>` 或添加完整的 a11y 属性和键盘处理 |
| EA-3 | P2 | a11y | packages/base/src/editable-area/editable-area.tsx:96-114 | 编辑区域 div 缺少 role、aria 属性，屏幕阅读器无法识别为输入框 | 添加 `role="textbox"`、`aria-multiline="false"`、`aria-label` 等 |
| EA-4 | P2 | a11y | packages/base/src/editable-area/editable-area.tsx | 打开编辑区域后无法通过 Escape 键关闭 | 添加 onKeyDown 处理 Escape 键 |
| EA-5 | P2 | style | packages/shineout-style/src/editable-area/editable-area.ts:82-103 | 清除按钮位置硬编码 `right` 属性，RTL 模式下不工作 | 使用 CSS Logical Properties 如 `insetInlineEnd` 或添加 `[dir="rtl"]` selector |
| EA-6 | P2 | types | packages/base/src/editable-area/editable-area.type.ts:53 和 tsx:29 | `clearable` 默认值文档说 true 但实现中未设置默认值 | 在解构时设置 `clearable = true` |
| EA-7 | P2 | api | packages/base/src/editable-area/editable-area.tsx:38 | `bordered` 在解构时设置默认值 `false`，但 `clearable` 没有，API 不一致 | 统一在解构或类型定义中设置所有默认值 |
| EA-8 | P2 | test | packages/shineout/src/editable-area/__test__/editableArea.spec.tsx | 缺少测试：未传入 `clearable` 时默认为 true 且有值时是否显示清除按钮 | 补充测试用例 |
| EA-9 | P3 | perf | packages/base/src/editable-area/editable-area.tsx:70-74 | `updateShowTextarea` 未用 usePersistFn 包装，每次 render 创建新函数 | 用 usePersistFn 包装确保引用稳定 |
| EA-10 | P3 | perf | packages/base/src/editable-area/editable-area.tsx:84-115 | `renderPlaceholder` 函数每次 render 都会重新创建 | 考虑用 useMemo 缓存返回的 JSX |
| EA-11 | P3 | maintainability | packages/shineout-style/src/editable-area/editable-area.ts:97-102 | 注释掉的代码未删除（size-related padding rules） | 完全删除已注释代码或在 issue 中说明原因 |
| EA-12 | P3 | maintainability | packages/base/src/editable-area/editable-area.tsx:76-82 | 注释掉的 `size: props.size` 参数无清晰说明 | 如不支持 size 删除注释；如计划支持需在类型中补充 |
| EA-13 | P3 | maintainability | packages/base/src/editable-area/editable-area.type.ts:89-92 | 私有属性 `onShowTextareaChange` 标记为私有但用途和使用位置不清晰 | 补充文档说明或移除该属性 |
| EA-14 | P3 | api | packages/base/src/editable-area/editable-area.tsx:125 | `getPopupContainer` 类型定义不能返回 null，但传给 AbsoluteList 时可能期望返回 null | 类型应允许返回 `null`，或做类型转换 |
| EA-15 | P3 | maintainability | packages/base/src/editable-area/editable-area.tsx | 缺少 semantic DOM 支持（对应项目 MEMORY 中的需求） | 根据项目 semantic DOM 机制为 EditableArea 添加配置 |

## 详细说明

### P1 - 内存泄漏：setTimeout 未清理（EA-1）

**触发场景**：组件卸载或 show 状态快速变更时，setTimeout 回调未执行

**原因分析**：
```typescript
useEffect(() => {
  if (show && textareaRef.current) {
    setTimeout(() => {
      if (show && textareaRef.current) textareaRef.current.focus();
    });  // ❌ 没有 return 清理函数
  }
}, [show]);
```

虽然回调中检查了 show 和 textareaRef，但定时器本身仍在内存中运行。组件卸载前如果 setTimeout 未执行，定时器会持续占用内存并在后续可能引发错误。

**修复思路**：
```typescript
useEffect(() => {
  if (show && textareaRef.current) {
    const timer = setTimeout(() => {
      if (show && textareaRef.current) textareaRef.current.focus();
    });
    return () => clearTimeout(timer);
  }
}, [show]);
```

---

### P2 - 清除按钮无障碍问题（EA-2）

**触发场景**：屏幕阅读器用户、纯键盘用户无法使用清除功能

**原因分析**：
```typescript
const renderClear = () => {
  if (!clearable || !value) return null;
  return (
    <span
      onClick={() => { onChange(''); updateShowTextarea(true); }}
      className={editableAreaStyle?.clear}
    >
      {Icons.editableArea.Close}
    </span>  // ❌ 非语义化元素
  );
};
```

- 使用 `<span>` 而非 `<button>`，屏幕阅读器无法识别
- 缺少 `onKeyDown` 处理，Enter/Space 无法触发
- 缺少 `aria-label` 或 `title`
- 缺少 `tabIndex`，无法通过 Tab 键聚焦

**修复思路**：改为语义化 `<button>` 并添加完整 a11y 属性：
```typescript
<button
  onClick={() => { onChange(''); updateShowTextarea(true); }}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange('');
      updateShowTextarea(true);
    }
  }}
  className={editableAreaStyle?.clear}
  aria-label="Clear input"
  title="Clear"
  type="button"
>
  {Icons.editableArea.Close}
</button>
```

---

### P2 - 编辑区域缺少 role 和 aria 属性（EA-3）

**触发场景**：屏幕阅读器用户打开编辑区域时无法理解这是一个输入框

**原因分析**：
```typescript
<div
  tabIndex={disabled ? undefined : 0}
  onFocus={() => { updateShowTextarea(true); }}
  onClick={() => { updateShowTextarea(true); }}
  // ❌ 缺少 role、aria-label、aria-describedby 等
>
```

虽然有 tabIndex，但屏幕阅读器无法识别其用途。

**修复思路**：添加必要的 a11y 属性：
```typescript
<div
  role="textbox"
  aria-multiline="false"
  aria-label={props['aria-label'] || 'Editable area'}
  aria-readonly={disabled}
  tabIndex={disabled ? undefined : 0}
  // ...
>
```

---

### P2 - RTL 不支持（EA-5）

**触发场景**：RTL 语言环境中清除按钮位置错误

**原因分析**：
```typescript
clear: {
  position: 'absolute',
  right: token.textareaPaddingX,  // ❌ 硬编码 right
}
```

在 RTL 环境中应该在左边。

**修复思路**：使用 CSS Logical Properties：
```typescript
clear: {
  position: 'absolute',
  insetInlineEnd: token.textareaPaddingX,
}
```

---

### P2 - 默认值文档与实现不符（EA-6）

**触发场景**：未传入 clearable 时，文档说默认 true，实际行为不符

**原因分析**：
```typescript
// 类型定义
/**
 * @default true
 */
clearable?: boolean;

// 实现中未设置默认
const { clearable } = props;
if (!clearable || !value) return null;  // undefined 时 !clearable 为 true，清除按钮隐藏
```

**修复思路**：
```typescript
const { clearable = true, ... } = props;
```

---

## 测试覆盖

- ⚠️ 缺失：`clearable` 默认为 true 的场景测试
- ⚠️ 缺失：Escape 键关闭编辑区域的测试
- ⚠️ 缺失：RTL 模式下清除按钮位置的测试
- ⚠️ 缺失：键盘导航（Tab、Enter、Space）的集成测试

## A11y 相关

- ❌ 清除按钮：非语义元素，无 role、键盘支持、aria-label
- ❌ 编辑区域：缺少 role="textbox"、aria-multiline、aria-label
- ❌ 键盘操作：无 Escape 关闭支持

## 优化建议优先级

1. **立即修复**（影响用户）：EA-1（内存泄漏）、EA-2（a11y - 清除按钮）、EA-3（a11y - role）、EA-4（键盘操作）
2. **高优先级**：EA-5（RTL）、EA-6（默认值）、EA-7（API 一致性）
3. **中等优先级**：EA-9、EA-10（性能）
4. **低优先级**：EA-11-15（代码质量、测试、文档）

## TODO

- [ ] P0/P1 未经核实，修复前先对照源码确认
- [ ] 补全不完整的位置（“全文”、“1-187” 之类的区间）
