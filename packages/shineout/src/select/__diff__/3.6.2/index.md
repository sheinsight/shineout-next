# Select 组件 3.6.2 版本 Diff 报告

## 问题描述

修复 `Select` 组件最大高度限制失效的问题。在之前的版本中，`Select` 组件的选择结果区域没有正确应用最大高度限制，导致在多选模式下选择大量选项时，结果区域会无限扩展，影响页面布局。

## 代码变更文件

1. `packages/shineout-style/src/select/select.ts`

## 变更代码行

### packages/shineout-style/src/select/select.ts - 修复最大高度限制

```diff
 const selectStyle: JsStyles<SelectClassType> = {
   resultWrapper: {
     display: 'flex',
     flex: 1,
     minWidth: 0,
+    maxHeight: 78,
     position: 'relative',
     outline: 'none',
-    overflow: 'hidden',
+    overflow: 'auto',
   },
   
   iconWrapper: {
     display: 'flex',
     alignItems: 'center',
+    position: 'sticky',
+    top: 0,
     justifyContent: 'center',
     marginLeft: token.selectIconMarginLeft,
   },
```

## 变更前后逻辑差异

### 变更前
- 选择结果区域没有最大高度限制
- 溢出内容被隐藏（`overflow: hidden`）
- 图标区域随内容滚动

### 变更后
- 选择结果区域最大高度限制为 78px
- 超出高度的内容可以滚动查看（`overflow: auto`）
- 图标区域固定在顶部（`position: sticky`）

## 逻辑影响范围

- 影响多选模式下选择结果的显示高度
- 影响选择结果区域的滚动行为
- 影响操作图标（如清除按钮、下拉箭头）的定位方式
- 不影响单选模式的表现
- 不影响下拉选项列表的高度

## 风险场景分析

### DOM 结构变更风险

无相关风险

### 行为逻辑变更风险

**风险场景**：依赖选择结果区域高度自动扩展的布局
- 如果用户的布局依赖于 Select 组件高度随选项增加而自动扩展，更新后布局可能受影响
- **规避方案**：可以通过自定义样式覆盖 `maxHeight` 属性

**风险场景**：自定义滚动条样式
- 之前没有滚动条，现在可能出现滚动条
- **规避方案**：通过 CSS 自定义滚动条样式

### 样式变更风险

**风险场景**：覆盖了 `.soui-select-result-wrapper` 样式的项目
```css
/* 可能失效的样式 */
.soui-select-result-wrapper {
  overflow: visible !important;
  max-height: none !important;
}
```
**规避方案**：检查并更新自定义样式，确保与新的滚动机制兼容

**风险场景**：依赖图标位置的自定义样式
```css
/* 可能需要调整的样式 */
.soui-select-icon-wrapper {
  position: absolute;
  right: 0;
}
```
**规避方案**：更新样式以适配 `sticky` 定位

## 升级注意事项

### 代码兼容性

**无破坏性变更** - 该版本仅修复样式问题，不影响 API 使用

### 行为变化说明

**1. 多选结果区域高度限制**
- **影响场景**：多选模式下选择大量选项
- **具体表现**：之前无限高度扩展，现在最大高度 78px，超出部分显示滚动条
- **受影响代码示例**：
  ```tsx
  // 之前：选择 10 个选项，高度会扩展到显示所有选项
  // 现在：高度最大 78px，超出部分需要滚动查看
  <Select multiple value={selectedItems} data={largeDataSet} />
  ```
- **是否需要调整**：大多数情况下不需要调整，如需保持原有行为，可通过 style 属性覆盖

**2. 操作图标固定定位**
- **影响场景**：多选模式下内容滚动时
- **具体表现**：之前图标随内容滚动，现在固定在顶部
- **受影响代码示例**：
  ```tsx
  // 之前：清除按钮会随选中项一起滚动
  // 现在：清除按钮始终固定在可见区域顶部
  <Select multiple clearable value={selectedItems} data={data} />
  ```
- **是否需要调整**：不需要调整，这是体验优化