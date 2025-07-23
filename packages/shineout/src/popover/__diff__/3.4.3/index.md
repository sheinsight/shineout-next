# Popover 组件 3.4.3 版本 Diff 报告

## 问题描述

修复 `Popover` 在滚动容器中的极限边界场景下不可见的问题。当 Popover 的触发元素位于一个已经横向滚动的容器内时，弹出层的位置计算没有考虑容器的滚动偏移量，导致弹出层可能出现在错误的位置或完全不可见。

## 代码变更文件

1. `packages/hooks/src/utils/dom/element.tsx`
2. `packages/hooks/src/common/use-position-style/index.ts`
3. `packages/hooks/src/components/use-popup/use-popup.ts`

## 变更代码行

### 1. packages/hooks/src/utils/dom/element.tsx - 新增查找滚动容器的工具函数
```diff
+ /**
+  * 获取最近的滚动容器
+  * @param element 起始元素
+  * @returns 最近的滚动容器元素或 null
+  */
+ export const getClosestScrollContainer = (element: HTMLElement | null): HTMLElement | null => {
+   if (!element) return null;
+   
+   let parent = element.parentElement;
+   
+   while (parent) {
+     const { overflow, overflowX, overflowY } = getComputedStyle(parent);
+     
+     if (
+       overflow === 'auto' || overflow === 'scroll' ||
+       overflowX === 'auto' || overflowX === 'scroll' ||
+       overflowY === 'auto' || overflowY === 'scroll'
+     ) {
+       return parent;
+     }
+     
+     parent = parent.parentElement;
+   }
+   
+   return null;
+ };
```

### 2. packages/hooks/src/common/use-position-style/index.ts - 修复位置计算
```diff
+ import { getClosestScrollContainer } from '../../utils/dom/element';

const getPositionStyle = () => {
  // ... 其他代码
  
+ // 获取最近的滚动容器
+ const closestScrollContainer = getClosestScrollContainer(parentElRef.current);
  
  // 左侧定位的计算
  if (position === 'left') {
-   style.left = rect.left - containerRect.left + containerScroll.left - popupGap;
+   style.left = rect.left - containerRect.left + containerScroll.left + (closestScrollContainer?.scrollLeft || 0) - popupGap;
  }
  
  // ... 其他位置计算
};
```

### 3. packages/hooks/src/components/use-popup/use-popup.ts - 移除延迟优化性能
```diff
const updatePosition = () => {
  if (!show) return;
- setTimeout(() => {
    updateFunc();
- }, 10);
};
```

## 变更前后逻辑差异

### 变更前
- 弹出层位置计算仅考虑了直接容器的滚动偏移
- 未考虑嵌套滚动容器的情况
- 位置更新有 10ms 延迟，可能导致闪烁

### 变更后
- 自动查找最近的滚动容器并获取其滚动偏移量
- 位置计算包含了横向滚动偏移（scrollLeft）
- 移除了位置更新的延迟，消除闪烁现象

## 逻辑影响范围
- 修复了在横向滚动容器中的定位问题
- 提升了弹出层显示的稳定性
- 不影响在非滚动容器中的使用

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：纯缺陷修复，不改变 API

### 行为变化说明

1. **滚动容器中的定位修复**：
   - 影响场景：Popover 在横向滚动的表格、列表等容器中使用
   - 具体表现：弹出层位置正确跟随触发元素
   - 受影响代码示例：
   ```tsx
   // 之前：在滚动后的表格中，弹出层可能错位
   // 现在：弹出层正确显示在触发元素旁边
   <div style={{ overflow: 'auto', width: '300px' }}>
     <Table style={{ width: '600px' }}>
       {/* 表格右侧列的 Popover 现在能正确显示 */}
       <Popover content="详细信息">
         <Button>查看</Button>
       </Popover>
     </Table>
   </div>
   ```
   - 是否需要调整：不需要，这是缺陷修复

2. **显示性能优化**：
   - 影响场景：所有 Popover 的显示
   - 具体表现：消除了之前可能出现的 10ms 闪烁
   - 受影响代码示例：
   ```tsx
   // 之前：快速切换时可能看到位置闪烁
   // 现在：位置更新即时且平滑
   <Popover 
     visible={visible}
     onVisibleChange={setVisible}
     content="提示内容"
   >
     <Button>触发按钮</Button>
   </Popover>
   ```
   - 是否需要调整：不需要，体验提升