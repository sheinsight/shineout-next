# Select 组件 3.6.4 版本 Diff 报告

## 问题描述

修复 `Select` 组件在搜索场景下的两个问题。第一，搜索内容后选项列表滚动位置不正确，导致部分选项被遮挡；第二，开启过滤功能后，打开面板快速再次聚焦时可能意外清空输入框文本内容，影响用户体验。

## 代码变更文件

1. `packages/base/src/select/list.tsx`
2. `packages/base/src/select/select.tsx`
3. `packages/base/src/select/select.type.ts`
4. `packages/base/src/select/result.tsx`

## 变更代码行

### packages/base/src/select/list.tsx - 支持动态控制滚动位置

```diff
 const List = <DataItem, Value>(props: BaseListProps<DataItem, Value>) => {
   const {
     controlType,
     hideCreateOption,
     optionListRef,
+    keepScrollTop,
     isAnimationFinish,
     renderItem: renderItemProp = (d) => d as React.ReactNode,
     closePop,
   
   <VirtualScrollList
     virtualRef={virtualRef}
     data={data}
-    keepScrollTop
+    keepScrollTop={keepScrollTop}
     keygen={keygen}
     tag={'ul'}
     groupKey={groupKey}
```

### packages/base/src/select/select.tsx - 根据搜索状态控制滚动行为

```diff
 const listProps: BaseListProps<DataItem, Value> = {
   renderItem,
   controlType,
   onLoadMore,
+  keepScrollTop: !!filterText ? false : true,
   isAnimationFinish,
   threshold,
   onControlTypeChange: setControlType,
```

### packages/base/src/select/result.tsx - 优化失焦清空时机

```diff
 props.setInputText('');
 setTimeout(() => {
   onFilter?.('', 'blur');
-}, 400);
+}, 200);
```

## 变更前后逻辑差异

### 变更前
- 搜索过滤后，列表始终保持顶部滚动位置
- 失焦时延迟 400ms 清空搜索内容
- 快速切换焦点可能导致输入内容意外清空

### 变更后
- 搜索过滤时不保持顶部位置，允许列表自动定位到匹配项
- 失焦时延迟缩短至 200ms
- 减少快速切换焦点时的输入内容丢失问题

## 逻辑影响范围

- 影响搜索过滤时的列表滚动行为
- 影响失焦时的输入框清空时机
- 不影响静态列表的滚动位置
- 不影响选项的选择逻辑

## 风险场景分析

### DOM 结构变更风险

无相关风险

### 行为逻辑变更风险

**风险场景**：依赖搜索后列表始终在顶部的逻辑
- 之前搜索后列表会重置到顶部，现在会保持或调整到合适位置
- **规避方案**：如需保持原有行为，可通过监听搜索事件手动控制滚动

**风险场景**：依赖 400ms 延迟的清空逻辑
- 某些异步操作可能依赖原有的 400ms 时间窗口
- **规避方案**：调整相关异步操作的时序

### 样式变更风险

无相关风险

## 升级注意事项

### 代码兼容性

**无破坏性变更** - 该版本仅优化内部逻辑，不影响 API 使用

### 行为变化说明

**1. 搜索时列表滚动位置**
- **影响场景**：使用搜索过滤功能
- **具体表现**：之前搜索后列表始终回到顶部，现在会智能定位到匹配项
- **受影响代码示例**：
  ```tsx
  // 之前：搜索 "item" 后，列表滚动到顶部
  // 现在：搜索 "item" 后，列表保持或调整到显示匹配项的位置
  <Select data={data} onFilter={(text) => filterData(text)} />
  ```
- **是否需要调整**：通常不需要，这是体验优化

**2. 快速聚焦切换行为**
- **影响场景**：快速点击或 Tab 切换焦点
- **具体表现**：之前可能丢失输入内容，现在保持更稳定
- **受影响代码示例**：
  ```tsx
  // 之前：快速切换焦点可能清空正在输入的内容
  // 现在：200ms 内的快速切换不会清空输入内容
  <Select onFilter={(text) => console.log(text)} />
  ```
- **是否需要调整**：不需要调整，这是稳定性提升