# Pagination 组件 3.6.1-beta.2 版本 Diff 报告

## 问题描述

修复 `Pagination` 的 `simple` 模式输入框不展示当前页的问题。该问题自 v3.6.0 版本引入（Regression）。在 simple 模式下，分页器使用一个输入框让用户直接输入页码进行跳转，但输入框不再显示当前页码，影响用户体验。

## 代码变更文件

1. `packages/base/src/pagination/pagination-simple.tsx`

## 变更代码行

### packages/base/src/pagination/pagination-simple.tsx - 传递 current 属性
```diff
<Jumper
  jssStyle={jssStyle}
  disabled={disabled}
  total={total}
  text={text}
  size={size}
+ current={current}
  pageSize={pageSize}
  onChange={onChange}
></Jumper>
```

## 变更前后逻辑差异

### 变更前
- `PaginationSimple` 组件渲染 `Jumper` 时遗漏了 `current` 属性
- 导致输入框无法获知当前页码
- 用户看不到当前所在页面

### 变更后
- 显式传递 `current={current}` 给 `Jumper` 组件
- 输入框正确显示当前页码
- 恢复了 simple 模式的完整功能

## 逻辑影响范围
- 仅影响 simple 模式的显示
- 不影响其他分页模式
- 纯显示层面的修复

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：bug 修复

### 行为变化说明

1. **Simple 模式显示恢复**：
   - 影响场景：使用 `simple` 属性的分页器
   - 具体表现：输入框显示当前页码
   - 受影响代码示例：
   ```tsx
   // 之前：输入框为空，不知道当前页
   // 现在：输入框显示 "5"
   <Pagination
     simple
     current={5}
     total={100}
     onChange={handleChange}
   />
   ```
   - 是否需要调整：不需要，恢复正常显示

2. **交互体验提升**：
   - 用户可以看到当前页码
   - 更容易判断需要跳转的目标页
   - 恢复了 v3.6.0 之前的体验