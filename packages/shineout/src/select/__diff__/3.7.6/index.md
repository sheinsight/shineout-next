# Select 组件 3.7.6 版本 Diff 报告

## 问题描述

修复 `Select` 组件的两个问题。一是开启 `highlight` 后在 `renderItem` 中渲染非单层 DOM 结构时高亮功能失效；二是开启 `onLoadMore` 加载新数据时列表会重置到第一条的回归问题（自 3.7.1 版本引入）。

## 代码变更文件

1. `packages/base/src/common/use-highlight/highlight.tsx`
2. `packages/base/src/select/select.tsx`
3. `packages/base/src/select/list.tsx`
4. `packages/base/src/select/list.type.ts`
5. `packages/base/src/virtual-scroll/virtual-scroll-list.tsx`
6. `packages/base/src/virtual-scroll/virtual-scroll.type.ts`

## 变更代码行

### packages/base/src/common/use-highlight/highlight.tsx - 支持多层 DOM 高亮

```diff
  const transformNode = (node: ReactNode, index: number): ReactNode => {
    if (!isValidElement(node)) return node;
-   // 仅处理第一层的逻辑
-   if (typeof node.props?.children === 'string') {
-     return cloneElement(node, {
-       ...node.props,
-       children: getHighlightText(node.props.children)
-     });
-   }
-   return node;
+   // 递归处理所有层级
+   return cloneElement(node, {
+     ...node.props,
+     key: index,
+     children: getHighlightText(node.props?.children)
+   });
  };
```

### packages/base/src/select/select.tsx - 控制滚动位置保持

```diff
  const listProps = {
    // ... 其他属性
+   keepScrollTop: !!filterText ? false : true,
    // ... 其他属性
  };
```

### packages/base/src/virtual-scroll/virtual-scroll-list.tsx - 实现滚动保持逻辑

```diff
  useLayoutEffect(() => {
    if (keepScrollHeight) return;
+   if (keepScrollTop) return;
    // 数据变化的时候清空掉 preIndex 防止 Index 计算出现错误，需要重新计算 startIndex
    preIndex.current = -1;
    scrollEl?.scrollTo({ top: 0 });
    setTop(0);
    setStartIndex(0);
  }, [data]);
```

### packages/base/src/virtual-scroll/virtual-scroll.type.ts - 新增属性定义

```diff
  export interface VirtualListProps<T = any> {
    // ... 其他属性
+   /**
+    * 数据变化时是否保持滚动位置
+    */
+   keepScrollTop?: boolean;
    // ... 其他属性
  }
```

### packages/base/src/select/list.type.ts - 传递属性定义

```diff
  export interface BaseListProps<DataItem, Value> {
    // ... 其他属性
+   keepScrollTop?: boolean;
    // ... 其他属性
  }
```

## 变更前后逻辑差异

### 变更前
- `highlight` 功能只能处理单层 DOM 结构，嵌套元素无法高亮
- `onLoadMore` 加载新数据时，列表会重置到顶部，影响用户体验
- 3.7.1 版本移除 `keepScrollTop` 属性后引入了滚动位置重置的回归问题

### 变更后
- `highlight` 功能支持递归处理多层嵌套的 DOM 结构
- 加载更多数据时保持当前滚动位置
- 筛选时仍然会重置到顶部（符合预期行为）
- 恢复了 `keepScrollTop` 的内部实现（不对外暴露）

## 逻辑影响范围

- 影响所有使用 `highlight` 属性且 `renderItem` 返回复杂结构的场景
- 影响所有使用 `onLoadMore` 的无限滚动场景
- 不影响普通的选择和筛选功能
- 不影响没有使用这两个特性的组件

## 风险场景分析

### DOM 结构变更风险
无相关风险

### 行为逻辑变更风险
- 之前依赖列表重置行为的代码可能需要调整
- 自定义实现滚动控制的项目可能出现冲突

### 样式变更风险
无相关风险

## 升级注意事项

### 代码兼容性
**无破坏性变更**

### 行为变化说明

1. **高亮功能增强**
   - **影响场景**：使用 `highlight` 且 `renderItem` 返回嵌套结构
   - **具体表现**：嵌套元素中的文本也能被高亮
   - **受影响代码示例**：
   ```tsx
   // 之前：只有外层文本会高亮
   // 现在：所有层级的文本都会高亮
   <Select
     highlight
     filterSingleSelect
     renderItem={(item) => (
       <div>
         <span>{item.name}</span>
         <small>{item.description}</small>
       </div>
     )}
   />
   ```
   - **是否需要调整**：不需要

2. **加载更多体验优化**
   - **影响场景**：使用 `onLoadMore` 的无限滚动列表
   - **具体表现**：加载新数据时保持滚动位置
   - **受影响代码示例**：
   ```tsx
   // 之前：加载数据后列表重置到顶部
   // 现在：保持当前滚动位置
   <Select
     data={data}
     onLoadMore={handleLoadMore}
     virtual
   />
   ```
   - **是否需要调整**：如果依赖了重置行为需要手动处理