# Popover 组件宽度和位置修复 diff 报告

## 问题描述

修复了两个相关问题：
1. PR #736：修复 `Popover.Confirm` 的弹出容器的宽度在 Table 中有可能显示较窄的问题
2. PR #741：修复 `Popover` 在横滚的 Table 中有可能弹出位置不准确的问题

这两个问题都与 Popover 在 Table 等特殊容器中的表现有关。

## 代码变更文件

- `packages/hooks/src/utils/position.ts` (PR #736)
- `packages/hooks/src/common/use-position-style/index.ts` (PR #741)

## 变更代码行

### PR #736 - packages/hooks/src/utils/position.ts

**注释掉基于弹出内容宽度的位置调整逻辑**（第78-93行）
```diff
+    // TODO: 暂时移除，另考虑方案
     // 如果渲染了弹出内容，则根据弹出内容宽度计算是否自动调整位置
-    if (popupRect) {
-      if (popupRect?.width / 2 > rect.left) {
-        position += '-left';
-      }
-      if (popupRect?.width / 2 > windowWidth - rect.right) {
-        position += '-right';
-      }
-    } else {
-      // 兜底计算
-      if (horizontalPoint > windowWidth * 0.6) {
-        position += '-right';
-      } else if (horizontalPoint < windowWidth * 0.4) {
-        position += '-left';
-      }
+    // if (popupRect && popupRect?.width) {
+    //   if (popupRect?.width / 2 > rect.left) {
+    //     position += '-left';
+    //   }
+    //   if (popupRect?.width / 2 > windowWidth - rect.right) {
+    //     position += '-right';
+    //   }
+    // } else {
+    // 兜底计算
+    if (horizontalPoint > windowWidth * 0.6) {
+      position += '-right';
+    } else if (horizontalPoint < windowWidth * 0.4) {
+      position += '-left';
     }
+    // }
```

### PR #741 - packages/hooks/src/common/use-position-style/index.ts

**修复滚动容器的获取逻辑**（第158行）
```diff
-    const closestScrollContainer = getClosestScrollContainer(parentElRef.current);
+    const closestScrollContainer = absolute ? null : getClosestScrollContainer(parentElRef.current);
```

## 变更前后逻辑差异

### PR #736 变更分析

#### 变更前
1. 当 `popupRect` 存在时，根据弹出内容宽度动态调整位置：
   - 如果弹出内容宽度的一半大于左边距，添加 `-left` 后缀
   - 如果弹出内容宽度的一半大于右边距，添加 `-right` 后缀
2. 当 `popupRect` 不存在时，使用兜底计算基于水平位置百分比

#### 变更后
1. 移除了基于弹出内容宽度的动态调整
2. 统一使用基于水平位置百分比的计算方式
3. 简化了位置计算逻辑，避免了宽度计算导致的问题

### PR #741 变更分析

#### 变更前
- 总是获取最近的滚动容器，不管是否使用绝对定位

#### 变更后
- 当 `absolute` 为 `true` 时，不获取滚动容器（设为 `null`）
- 只有非绝对定位时才获取滚动容器

## 风险使用场景

### 代码执行风险

1. **PR #736 的影响**：
   - 移除了自适应宽度调整，可能导致某些场景下位置不够优化
   - TODO 注释表明这是临时方案，后续可能有其他调整

2. **PR #741 的影响**：
   - 绝对定位模式下不再考虑滚动容器，可能影响某些特殊布局
   - 在嵌套滚动容器中使用绝对定位可能有不同表现

### 交互体验差异

1. **宽度相关（PR #736）**：
   - Popover.Confirm 在 Table 中不再因为内容宽度计算错误而显示过窄
   - 位置计算更加稳定，但可能不如之前智能

2. **滚动相关（PR #741）**：
   - 在横向滚动的 Table 中，Popover 位置更加准确
   - 绝对定位模式下不受滚动容器影响

### 需要注意的场景

1. **Table 相关场景**：
   - 固定列的 Table
   - 横向滚动的 Table
   - 嵌套 Table
   - 虚拟滚动 Table

2. **特殊容器场景**：
   - overflow: hidden 的容器
   - transform 属性的容器
   - position: fixed 的容器

3. **边界情况**：
   - 视口边缘的 Popover
   - 动态内容导致宽度变化
   - 响应式布局下的表现

4. **性能考虑**：
   - 简化的计算逻辑可能提升性能
   - 但失去了一些自适应能力