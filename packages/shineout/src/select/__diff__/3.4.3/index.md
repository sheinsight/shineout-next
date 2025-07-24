# Select 组件 3.4.3 版本 Diff 报告

## 问题描述

修复 `Select` 开启 `absolute` 和 `multiple` 之后，下拉框较长选项的文字与勾选图标重叠的问题。在多选模式下，选项文字过长时会与右侧的勾选图标发生重叠，影响视觉效果和用户体验。

## 代码变更文件

1. `packages/base/src/select/list.tsx`
2. `packages/base/src/select/select.type.ts`
3. `packages/shineout-style/src/select/select.ts`

## 变更代码行

### packages/base/src/select/list.tsx - 添加多选列表样式类
```diff
  const listClass = classnames(
    styles.list,
    props.className,
    {
      [styles.controlMouse]: controlType === 'mouse',
      [styles.controlKeyboard]: controlType === 'keyboard',
      [styles.dynamicList]: dynamicVirtual,
+     [styles.multipleList]: multiple,
    }
  );
```

### packages/base/src/select/select.type.ts - 新增样式类型定义
```diff
  export type SelectClasses = {
    arrowIcon: string;
    ellipsis: string;
    multiple: string;
+   multipleList: string;
    dynamicList: string;
    loading: string;
    checkedIcon: string;
```

### packages/shineout-style/src/select/select.ts - 调整样式应用范围
```diff
  multiple: {
-   '& $optionInner': {
-     paddingRight: token.selectOptionInnerPaddingRight,
-   },
    '& $compressedWrapper': {
      flexWrap: 'nowrap',
    },
  },
  
+ multipleList: {
+   '& $optionInner': {
+     paddingRight: token.selectOptionInnerPaddingRight,
+   },
+ },
```

## 变更前后逻辑差异

### 变更前
- 多选模式的右内边距样式应用在结果框（result）上
- 下拉列表中的选项没有足够的右内边距
- 长文本选项会与勾选图标重叠

### 变更后
- 右内边距样式移至下拉列表（list）的多选模式中
- 确保下拉列表中的选项有足够空间显示勾选图标
- 长文本选项不再与勾选图标重叠

## 逻辑影响范围

1. **多选下拉列表**：只影响多选模式下的下拉列表选项显示
2. **选项内边距**：调整选项右侧内边距，为勾选图标预留空间
3. **不受影响**：单选模式、结果框显示、其他组件样式

## 升级注意事项

### 代码兼容性

**无破坏性变更**

此修复只是调整了样式的应用位置，不会影响组件的功能和 API。

### 行为变化说明

1. **多选选项显示优化**
   - **影响场景**：多选模式下有长文本选项的 Select 组件
   - **具体表现**：之前长文本与勾选图标重叠，现在正确分离显示
   - **受影响代码示例**：
     ```tsx
     // 之前：长文本选项与勾选图标重叠
     // 现在：长文本选项与勾选图标正确分离
     <Select 
       multiple
       absolute
       data={[
         { value: '1', text: '这是一个非常长的选项文本，可能会与勾选图标重叠' },
         { value: '2', text: '另一个很长的选项文本内容' }
       ]}
     />
     ```
   - **是否需要调整**：无需调整，显示效果改善