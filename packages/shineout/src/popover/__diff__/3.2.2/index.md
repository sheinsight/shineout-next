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

## 逻辑影响范围

- 定位方式从 `absolute` 改为 `fixed`，完全脱离文档流
- 修复了 autoFocus 元素导致的页面滚动问题
- 减少了不必要的重排和重绘，提升性能

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：纯缺陷修复，不影响 API
- 某些依赖绝对定位的自定义样式可能需要调整

### 行为变化说明

1. **滚动问题修复**：
   - 影响场景：Popover 内包含 autoFocus 元素（如 Input、Select 等）
   - 具体表现：元素获得焦点时不再导致页面滚动
   - 受影响代码示例：
   ```tsx
   // 之前：打开时页面可能滚动到隐藏的 Popover 位置
   // 现在：页面保持当前位置不变
   <Popover 
     content={
       <div>
         <Input autoFocus placeholder="搜索..." />
       </div>
     }
   >
     <Button>打开搜索</Button>
   </Popover>
   ```
   - 是否需要调整：不需要，体验优化

2. **定位上下文变化**：
   - 影响场景：在 transform 容器或特殊定位容器中使用
   - 具体表现：fixed 定位相对于视口而非定位祖先
   - 受影响代码示例：
   ```tsx
   // 需要注意的场景
   <div style={{ transform: 'scale(0.9)' }}>
     <Popover content="提示内容">
       <Button>触发按钮</Button>
     </Popover>
   </div>
   ```
   - 是否需要调整：极少数特殊布局可能需要调整