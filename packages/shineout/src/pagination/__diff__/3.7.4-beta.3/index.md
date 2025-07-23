# Pagination 组件 3.7.4-beta.3 版本 Diff 报告

## 问题描述

修复 `Pagination` 的分页器弹出层在滚动容器中的极限边界场景下可能出现的不可见问题。当 Pagination 组件的分页大小选择器（pageSize dropdown）在滚动容器内使用时，在某些极限边界情况下，弹出层可能会被错误地隐藏或显示在不可见区域。

## 代码变更文件

1. `packages/hooks/src/common/use-position-style/index.ts`

## 变更代码行

### packages/hooks/src/common/use-position-style/index.ts - 修复滚动容器边界判断
```diff
const rect = context.parentRect;

const needCheck = !show || !shallowEqual(context.prevParentPosition, parentElNewPosition)
+ const scrollTop = scrollElRef?.current?.scrollTop || 0;
+ const scrollLeft = scrollElRef?.current?.scrollLeft || 0;

if (needCheck && scrollElRef?.current && scrollElRef.current?.contains(parentElRef.current)) {
  const visibleRect = scrollElRef.current?.getBoundingClientRect() || {};
  if (
    rect.bottom < visibleRect.top ||
-   rect.top > visibleRect.bottom ||
+   rect.top > (visibleRect.bottom + scrollTop) ||
    rect.right < visibleRect.left ||
-   rect.left > visibleRect.right
+   rect.left > (visibleRect.right + scrollLeft)
  ) {
    return { style: hideStyle };
  }
}
```

## 变更前后逻辑差异

### 变更前
- 使用简单的边界比较判断元素是否在可视区域内
- 未考虑滚动容器的滚动偏移量
- 导致边界判断不准确

### 变更后
- 获取滚动容器的 `scrollTop` 和 `scrollLeft`
- 在边界判断时加入滚动偏移量
- 更准确地判断元素在滚动容器中的实际可见性

## 逻辑影响范围
- 修复了滚动容器中弹出层的显示问题
- 提升了边界场景的用户体验
- 不影响非滚动场景

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：底层定位逻辑优化

### 行为变化说明

1. **滚动容器边界显示正常**：
   - 影响场景：在可滚动的表格或列表中使用分页器
   - 具体表现：分页大小选择器在边界位置正确显示
   - 使用示例：
   ```tsx
   // 在可滚动容器中使用
   <div style={{ height: '300px', overflow: 'auto' }}>
     <Table data={data} />
     <Pagination
       total={1000}
       pageSizeList={[10, 20, 50, 100]}
     />
   </div>
   ```
   - 是否需要调整：不需要，透明优化

2. **极限场景稳定性提升**：
   - 滚动到容器边缘时弹出层不会异常消失
   - 长列表底部的分页器正常工作
   - 提升了组件的可靠性