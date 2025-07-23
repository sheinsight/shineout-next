# List 组件 3.7.0-beta.35 版本 Diff 报告

## 问题描述

`List` 组件新增 `loadingPosition` 属性，设置为 bottom 后在列表底部显示加载图标。之前加载图标只能显示在列表顶部，在某些场景下（如滚动加载更多）用户体验不佳，现在可以灵活配置加载图标的位置。

## 代码变更文件

1. `packages/base/src/list/list.tsx`
2. `packages/base/src/list/list.type.ts`
3. `packages/shineout-style/src/list/list.ts`

## 变更代码行

### 1. packages/base/src/list/list.type.ts - 新增属性定义
```diff
+ /**
+  * @en Loading icon position
+  * @cn 加载图标位置
+  * @default 'top'
+  */
+ loadingPosition?: 'top' | 'bottom';
```

### 2. packages/base/src/list/list.tsx - 实现加载位置逻辑
```diff
const renderLoading = () => {
  if (!loading) return null;
+ const loadingElement = (
+   <div
+     key='loading'
+     className={classNames(listClasses?.loading, listClasses?.item)}
+   >
+     <Spin jssStyle={jssStyle} size={14} />
+   </div>
+ );
+ 
+ if (props.loadingPosition === 'bottom') {
+   return null;
+ }
  
- return (
-   <div
-     key='loading'
-     className={classNames(listClasses?.loading, listClasses?.item)}
-   >
-     <Spin jssStyle={jssStyle} size={14} />
-   </div>
- );
+ return loadingElement;
};

// 在渲染列表项的地方
const renderList = () => {
  const items = renderItem();
+ const loadingElement = loading && props.loadingPosition === 'bottom' ? (
+   <div
+     key='loading'
+     className={classNames(listClasses?.loading, listClasses?.item)}
+   >
+     <Spin jssStyle={jssStyle} size={14} />
+   </div>
+ ) : null;
  
  return (
    <>
      {renderLoading()}
      {items}
+     {loadingElement}
    </>
  );
};
```

### 3. packages/shineout-style/src/list/list.ts - 样式支持
```diff
loading: {
  textAlign: 'center',
  padding: token.listLoadingPadding,
+ '&.bottom': {
+   borderTop: `1px solid ${token.listBorderColor}`,
+ }
}
```

## 变更前后逻辑差异

### 变更前
- 加载图标固定显示在列表顶部
- 无法配置加载位置
- 滚动加载场景下用户体验不佳

### 变更后
- 通过 `loadingPosition` 属性控制加载图标位置
- 支持 'top'（默认）和 'bottom' 两种位置
- 提升了滚动加载场景的用户体验

## 逻辑影响范围
- 新增功能，不影响现有行为
- 默认值为 'top'，保持向后兼容
- 仅在 loading 为 true 时生效

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：新增可选属性，默认行为不变

### 行为变化说明

1. **加载图标位置可配置**：
   - 影响场景：需要在列表底部显示加载状态的场景
   - 具体表现：设置 `loadingPosition="bottom"` 后加载图标显示在底部
   - 使用示例：
   ```tsx
   // 滚动加载更多场景
   <List
     data={data}
     loading={isLoadingMore}
     loadingPosition="bottom"
     onScroll={handleLoadMore}
   />
   ```
   - 是否需要调整：不需要，这是新增功能

2. **默认行为保持不变**：
   - 影响场景：未设置 loadingPosition 的现有代码
   - 具体表现：加载图标继续显示在顶部
   - 无需任何调整