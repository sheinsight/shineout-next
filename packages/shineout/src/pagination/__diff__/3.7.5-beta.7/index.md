# Pagination 组件 3.7.5-beta.7 版本 Diff 报告

## 问题描述

修复 `Pagination` 受控模式下外部 value 和内部状态不同步的问题。该问题自 v3.2.6 版本引入（Regression）。在受控模式下，当外部传入的 `current` 属性值发生变化时，组件内部状态未能正确同步更新，导致显示的当前页码与实际 props 传入的值不一致。

## 代码变更文件

1. `packages/hooks/src/components/use-pagination/use-pagination.tsx`

## 变更代码行

### packages/hooks/src/components/use-pagination/use-pagination.tsx - 修复受控模式
```diff
const usePagination = (props: BasePaginationProps) => {
  // ... 其他代码
  
  return {
-   current,
+   // current,
+   current: currentProp !== undefined ? currentProp : current,
    pageSize,
    total,
    onChange: handleChange,
  };
};
```

## 变更前后逻辑差异

### 变更前
- `usePagination` hook 直接返回内部的 `current` 状态值
- 忽略了外部传入的 `currentProp` 值
- 导致受控模式失效

### 变更后
- 判断 `currentProp` 是否存在（`!== undefined`）
- 存在时返回外部值，不存在时使用内部状态
- 恢复了标准的受控/非受控组件行为

## 逻辑影响范围
- 修复了受控模式的状态同步问题
- 非受控模式不受影响
- 恢复了 v3.2.6 之前的正确行为

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：bug 修复，恢复预期行为

### 行为变化说明

1. **受控模式恢复正常**：
   - 影响场景：通过 props 传入 `current` 控制页码
   - 具体表现：组件正确响应外部状态变化
   - 受影响代码示例：
   ```tsx
   // 之前：外部修改 current 后组件不更新
   // 现在：正确同步显示
   const [page, setPage] = useState(1);
   
   <Pagination
     current={page}
     total={100}
     onChange={(current) => setPage(current)}
   />
   
   // 程序化改变页码
   setPage(5); // 现在会正确跳转到第 5 页
   ```
   - 是否需要调整：不需要，恢复了正确行为

2. **非受控模式保持不变**：
   - 不传入 `current` 属性时行为不变
   - 组件继续使用内部状态管理