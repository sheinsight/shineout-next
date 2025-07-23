# Pagination 组件 3.4.4 版本 Diff 报告

## 问题描述

`Pagination` 新增 `select` 属性支持配置弹窗部分信息。在某些特定的布局场景下，分页器中的页码大小选择器（Select 组件）的弹出层可能需要特殊的定位配置。通过新增的 `select` 属性，用户可以灵活配置弹出层的位置、层级等选项。

## 代码变更文件

1. `packages/base/src/pagination/pagination.type.ts`
2. `packages/base/src/pagination/pagination-size-list.tsx`
3. `packages/base/src/pagination/pagination-size-list.type.ts`

## 变更代码行

### 1. packages/base/src/pagination/pagination.type.ts - 新增类型定义
```diff
+ export interface SelectProps extends Pick<AbsoluteListProps, 'absolute' | 'zIndex'> {
+   /**
+    * @en Set Position can control the different position of DatePicker
+    * @cn 弹出框位置
+    * @default auto
+    */
+   position?: 'auto' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
+ }

export interface PaginationProps {
  // ... 其他属性
+ /**
+  * @en Configuration of Select component in Pagination, currently supports absolute, position and zIndex, same as Select
+  * @cn 分页器有关 Select 组件的配置，目前支持 absolute、position 和 zIndex，类型同 Select
+  */
+ select?: SelectProps;
}
```

### 2. packages/base/src/pagination/pagination-size-list.tsx - 应用配置
```diff
const PaginationSizeList = (props: PaginationSizeListProps) => {
  const {
    // ... 其他解构
+   select,
    pageSize,
    onChange,
  } = props;
  
+ const { absolute, position, zIndex } = select || {};

  return (
    <div className={rootClasses}>
      <Select
        jssStyle={jssStyle}
        disabled={disabled}
-       absolute
+       zIndex={zIndex || undefined}
+       absolute={absolute || true}
+       position={position || undefined}
        autoAdapt
        keygen
        size={size}
        // ... 其他属性
      />
    </div>
  );
};
```

### 3. packages/base/src/pagination/pagination-size-list.type.ts - 传递属性
```diff
export interface PaginationSizeListProps
- extends Pick<PaginationProps, 'pageSizeList' | 'size' | 'disabled'> {
+ extends Pick<PaginationProps, 'pageSizeList' | 'size' | 'disabled' | 'select'> {
  jssStyle?: PaginationJssStyle;
  // ... 其他属性
}
```

## 变更前后逻辑差异

### 变更前
- Select 组件固定使用 `absolute={true}`
- 无法自定义弹出层的位置和层级
- 在特殊布局中可能出现遮挡问题

### 变更后
- 通过 `select` 属性传递配置
- 支持配置 `absolute`、`position`、`zIndex`
- 保持向后兼容，默认行为不变

## 逻辑影响范围
- 新增可选配置项
- 不影响默认行为
- 提供更灵活的布局控制

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：新增可选属性

### 行为变化说明

1. **新增弹出层配置能力**：
   - 影响场景：需要调整分页器下拉框显示的特殊布局
   - 具体表现：可以控制弹出方向和层级
   - 使用示例：
   ```tsx
   // 在 Modal 中使用，调整层级
   <Pagination
     total={1000}
     select={{
       zIndex: 2000,
       position: 'top-left'
     }}
   />
   
   // 在页面底部使用，向上弹出
   <Pagination
     total={500}
     select={{
       position: 'top-right'
     }}
   />
   ```
   - 是否需要调整：不需要，可选功能

2. **默认行为保持不变**：
   - 不配置 `select` 时行为与之前一致
   - `absolute` 默认为 true
   - 完全向后兼容