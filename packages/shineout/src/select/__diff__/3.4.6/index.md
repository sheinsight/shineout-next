# Select 组件 3.4.6 版本 Diff 报告

## 问题描述

修复 `Select` 禁用模式下 icon 样式异常的问题。当组件设置 `disabled` 属性并开启 `clearable` 功能后，鼠标悬停时清除图标仍会显示，这与禁用状态的预期行为不符，禁用状态下不应显示任何可交互的元素。

## 代码变更文件

1. `packages/shineout-style/src/select/select.ts`

## 变更代码行

### packages/shineout-style/src/select/select.ts - 修复禁用状态下的清除图标显示
```diff
  '&:hover': {
    ...wrapper['&:hover'],
    cursor: 'pointer',
-   '&$clearable:not($wrapperEmpty)': {
+   '&$clearable:not($wrapperEmpty):not($wrapperDisabled)': {
      '& $clearIcon': {
        display: 'block',
      },
```

## 变更前后逻辑差异

### 变更前
- 禁用状态下，鼠标悬停时清除图标仍会显示
- 选择器只排除了空值状态，未考虑禁用状态
- 用户可能误以为可以在禁用状态下清除值

### 变更后
- 禁用状态下，鼠标悬停时不再显示清除图标
- 选择器同时排除空值状态和禁用状态
- 符合禁用状态不可交互的设计原则

## 逻辑影响范围

1. **禁用状态样式**：只影响设置了 `disabled` 和 `clearable` 的 Select 组件
2. **交互反馈**：影响禁用状态下的视觉反馈
3. **不受影响**：正常状态的 Select、未开启 `clearable` 的组件

## 风险场景分析

### DOM 结构变更风险

无相关风险

### 行为逻辑变更风险

无相关风险

### 样式变更风险

1. **自定义样式覆盖**
   - **风险示例**：如果项目中有自定义 CSS 强制显示禁用状态下的清除图标（例如通过 `!important`），可能与此修复产生冲突
   - **规避方案**：
     - 检查项目中是否有覆盖 Select 禁用状态样式的自定义 CSS
     - 如有必要，调整自定义样式的选择器优先级
     - 示例检查：
       ```css
       /* 检查是否有类似的自定义样式 */
       .select-wrapper[disabled] .clear-icon {
         display: block !important; /* 这种样式需要移除 */
       }
       ```

## 升级注意事项

### 代码兼容性

**无破坏性变更**

此修复仅调整了禁用状态下的样式表现，不影响功能逻辑。

### 行为变化说明

1. **禁用状态下的清除图标**
   - **影响场景**：同时设置 `disabled` 和 `clearable` 的 Select 组件
   - **具体表现**：之前鼠标悬停会显示清除图标，现在不再显示
   - **受影响代码示例**：
     ```tsx
     // 之前：禁用状态下悬停显示清除图标（但点击无效）
     // 现在：禁用状态下悬停不显示清除图标
     <Select 
       disabled
       clearable
       value="选中的值"
       data={options}
     />
     ```
   - **是否需要调整**：无需调整，用户体验优化