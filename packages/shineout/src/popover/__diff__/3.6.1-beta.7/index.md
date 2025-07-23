# Popover 组件 adjust 属性优化 diff 报告

## 问题描述

优化 Popover 的 adjust 属性，支持弹出层位置实时跟随父元素尺寸变化。之前的实现中，当父元素尺寸发生变化时（如动态内容导致宽高改变），Popover 的位置不会自动更新。本次修改通过监听元素的宽高变化，实时调整弹出层位置。

## 代码变更文件

- `packages/hooks/src/common/use-position-style/check-position.ts`

## 变更代码行

### packages/hooks/src/common/use-position-style/check-position.ts

1. **Position 接口扩展**（第5-6行）
   ```diff
    export interface Position {
      top: number;
      left: number;
   +  width?: number;
   +  height?: number;
    }
   ```

2. **滚动容器内的位置计算**（第36-37行）
   ```diff
          newPosition = {
            top: rect.top - scrollContainerRect.top,
            left: rect.left - scrollContainerRect.left,
   +        width: rect.width,
   +        height: rect.height,
          };
   ```

3. **普通位置计算**（第40-44行）
   ```diff
   -      newPosition = { top: rect.top, left: rect.left };
   +      newPosition = {
   +        top: rect.top,
   +        left: rect.left,
   +        width: rect.width,
   +        height: rect.height,
   +      };
   ```

4. **位置变化检测条件**（第48-51行）
   ```diff
        if (
          newPosition.top !== lastPosition.current.top ||
   -      newPosition.left !== lastPosition.current.left
   +      newPosition.left !== lastPosition.current.left ||
   +      newPosition.width !== lastPosition.current.width ||
   +      newPosition.height !== lastPosition.current.height
        ) {
   ```

## 变更前后逻辑差异

### 变更前
1. `Position` 接口只包含 `top` 和 `left` 属性
2. 位置检测只关注元素的位置变化（top 和 left）
3. 当元素尺寸变化但位置不变时，不会触发位置更新

### 变更后
1. `Position` 接口增加了可选的 `width` 和 `height` 属性
2. 位置检测同时关注元素的位置和尺寸变化
3. 当元素的宽度或高度发生变化时，即使位置不变也会触发更新

### 对组件运作逻辑的影响

1. **检测范围扩大**：从只检测位置变化扩展到同时检测尺寸变化
2. **更新频率增加**：元素尺寸变化也会触发 Popover 位置重新计算
3. **响应性增强**：Popover 能够响应更多类型的父元素变化，包括：
   - 动态内容导致的尺寸变化
   - CSS 动画或过渡效果导致的尺寸变化
   - 响应式布局导致的尺寸调整

## 风险使用场景

### 代码执行风险
1. **性能影响**：增加了宽高的检测，可能会增加计算开销，特别是在频繁变化的场景下
2. **更新频率**：如果父元素频繁改变尺寸（如动画），会导致频繁的位置重计算
3. **兼容性**：新增的 width 和 height 属性是可选的，需要确保使用方正确处理

### 交互体验差异
1. **正面影响**：
   - Popover 能够更准确地跟随动态内容
   - 提升了在动态布局中的表现
   - 解决了父元素尺寸变化导致的位置偏移问题

2. **潜在问题**：
   - 在某些场景下可能出现不必要的位置更新
   - 频繁的重计算可能导致视觉上的抖动

### 需要注意的场景
1. **动态内容场景**：
   - 异步加载内容后尺寸变化
   - 折叠/展开面板
   - 动态表单字段

2. **动画场景**：
   - CSS 过渡动画
   - JavaScript 动画库
   - 尺寸渐变效果

3. **响应式布局**：
   - 窗口大小变化
   - 容器尺寸调整
   - 媒体查询触发的布局变化

4. **性能敏感场景**：
   - 大量 Popover 同时存在
   - 高频率的尺寸变化
   - 低性能设备上的使用