# Popover 组件 autoFocus 滚动修复 diff 报告

## 问题描述

修复 Popover 中元素 `autoFocus` 会导致页面滚动的问题。当 Popover 内部有设置 `autoFocus` 的元素（如 Input、Button 等）时，元素获得焦点会导致页面意外滚动，影响用户体验。

## 代码变更文件

- `packages/hooks/src/common/use-position-style/index.ts`

## 变更代码行

### packages/hooks/src/common/use-position-style/index.ts

**修改隐藏样式的定位方式**（第53行）
```diff
 const hideStyle: React.CSSProperties = {
   pointerEvents: 'none',
-  position: 'absolute',
+  position: 'fixed',
   zIndex: -1000,
   opacity: 0,
 };
```

## 变更前后逻辑差异

### 变更前
- `hideStyle` 使用 `position: 'absolute'` 定位
- 当 Popover 隐藏时，其内容仍然占据文档流中的空间
- 内部元素获得焦点时，浏览器会尝试滚动到该元素位置

### 变更后
- `hideStyle` 改为使用 `position: 'fixed'` 定位
- 隐藏的 Popover 完全脱离文档流
- 避免了 autoFocus 触发的滚动行为

### 对组件运作逻辑的影响

1. **定位方式改变**：
   - `absolute` 定位相对于最近的定位祖先元素
   - `fixed` 定位相对于视口，完全脱离文档流

2. **滚动行为修复**：
   - 隐藏状态下的元素不再影响页面布局
   - autoFocus 不会导致页面滚动到隐藏元素位置

3. **性能优化**：
   - 减少了不必要的重排和重绘
   - 避免了滚动导致的性能开销

## 风险使用场景

### 代码执行风险
1. **定位上下文变化**：从 `absolute` 改为 `fixed` 可能影响某些特殊布局
2. **z-index 层级**：在某些复杂的层级结构中可能需要调整
3. **transform 容器**：父元素有 transform 属性时，fixed 定位的表现可能不同

### 交互体验差异

1. **修复的问题**：
   - 消除了 autoFocus 导致的意外滚动
   - 提升了含有自动聚焦元素的 Popover 的用户体验
   - 避免了页面跳动

2. **潜在影响**：
   - 测试快照需要更新（如 TreeSelect 组件的快照）
   - 某些依赖绝对定位的自定义样式可能需要调整

### 需要注意的场景

1. **自动聚焦场景**：
   - Popover 内的搜索框
   - 确认对话框的输入框
   - 表单验证后的焦点定位

2. **特殊容器**：
   - iframe 中的 Popover
   - transform 或 perspective 容器
   - overflow: hidden 的容器

3. **性能敏感场景**：
   - 大量 Popover 同时存在
   - 频繁切换显示状态
   - 移动端设备

4. **兼容性考虑**：
   - 旧版浏览器的 fixed 定位支持
   - 移动端的 fixed 定位表现
   - 打印时的样式处理