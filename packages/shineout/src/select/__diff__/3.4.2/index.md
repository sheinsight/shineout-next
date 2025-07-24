# Select 组件 3.4.2 版本 Diff 报告

## 问题描述

修复 `Select` 的 `columns` 只有 1 列情况下列表宽度不自动撑满的问题。当设置 `columns={1}` 时，选项宽度会固定为 160px，而不是占满整个下拉框宽度，导致显示效果不佳，特别是长文本内容被截断。

## 代码变更文件

1. `packages/base/src/select/list-columns-option.tsx`
2. `packages/base/src/select/list-columns-option.type.ts`
3. `packages/base/src/select/list-columns.tsx`
4. `packages/base/src/select/select.tsx`

## 变更代码行

### packages/base/src/select/list-columns-option.tsx - 动态设置选项宽度
```diff
  const {
    data,
    datum,
    size,
    multiple,
+   columns,
    columnWidth = 160,
    renderItem: renderItemProp,
-   closePop,
  } = props;
  
- const style = { width: columnWidth };
+ const style = { width: columns && columns <= 1 ? '100%' : columnWidth };
```

### packages/base/src/select/list-columns.tsx - 传递 columns 属性
```diff
  <ListColumnsOption
    data={item}
    size={size}
    datum={datum}
+   columns={columns}
    multiple={multiple}
    columnWidth={columnWidth}
    renderItem={renderItemProp}
  />
```

### packages/base/src/select/select.tsx - 修复宽度计算逻辑
```diff
  <AbsoluteList
    adjust={adjust}
    focus={open}
-   fixedWidth={!props.columns && (autoAdapt ? 'min' : true)}
+   fixedWidth={(!props.columns || props.columns <= 1) && (autoAdapt ? 'min' : true)}
    absolute={props.absolute}
    zIndex={props.zIndex}
    position={position}
```

### packages/base/src/select/list-columns-option.type.ts - 新增类型定义
```diff
  export interface ListColumnsOptionProps<DataItem, Value> {
    data: DataItem
    datum: ListDatum<DataItem, Value>
    size?: CommonType['size']
    multiple?: boolean
+   columns?: number
    columnWidth?: number
    renderItem?: SelectRenderItem<DataItem>
-   closePop?: () => void
  }
```

## 变更前后逻辑差异

### 变更前
- 设置 `columns={1}` 时，选项宽度固定为 160px
- 弹出层宽度计算只考虑 `columns` 不存在的情况
- 长文本内容会被截断，无法完整显示

### 变更后
- 设置 `columns={1}` 时，选项宽度为 100%，占满整个下拉框
- 弹出层宽度计算同时考虑 `columns` 不存在和等于 1 的情况
- 长文本内容可以完整显示

## 逻辑影响范围

1. **单列布局**：只影响设置 `columns={1}` 的场景
2. **宽度计算**：影响弹出层的宽度自适应逻辑
3. **不受影响**：多列布局（`columns > 1`）、默认布局（未设置 `columns`）

## 风险场景分析

### DOM 结构变更风险

- **无相关风险**：本次变更不涉及 DOM 结构调整

### 行为逻辑变更风险

1. **选项宽度计算逻辑变化**：
   - 变更描述：单列模式下选项宽度从固定 160px 变为 100%
   - 风险场景：依赖固定宽度进行布局计算或样式定制的场景
   - 风险示例：
   ```tsx
   // 风险代码：假设选项宽度固定为 160px
   const calculateTooltipPosition = () => {
     // 之前：基于 160px 计算
     // 现在：宽度可能是任意值
     const optionWidth = 160;
     return optionWidth + 20;
   };
   ```
   - 规避方案：动态获取实际宽度，避免硬编码

### 样式变更风险

1. **单列选项宽度变化**：
   - 变更描述：`columns={1}` 时选项宽度从 160px 变为 100%
   - 风险场景：自定义样式依赖原有固定宽度的场景
   - 风险示例：
   ```css
   /* 风险样式：基于固定宽度的样式覆盖 */
   .so-select[data-columns="1"] .so-select-option {
     /* 之前：基于 160px 设计的样式 */
     padding: 0 10px;
     text-overflow: ellipsis;
   }
   
   /* 可能需要调整的绝对定位元素 */
   .custom-addon {
     left: 140px; /* 基于 160px 计算 */
   }
   ```
   - 规避方案：使用相对单位或百分比，避免固定像素值

## 升级注意事项

### 代码兼容性

**无破坏性变更**

此修复不会影响现有代码的正常运行，只是改善了单列布局的显示效果。

### 行为变化说明

1. **单列布局宽度**
   - **影响场景**：使用 `columns={1}` 的 Select 组件
   - **具体表现**：之前选项宽度固定 160px，现在自动撑满容器宽度
   - **受影响代码示例**：
     ```tsx
     // 之前：选项宽度 160px，长文本被截断
     // 现在：选项宽度 100%，长文本完整显示
     <Select 
       columns={1}
       data={[
         { value: '1', text: '这是一个很长的选项文本内容' },
         { value: '2', text: '另一个长文本选项' }
       ]}
     />
     ```
   - **是否需要调整**：无需调整，显示效果改善