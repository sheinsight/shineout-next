# Pagination 组件 3.2.3 版本 Diff 报告

## 问题描述

本版本包含两个修复：
1. **优化数字按钮点击逻辑**：当分页数不变的时候不触发 `onChange`，避免不必要的回调执行
2. **修复 onChange 参数错误**：修复 `onChange` 回调的第三个参数 `sizeChange` 计算错误的问题

## 代码变更文件

1. `packages/hooks/src/components/use-pagination/use-pagination.tsx`

## 变更代码行

### packages/hooks/src/components/use-pagination/use-pagination.tsx - 优化逻辑
```diff
+ import { usePersistFn } from '../../common/use-persist-fn';

const usePagination = (props: BasePaginationProps) => {
  // ... 其他代码
  
- const handleChange = (current: number, size?: number) => {
-   setCurrent(current);
+ const handleChange = usePersistFn((c: number, size?: number) => {
+   if (c === current && size === undefined) return;
+   setCurrent(c);
    setPageSize(size || pageSizeProp);
    if (onChange) {
-     const sizeChange = pageSize !== size;
-     onChange(current, size || pageSize, sizeChange);
+     const sizeChange = size !== undefined && pageSize !== size;
+     onChange(c, size || pageSize, sizeChange);
    }
- };
+ });
};
```

## 变更前后逻辑差异

### 变更前
1. 点击当前页码也会触发 onChange
2. `sizeChange` 参数计算：`pageSize !== size`，当 size 为 undefined 时错误返回 true
3. handleChange 函数每次渲染都重新创建

### 变更后
1. 增加判断 `if (c === current && size === undefined) return`，避免重复点击
2. 修正计算：`size !== undefined && pageSize !== size`，确保准确性
3. 使用 `usePersistFn` 保持函数引用稳定

## 逻辑影响范围
- 减少不必要的回调触发
- 修正参数计算逻辑
- 提升组件性能

## 升级注意事项

### 代码兼容性
- **低风险变更**：优化逻辑，可能影响依赖旧行为的代码

### 行为变化说明

1. **点击当前页不再触发回调**：
   - 影响场景：点击已选中的页码按钮
   - 具体表现：不会触发 onChange 回调
   - 受影响代码示例：
   ```tsx
   // 之前：点击当前页会触发
   <Pagination
     current={5}
     total={100}
     onChange={(page, size, sizeChange) => {
       console.log('onChange', page); // 点击第5页也会输出
     }}
   />
   ```
   - 是否需要调整：如依赖此行为需要调整

2. **sizeChange 参数修正**：
   - 影响场景：仅切换页码时的 onChange 回调
   - 具体表现：第三个参数正确反映 pageSize 是否变化
   - 受影响代码示例：
   ```tsx
   // 之前：切换页码时 sizeChange 可能为 true
   // 现在：只在真正改变 pageSize 时为 true
   onChange={(page, size, sizeChange) => {
     if (sizeChange) {
       // 现在只在改变每页条数时执行
       reloadData();
     }
   }}
   ```
   - 是否需要调整：依赖 sizeChange 的逻辑会更准确