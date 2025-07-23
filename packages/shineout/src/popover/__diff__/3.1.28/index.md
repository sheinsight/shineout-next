# Popover 组件全局事件清理修复 diff 报告

## 问题描述

修复 Popover 卸载时注销 document 事件失败的问题。当点击后立即删除 DOM 元素时，会导致 `contains(target)` 判断为 false，从而无法正确移除事件监听器。这可能导致内存泄漏和意外的事件触发。

## 代码变更文件

- `packages/hooks/src/common/use-click-away/index.ts`

## 变更代码行

### packages/hooks/src/common/use-click-away/index.ts

**在 removeEventListener 中添加 capture 选项**（第47-50行）
```diff
       // @ts-ignore
-      document.removeEventListener(event, handleClickAway);
+      document.removeEventListener(event, handleClickAway, {
+        // 解决 点击后立刻删除dom导致获取不到元素; contains(target) 为 false 的问题
+        capture: true,
+      });
```

## 变更前后逻辑差异

### 变更前
- 使用默认的事件监听方式（冒泡阶段）移除事件
- 当 DOM 元素被快速删除时，事件可能无法正确移除
- 可能导致事件监听器累积

### 变更后
- 使用捕获阶段（`capture: true`）移除事件监听器
- 确保事件监听器能够正确移除，即使 DOM 元素已被删除
- 避免了内存泄漏

### 对组件运作逻辑的影响

1. **事件清理机制**：
   - 确保了事件监听器的添加和移除使用相同的参数
   - 捕获阶段的事件处理更早触发，不受 DOM 变化影响

2. **内存管理**：
   - 防止了事件监听器的累积
   - 提升了应用的内存效率

3. **兼容性**：
   - 注释中的 `@ts-ignore` 表明这里可能有类型定义的兼容性问题
   - 但功能上是安全的

## 风险使用场景

### 代码执行风险
1. **事件阶段不匹配**：如果添加事件时没有使用 `capture: true`，但移除时使用了，可能导致事件无法正确移除
2. **浏览器兼容性**：需要确保目标浏览器支持 `addEventListener` 的第三个参数为对象形式

### 交互体验差异

1. **修复的问题**：
   - 快速点击并关闭 Popover 不再导致事件监听器残留
   - 动态删除元素的场景更加稳定
   - 长时间运行的应用不会因为事件累积而性能下降

2. **无用户可感知的变化**：
   - 这是一个底层修复，用户交互体验不会有明显变化
   - 主要是提升了应用的稳定性和性能

### 需要注意的场景

1. **快速交互场景**：
   - 频繁打开关闭 Popover
   - 点击后立即切换页面或组件
   - 动态渲染的列表项中的 Popover

2. **长时间运行的应用**：
   - 单页应用（SPA）
   - 实时数据更新的界面
   - 包含大量 Popover 的复杂表单

3. **特殊的 DOM 操作**：
   - 使用 Portal 渲染的 Popover
   - 动态创建和销毁的组件
   - 第三方库的 DOM 操作

4. **性能监控**：
   - 需要监控事件监听器的数量
   - 检查内存使用情况
   - 验证事件是否正确清理