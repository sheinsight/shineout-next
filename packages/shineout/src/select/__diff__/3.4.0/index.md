# Select 组件 3.4.0 版本 Diff 报告

## 问题描述

`Select` 组件支持动态虚拟列表行高。之前虚拟列表要求所有选项高度一致，现在支持每个选项根据内容自适应高度，提升了复杂内容展示的灵活性。

`Select` 组件新增 `onLoadMore` 属性，支持滚动加载。当选项数据量大时，可以通过滚动到底部触发加载更多数据，实现分页加载功能。同时新增 `threshold` 属性控制触发加载的阈值，以及 `trigger` 属性支持更改展开下拉面板的触发方式。

优化 `Select` 组件在同时使用 `emptyText` 和 `renderOptionList` 时的渲染顺序。之前设置了 `renderOptionList` 后，空数据时仍会显示默认的空提示，现在可以通过设置 `emptyText={false}` 让 `renderOptionList` 在空数据时也能生效。

## 代码变更文件

1. `packages/base/src/select/select.tsx`
2. `packages/base/src/select/select.type.ts`
3. `packages/base/src/select/list.tsx`
4. `packages/base/src/select/list-option.tsx`
5. `packages/base/src/virtual-scroll/virtual-scroll-list.tsx`
6. `packages/base/src/virtual-scroll/scroll.tsx`
7. `packages/shineout-style/src/select/select.ts`

## 变更代码行

### packages/base/src/select/select.type.ts - 新增属性定义
```diff
- lineHeight?: number;
+ lineHeight?: number | 'auto';

+ onLoadMore?: () => void;
+ threshold?: number;
+ trigger?: 'click' | 'hover';
```

### packages/base/src/select/select.tsx - 优化空数据渲染逻辑
```diff
- if (isEmpty) return renderEmpty();
+ if (isEmpty && props.emptyText !== false) return renderEmpty();
```

### packages/base/src/select/list.tsx - 支持动态高度和滚动加载
```diff
+ const dynamicVirtual = useMemo(() => {
+   return lineHeight === 'auto';
+ }, [lineHeight]);

  <VirtualList
+   dynamicVirtual={dynamicVirtual}
+   onLoadMore={onLoadMore}
+   threshold={threshold}
    lineHeight={lineHeight === 'auto' ? undefined : lineHeight}
  />
```

### packages/base/src/virtual-scroll/scroll.tsx - 新增滚动加载逻辑
```diff
+ const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
+   const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
+   const threshold = props.threshold || 1;
+   
+   if (scrollTop + clientHeight >= scrollHeight * threshold && props.onLoadMore) {
+     props.onLoadMore();
+   }
+ };
```

### packages/base/src/select/select.tsx - 支持触发方式
```diff
  <Button
    {...getPopupProps()}
+   trigger={trigger}
  >
```

## 变更前后逻辑差异

### 变更前
- 虚拟列表只支持固定行高，所有选项高度必须一致
- 不支持滚动加载，大数据量时需要一次性加载全部数据
- 只支持点击触发下拉面板
- 设置 `renderOptionList` 后，空数据时仍显示默认空提示

### 变更后
- 支持动态行高，选项可以根据内容自适应高度
- 支持滚动加载，可以分批加载数据
- 支持点击和悬停两种触发方式
- 可以通过 `emptyText={false}` 让 `renderOptionList` 在空数据时生效

## 逻辑影响范围

1. **虚拟列表渲染**：影响使用虚拟滚动的大数据量场景
2. **滚动加载**：新增功能，需要主动配置才会生效
3. **触发方式**：新增功能，默认保持点击触发
4. **空数据渲染**：影响同时使用 `emptyText` 和 `renderOptionList` 的场景
5. **不受影响**：小数据量的普通 Select、未使用新增属性的场景

## 升级注意事项

### 代码兼容性

**无破坏性变更**

所有变更都是新增功能和优化，保持向后兼容。

### 行为变化说明

1. **动态虚拟列表行高**
   - **影响场景**：大数据量且选项内容高度不一致的场景
   - **具体表现**：设置 `lineHeight="auto"` 后，每个选项根据内容自适应高度
   - **受影响代码示例**：
     ```tsx
     // 之前：必须设置固定行高
     // 现在：支持自适应高度
     <Select 
       data={largeData}
       lineHeight="auto"
       renderItem={(d) => <div style={{height: d.height}}>{d.content}</div>}
     />
     ```
   - **是否需要调整**：可选功能，按需使用

2. **滚动加载功能**
   - **影响场景**：需要分页加载大量数据的场景
   - **具体表现**：滚动到底部时触发 `onLoadMore` 回调
   - **受影响代码示例**：
     ```tsx
     // 之前：一次性加载全部数据
     // 现在：支持分批加载
     <Select 
       data={currentData}
       onLoadMore={() => loadMoreData()}
       threshold={0.8}
     />
     ```
   - **是否需要调整**：新功能，按需使用

3. **触发方式**
   - **影响场景**：需要悬停触发的特殊交互场景
   - **具体表现**：支持设置 `trigger="hover"` 实现悬停触发
   - **受影响代码示例**：
     ```tsx
     // 之前：只支持点击触发
     // 现在：支持悬停触发
     <Select trigger="hover" />
     ```
   - **是否需要调整**：默认保持点击触发，无需调整

4. **空数据时的 renderOptionList**
   - **影响场景**：需要自定义空数据展示的场景
   - **具体表现**：设置 `emptyText={false}` 后，空数据时执行 `renderOptionList`
   - **受影响代码示例**：
     ```tsx
     // 之前：空数据时总是显示默认空提示
     // 现在：可以自定义空数据展示
     <Select 
       data={[]}
       emptyText={false}
       renderOptionList={() => <CustomEmptyView />}
     />
     ```
   - **是否需要调整**：默认行为不变，按需使用新功能