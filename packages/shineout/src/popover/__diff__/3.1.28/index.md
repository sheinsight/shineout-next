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

## 逻辑影响范围

- 确保事件监听器的添加和移除使用相同的参数（捕获阶段）
- 防止了快速删除 DOM 元素时事件监听器的累积
- 提升了长时间运行应用的内存效率

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：底层优化，不影响 API
- 需要确保目标浏览器支持 `addEventListener` 的第三个参数为对象形式

### 行为变化说明

1. **内存泄漏修复**：
   - 影响场景：频繁创建销毁 Popover 或快速点击关闭的场景
   - 具体表现：事件监听器正确清理，不再累积
   - 受影响代码示例：
   ```tsx
   // 之前：快速操作可能导致事件监听器残留
   // 现在：事件监听器总是正确清理
   const items = data.map(item => (
     <Popover 
       key={item.id}
       content="详情"
       onVisibleChange={(visible) => {
         if (!visible) {
           // 立即删除该项
           removeItem(item.id);
         }
       }}
     >
       <Button>查看</Button>
     </Popover>
   ));
   ```
   - 是否需要调整：不需要，性能优化

2. **应用稳定性提升**：
   - 影响场景：单页应用、长时间运行的页面
   - 具体表现：内存使用更稳定，性能不会随时间下降
   - 受影响代码示例：
   ```tsx
   // 长时间运行的应用中大量使用 Popover
   // 现在不会因为事件累积导致性能问题
   ```
   - 是否需要调整：不需要，稳定性提升