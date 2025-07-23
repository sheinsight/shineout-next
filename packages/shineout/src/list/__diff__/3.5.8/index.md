# List 组件 3.5.8 版本 Diff 报告

## 问题描述

修复 `List` 设置 `size` 属性后选择行的 `Checkbox` 不跟随尺寸的问题。当 List 组件设置了 size 属性（如 'small'、'large'）时，列表项中的复选框尺寸没有相应调整，导致视觉不一致。

## 代码变更文件

1. `packages/base/src/list/list.tsx`

## 变更代码行

### packages/base/src/list/list.tsx - 传递 size 属性给 Checkbox
```diff
<Checkbox
  jssStyle={props.jssStyle}
  checked={datum.check(item)}
+ size={props.size}
  disabled={datum.disabledCheck(item)}
  onChange={(_value, checked) => {
    if (checked) {
```

## 变更前后逻辑差异

### 变更前
- List 组件渲染的 Checkbox 没有接收 size 属性
- Checkbox 始终使用默认尺寸
- 当 List 设置不同尺寸时，复选框大小与列表项不匹配

### 变更后
- 将 List 的 size 属性传递给内部的 Checkbox 组件
- Checkbox 尺寸与 List 的尺寸保持一致
- 视觉效果更加协调统一

## 逻辑影响范围
- 仅影响带有选择功能的 List 组件
- 不影响没有设置 size 属性的 List
- 视觉层面的修复，不影响功能逻辑

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：纯粹的缺陷修复，不改变 API

### 行为变化说明

1. **Checkbox 尺寸自动适配**：
   - 影响场景：使用 List 的选择功能且设置了 size 属性
   - 具体表现：复选框尺寸跟随 List 的 size 设置
   - 受影响代码示例：
   ```tsx
   // 之前：复选框保持默认尺寸
   // 现在：复选框变为小尺寸
   <List
     data={data}
     size="small"
     value={selectedItems}
     onChange={setSelectedItems}
   />
   ```
   - 是否需要调整：不需要，这是视觉一致性修复

2. **不影响其他场景**：
   - 无选择功能的 List 不受影响
   - 未设置 size 的 List 保持原样
   - 功能行为完全一致