# List 组件 3.1.0 版本 Diff 报告

## 问题描述

修复 `List` 在缩放场景下滚动加载可能失效的问题。当浏览器页面缩放（如 zoom 90%、110% 等）时，滚动到底部的判断计算存在精度误差，导致滚动加载功能无法正确触发。

## 代码变更文件

1. `packages/base/src/list/list.tsx`
2. `packages/base/src/virtual-scroll/virtual-scroll-list.tsx`

## 变更代码行

### 1. packages/base/src/list/list.tsx - 修复滚动判断和高度设置
```diff
// 调整固定高度列表项的样式设置位置
const listStyle: React.CSSProperties = {
  width: `${100 / colNum}%`,
  ...props.itemStyle,
};
- if (props.fixed) {
-   listStyle.height = lineHeight;
- }

// 将高度设置移至行容器
const renderColumn = usePersistFn((columnData: DataItem[], columnIndex: number) => {
  return (
-   <div key={columnIndex} className={listClasses?.row}>
+   <div
+     key={columnIndex}
+     className={listClasses?.row}
+     style={{ height: props.fixed ? lineHeight : 'auto' }}
+   >
      {columnData.map((item, rowIndex) => {
        const index = rowIndex + columnIndex * colNum;
        return renderItem(item, index);
      })}
    </div>
  );
});

// 修复滚动到底部的判断逻辑
const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  if (typeof scrollLoading !== 'function') return;
  const scrollTop = e.currentTarget.scrollTop;
  if (!scrollTop) return;
- const isEnd = scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight;
+ const isEnd = e.currentTarget.scrollHeight - scrollTop - e.currentTarget.clientHeight < 1;
  if (isEnd) {
    scrollLoading();
  }
};
```

### 2. packages/base/src/virtual-scroll/virtual-scroll-list.tsx - 确保 onScroll 回调执行
```diff
const handleScroll = (info: {
  scrollTop: number;
  // ... 其他属性
}) => {
  const current = Math.floor(info.scrollTop / lineHeight);
  const top = info.scrollTop - current * lineHeight;
+ props.onScroll?.(info);
  setTop(top);
  setCurrentIndex(current);
- 
};
```

## 变更前后逻辑差异

### 变更前
1. 使用 `scrollTop + clientHeight >= scrollHeight` 判断是否滚动到底部
2. 在缩放场景下，浮点数计算可能导致永远无法满足条件
3. 固定高度设置在列表项上，可能影响布局计算
4. 虚拟滚动的 onScroll 回调可能不触发

### 变更后
1. 使用 `scrollHeight - scrollTop - clientHeight < 1` 的容差判断
2. 允许 1 像素的误差范围，解决缩放导致的精度问题
3. 高度设置移至行容器，优化布局结构
4. 确保虚拟滚动的 onScroll 回调正确触发

## 逻辑影响范围
- 修复了页面缩放时滚动加载失效的问题
- 优化了固定高度列表的布局结构
- 不影响正常（100%）缩放下的功能

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：纯缺陷修复，API 不变

### 行为变化说明

1. **缩放场景下滚动加载恢复正常**：
   - 影响场景：浏览器缩放不是 100% 时使用滚动加载
   - 具体表现：滚动到底部能正确触发加载回调
   - 受影响代码示例：
   ```tsx
   // 之前：缩放时可能无法触发
   // 现在：正常触发
   <List
     data={data}
     scrollLoading={() => {
       console.log('加载更多');
       loadMoreData();
     }}
   />
   ```
   - 是否需要调整：不需要，功能恢复正常

2. **固定高度列表布局优化**：
   - 影响场景：使用 fixed 属性的列表
   - 具体表现：高度计算更准确
   - DOM 结构细微变化但不影响视觉效果
   - 是否需要调整：不需要