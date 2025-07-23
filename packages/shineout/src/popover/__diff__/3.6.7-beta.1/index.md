# Popover 3.6.7-beta.1 版本 Diff 报告

## 问题描述

修复 Popover 组件在嵌套场景下关闭顺序不正确的问题。在之前的版本中，当多个 Popover 嵌套使用时，点击外部区域或子 Popover 区域时，可能导致父级 Popover 先于子级关闭，或者点击子 Popover 时意外关闭父 Popover，造成用户体验问题。

## 代码变更文件

- `packages/hooks/src/components/use-popup/popup-context.ts`
- `packages/hooks/src/components/use-popup/use-popup.ts`
- `packages/base/src/cascader/cascader.tsx`
- `packages/base/src/select/result-more.tsx`
- `packages/base/src/select/result-more.type.ts`
- `packages/base/src/select/result.tsx`
- `packages/base/src/select/result.type.ts`
- `packages/base/src/select/select.tsx`
- `packages/base/src/tag/tag.tsx`
- `packages/base/src/tag/tag.type.ts`
- `packages/base/src/tree-select/tree-select.tsx`
- `packages/shineout/src/popover/__doc__/changelog.cn.md`
- `packages/shineout/src/tag/tag.type.ts`
- `packages/shineout/src/cascader/__example__/test-01-tip.tsx`

## 变更代码行

### 1. popup-context.ts 变更

**变更前：**
```typescript
const defaultContext = {
  bindChild: (_ref: React.MutableRefObject<HTMLElement | null>) => {},
  removeChild: (_ref: React.MutableRefObject<HTMLElement | null>) => {},
};
```

**变更后：**
```typescript
const defaultContext = {
  addParent: (_ref: React.MutableRefObject<HTMLElement | null>) => {},
  removeParent: (_ref: React.MutableRefObject<HTMLElement | null>) => {},
  bindChild: (_ref: React.MutableRefObject<HTMLElement | null>) => {},
  removeChild: (_ref: React.MutableRefObject<HTMLElement | null>) => {},
};
```

### 2. use-popup.ts 主要变更

**变更前：**
```typescript
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
// ...
const { bindChild, removeChild } = useContext(popupContext);
// ...
useEffect(() => {
  bindChild(popupRef);
  return () => {
    removeChild(popupRef);
  };
}, []);
```

**变更后：**
```typescript
import React, { useContext, useLayoutEffect, useEffect, useRef, useState, useMemo } from 'react';
// ...
const { bindChild, removeChild, addParent, removeParent } = useContext(popupContext);
// ...
const handleAddParent = (elRef: React.MutableRefObject<HTMLElement | null>) => {
  context.chain.push(elRef);
  // 继续向上添加当前的 popupRef 到父级
  addParent(elRef);
};

const handleRemoveParent = (elRef: React.MutableRefObject<HTMLElement | null>) => {
  const index = context.chain.findIndex((item) => item === elRef);
  if (index > -1) {
    context.chain.splice(index, 1);
    removeParent(elRef);
  }
}
// ...
useLayoutEffect(() => {
  if(open){
    bindChild(popupRef);
  }
  return () => {
    removeChild(popupRef);
  };
}, [open]);
```

**providerValue 变更：**
```typescript
// 变更前
const providerValue = useMemo(
  () => ({
    bindChild: (elRef: React.MutableRefObject<HTMLElement | null>) => {
      context.chain.push(elRef);
    },
    removeChild: (elRef: React.MutableRefObject<HTMLElement | null>) => {
      const index = context.chain.findIndex((item) => item === elRef);
      if (index > -1) {
        context.chain.splice(index, 1);
      }
    },
  }),
  [],
);

// 变更后
const providerValue = useMemo(() => ({
  addParent: handleAddParent,
  removeParent: handleRemoveParent,
  bindChild: (elRef: React.MutableRefObject<HTMLElement | null>) => {
    if (elRef.current) {
      addParent(elRef);
      context.chain.push(elRef);
    }
  },
  removeChild: (elRef: React.MutableRefObject<HTMLElement | null>) => {
    const index = context.chain.findIndex((item) => item === elRef);
    if (index > -1) {
      context.chain.splice(index, 1);
      removeParent(elRef);
    }
  },
}), []);
```

### 3. 其他组件变更

移除了以下组件中的 `bindChild` 属性传递：
- `packages/base/src/cascader/cascader.tsx`
- `packages/base/src/select/result-more.tsx`
- `packages/base/src/select/result.tsx`
- `packages/base/src/select/select.tsx`
- `packages/base/src/tree-select/tree-select.tsx`

## 变更前后逻辑差异

### 变更前逻辑：
1. 每个 Popover 在组件挂载时立即通过 `useEffect` 绑定到父级
2. 只维护单向的父子关系（父级知道子级，但子级不知道父级）
3. 无论 Popover 是否打开都会进行绑定
4. 使用 `useEffect` 可能导致绑定时机晚于渲染

### 变更后逻辑：
1. 只在 Popover 打开（`open` 为 true）时才进行绑定
2. 建立双向的父子关系链（通过 `addParent` 和 `removeParent`）
3. 使用 `useLayoutEffect` 确保在 DOM 更新前完成绑定
4. 子组件绑定时会向上传递引用，形成完整的嵌套链

### 对组件运作逻辑的影响：

1. **绑定时机优化**：从组件挂载时绑定改为打开时绑定，减少了不必要的引用管理，提高了性能
2. **关系链完整性**：通过双向绑定确保了嵌套 Popover 的关系链完整，使得点击判断更加准确
3. **关闭顺序正确性**：当点击外部区域时，能够正确识别点击位置与各级 Popover 的关系，按照从内到外的顺序关闭

## 风险使用场景

### 代码执行风险：
1. **低风险**：本次修改主要是优化了内部的引用管理机制，对外部 API 无影响

### 交互体验差异：
1. **正面影响**：修复了嵌套 Popover 的关闭顺序问题，用户体验更符合直觉
2. **潜在影响场景**：
   - 之前依赖错误关闭顺序的代码可能需要调整
   - 深度嵌套（3层以上）的 Popover 场景现在会严格按照层级关系关闭

### 需要注意的场景：
1. **动态嵌套 Popover**：如果在运行时动态创建嵌套 Popover，需要确保父子关系正确建立
2. **条件渲染的 Popover**：由于现在只在打开时绑定，条件渲染的 Popover 行为更加合理
3. **性能优化**：减少了未打开 Popover 的引用管理开销，在有大量 Popover 的页面中性能会有提升

## 总结

本次修复通过重构 Popover 的父子关系管理机制，解决了嵌套场景下的关闭顺序问题。修改主要集中在内部实现，对外部 API 无破坏性变更，提升了用户体验和代码健壮性。