# Select 组件 3.6.0 版本 Diff 报告

## 问题描述

修复 `Select` 的 `onLoadMore` 在加载第二页的时候重新打开面板滚动位置异常的问题，修复 `reFocus` 属性失效的问题，以及优化大数据量下的树形数据搜索性能和多个 `Select` 同时渲染时的页面初始化性能。

## 代码变更文件

1. `packages/base/src/select/list.tsx`
2. `packages/base/src/select/select.tsx`
3. `packages/base/src/select/result.tsx`
4. `packages/base/src/select/result.type.ts`
5. `packages/base/src/virtual-scroll/scroll.tsx`
6. `packages/base/src/virtual-scroll/virtual-scroll-list.tsx`
7. `packages/base/src/virtual-scroll/virtual-scroll-list.type.ts`
8. `packages/base/src/tree-select/tree-select.tsx`
9. `packages/hooks/src/components/use-treeselect/use-tiled.tsx`
10. `packages/hooks/src/components/use-treeselect/use-tiled.type.ts`
11. `packages/hooks/src/utils/tree.ts`

## 变更代码行

### packages/base/src/select/list.tsx - 添加 keepScrollTop 属性（PR #1000）

```diff
  <VirtualScrollList
    virtualRef={virtualRef}
    data={data}
+   keepScrollTop
    keygen={keygen}
    tag={'ul'}
    groupKey={groupKey}
```

### packages/base/src/virtual-scroll/virtual-scroll-list.tsx - 处理 keepScrollTop 逻辑（PR #1000）

```diff
  useLayoutEffect(() => {
    // 数据变化的时候清空掉 preIndex, 如果之前有缓存的index, setRowHeight 会有问题
+   if (keepScrollTop) return;
    if (keepScrollHeight) return;
    setTop(0);
    setStartIndex(0);
```

### packages/base/src/virtual-scroll/scroll.tsx - 修改 paddingTop 计算（PR #1000）

```diff
- const paddingTop = height === 0 ? 0 : Math.max(0, Math.floor(scrollHeight - height));
+ const paddingTop = useMemo(() => {
+   if (keepScrollTop) return Math.max(0, Math.floor(scrollHeight - height));
+   return height === 0 ? 0 : Math.max(0, Math.floor(scrollHeight - height));
+ }, [scrollHeight, height]);
```

### packages/base/src/select/result.tsx - 修复 reFocus 逻辑（PR #971）

```diff
- setTimeout(() => {
-   inputRef?.current?.select();
- }, 10);
+ if (!reFocus) {
+   setTimeout(() => {
+     inputRef?.current?.select();
+   }, 10);
+ }
```

### packages/base/src/select/result.type.ts - 添加 reFocus 类型定义（PR #971）

```diff
  export interface ResultProps<DataItem, Value> {
    // ... 其他属性
+   reFocus?: boolean;
  }
```

### packages/hooks/src/utils/tree.ts - 优化 mergeFilteredTree 函数（PR #877）

```diff
  export const mergeFilteredTree = (
-   filterDatum: FilterDatum<any>,
+   filterData: any,
    rawDatum: FilterDatum<any>,
    tiledId: KeygenResult[],
  ) => {
-   const filterData = filterDatum.data;
-   const { childrenKey } = filterDatum;
+   const { childrenKey } = rawDatum;
    if (tiledId.length === 0) return filterData;
    const recursion = (node: { [x: string]: any }) => {
-     const nodeKey = filterDatum.getKey(node);
+     const nodeKey = rawDatum.getKey(node);
      if (tiledId.indexOf(nodeKey) >= 0) {
        node[childrenKey] = deepClone(rawDatum.getDataById(nodeKey)[childrenKey] || []);
-     } else {
-       const item = filterDatum.getDataById(nodeKey);
-       if (item && item[childrenKey]) {
-         node[childrenKey] = deepClone(item[childrenKey] || []);
-       }
      }
```

### packages/hooks/src/components/use-treeselect/use-tiled.tsx - 优化性能逻辑（PR #877）

