# Popover 组件 resize 和滚动跟随优化 diff 报告

## 问题描述

优化 Popover 和 Tooltip 组件在窗口 resize 和父容器滚动后依然能跟随目标元素。之前在窗口大小变化或父容器滚动时，弹出层位置不会自动更新，导致弹出层与触发元素错位。本次修改通过监听 resize 和 scroll 事件，实时更新弹出层位置。

## 代码变更文件

- `packages/base/src/popover/popover.tsx`
- `packages/base/src/tooltip/tooltip.tsx`
- `packages/hooks/src/common/use-position-style/index.ts`

## 变更代码行

### packages/base/src/popover/popover.tsx

1. **引入新的工具函数**（第1行）
   ```diff
   -import { usePersistFn, usePopup, useRender, util } from '@sheinx/hooks';
   +import { getClosestScrollContainer, usePersistFn, usePopup, useRender, util } from '@sheinx/hooks';
   ```

2. **添加更新状态管理**（第56-59行）
   ```diff
   +  const [updateKey, setUpdateKey] = React.useState(0);
   +  const handleUpdateKey = () => {
   +    setUpdateKey(prev => (prev + 1) % 2);
   +  }
   ```

3. **bindEvents 函数中添加事件监听**（第70-75行）
   ```diff
   +    window?.addEventListener('resize', handleUpdateKey);
   +    const scrollContainer = getClosestScrollContainer(targetEl);
   +    if (scrollContainer) {
   +      scrollContainer.addEventListener('scroll', handleUpdateKey);
   +    }
   ```

4. **unbindEvents 函数中添加事件移除**（第85-91行）
   ```diff
   +    window?.removeEventListener('resize', handleUpdateKey);
   +    const scrollContainer = getClosestScrollContainer(targetEl);
   +    if (scrollContainer) {
   +      scrollContainer.addEventListener('scroll', handleUpdateKey);
   +    }
   ```
   注意：这里存在一个bug，应该是 removeEventListener 而不是 addEventListener

5. **AbsoluteList 组件添加 updateKey 属性**（第160行）
   ```diff
   +      updateKey={updateKey}
   ```

### packages/base/src/tooltip/tooltip.tsx

1. **引入新的工具函数**（第1行）
   ```diff
   -import { usePopup, util } from '@sheinx/hooks';
   +import { getClosestScrollContainer, usePopup, util } from '@sheinx/hooks';
   ```

2. **添加更新状态管理**（第50-53行）
   ```diff
   +  const [updateKey, setUpdateKey] = React.useState(0);
   +  const handleUpdateKey = () => {
   +    setUpdateKey((prev) => (prev + 1) % 2);
   +  };
   ```

3. **bindEvents 函数中添加事件监听**（第61-66行）
   ```diff
   +    window?.addEventListener('resize', handleUpdateKey);
   +    const scrollContainer = getClosestScrollContainer(targetEl);
   +    if (scrollContainer) {
   +      scrollContainer.addEventListener('scroll', handleUpdateKey);
   +    }
   ```

4. **unbindEvents 函数中添加事件移除**（第77-83行）
   ```diff
   +    window?.removeEventListener('resize', handleUpdateKey);
   +    const scrollContainer = getClosestScrollContainer(targetEl);
   +    if (scrollContainer) {
   +      scrollContainer.addEventListener('scroll', handleUpdateKey);
   +    }
   ```
   注意：这里同样存在一个bug，应该是 removeEventListener 而不是 addEventListener

5. **AbsoluteList 组件添加 updateKey 属性**（第132行）
   ```diff
   +        updateKey={updateKey}
   ```

### packages/hooks/src/common/use-position-style/index.ts

**删除 adjust 相关的位置调整逻辑**（第193-199行）
```diff
-        if (adjust) {
-          overLeft = bodyRect.left - (rect.right - context.popUpWidth);
-          if (style.right < 0 && targetRect) {
-            style.left = bodyRect.width - targetRect.width;
-            style.right = 'auto';
-          }
-        }
```

## 变更前后逻辑差异

### 变更前
1. Popover 和 Tooltip 组件在初始渲染时计算位置，之后不会响应窗口大小变化或滚动事件
2. 当窗口 resize 或父容器滚动时，弹出层位置保持不变，导致与触发元素错位
3. use-position-style 中包含了一段 adjust 逻辑，在右对齐时会进行额外的位置调整

### 变更后
1. 引入 `getClosestScrollContainer` 工具函数，用于查找最近的可滚动父容器
2. 添加 `updateKey` 状态，通过改变 key 值强制 AbsoluteList 重新计算位置
3. 监听 window 的 resize 事件和最近滚动容器的 scroll 事件
4. 事件触发时更新 `updateKey`，触发位置重新计算
5. 移除了 use-position-style 中的 adjust 逻辑，简化了位置计算

### 对组件运作逻辑的影响
1. **性能影响**：增加了事件监听器，在窗口调整或滚动时会触发重新渲染和位置计算
2. **内存管理**：需要正确管理事件监听器的注册和注销，避免内存泄漏
3. **位置计算**：通过 updateKey 的变化强制重新计算位置，确保弹出层始终跟随目标元素
4. **bug 风险**：unbindEvents 中错误地使用了 addEventListener 而不是 removeEventListener，可能导致内存泄漏

## 风险使用场景

### 代码执行风险
1. **内存泄漏风险**：unbindEvents 函数中对滚动容器的处理有误，使用了 addEventListener 而不是 removeEventListener，会导致事件监听器无法正确移除
2. **性能风险**：在频繁 resize 或 scroll 的场景下，会触发大量的重新渲染，可能影响性能
3. **事件监听器累积**：如果组件频繁挂载和卸载，错误的事件移除逻辑会导致监听器累积

### 交互体验差异
1. **正面影响**：弹出层能够实时跟随目标元素，提升了用户体验
2. **潜在问题**：
   - 在快速滚动时可能出现弹出层位置闪烁
   - 移除 adjust 逻辑可能影响某些边缘情况下的位置调整
   - updateKey 的循环更新（0和1之间切换）可能在某些情况下不够用

### 需要注意的场景
1. **长列表滚动**：在包含大量 Popover/Tooltip 的长列表中滚动时需要关注性能
2. **嵌套滚动容器**：多层嵌套的滚动容器可能只监听了最近的一层
3. **动态内容**：如果 Popover 内容动态变化导致尺寸改变，可能需要额外处理
4. **边界情况**：移除 adjust 逻辑后，某些靠近视口边缘的弹出层可能表现不同