```diff
- const { datum } = useTree({ data, childrenKey, keygen, isControlled: false });
- const { datum: rawDatum } = useTree({ data: rawData, childrenKey, keygen, isControlled: false });
+ const { datum: rawDatum } = useTree({ data: rawData, datum: props.rawDatum, childrenKey, keygen, isControlled: false });

+ if (!filterText || !onAdvancedFilter) {
+   return {
+     data: filterData,
+     onFilter,
+   };
+ }

- const nextData = mergeFilteredTree(datum, rawDatum, tileds);
+ const nextData = mergeFilteredTree(filterData, rawDatum, tileds);
```

### packages/base/src/tree-select/tree-select.tsx - 传递 rawDatum（PR #877）

```diff
  const tileProps = useTiled({
    // ... 其他属性
+   rawDatum: datum,
  });
```

## 变更前后逻辑差异

### 变更前
- `onLoadMore` 加载数据后滚动位置会重置到顶部
- `reFocus` 属性设置后仍会自动选中输入框文本
- 树形数据搜索时会创建多个 datum 对象，性能较差
- 多个 `Select` 同时渲染时初始化缓慢

### 变更后
- `onLoadMore` 加载数据后通过 `keepScrollTop` 保持当前滚动位置
- `reFocus` 为 true 时不会自动选中文本
- 优化了树形数据搜索算法，避免重复创建 datum 对象
- 提升了多个 `Select` 同时渲染的性能

## 逻辑影响范围

- 影响使用 `onLoadMore` 的滚动加载场景
- 影响使用 `reFocus` 属性的聚焦行为
- 大幅提升树形数据搜索的性能
- 改善页面中大量 `Select` 组件的渲染性能

## 风险场景分析

### DOM 结构变更风险
无相关风险

### 行为逻辑变更风险

**风险场景 1**：依赖加载更多后滚动重置的业务逻辑

**风险示例**：
```tsx
// 依赖滚动重置行为的代码
<Select
  onLoadMore={() => {
    loadNextPage();
    // 之前：滚动会重置到顶部
    // 现在：保持当前位置
  }}
/>
```

**规避方案**：如需重置滚动，可手动调用滚动方法

**风险场景 2**：依赖 reFocus 时文本被选中的行为

**风险示例**：
```tsx
// 依赖文本自动选中的代码
<Select
  reFocus
  onFocus={() => {
    // 之前：文本会被选中
    // 现在：文本不会被选中
  }}
/>
```

**规避方案**：手动调用 `inputRef.current.select()`

### 样式变更风险
无相关风险

## 升级注意事项

### 代码兼容性
**无破坏性变更**

### 行为变化说明

**1. 滚动加载位置保持**
- **影响场景**：使用 `onLoadMore` 的分页加载
- **具体表现**：加载新数据后滚动位置不变
- **受影响代码示例**：
  ```tsx
  // 之前：加载后回到顶部
  // 现在：保持当前滚动位置
  <Select
    data={data}
    onLoadMore={handleLoadMore}
    threshold={100}
  />
  ```
- **是否需要调整**：通常不需要，提升了用户体验

**2. reFocus 行为修正**
- **影响场景**：设置 `reFocus` 属性
- **具体表现**：聚焦时不再自动选中文本
- **受影响代码示例**：
  ```tsx
  // 之前：reFocus 无效，仍会选中文本
  // 现在：reFocus 生效，不选中文本
  <Select
    reFocus
    onFilter={handleFilter}
  />
  ```
- **是否需要调整**：如需选中文本需手动处理

**3. 性能优化**
- **影响场景**：大数据量树形结构搜索
- **具体表现**：搜索响应速度显著提升
- **受影响代码示例**：
  ```tsx
  // 之前：搜索较慢
  // 现在：搜索性能优化
  <Select
    treeData={largeTreeData}
    onFilter={(text) => filterTree(text)}
    keygen="id"
  />
  ```
- **是否需要调整**：不需要，纯性能优化