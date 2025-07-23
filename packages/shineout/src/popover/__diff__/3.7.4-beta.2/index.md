# Popover 组件 3.7.4-beta.2 版本 Diff 报告

## 问题描述

优化 `Popover` 初始化性能，移除组件 mount 时多余的 DOM 样式计算。之前 Popover 组件在初始化时会立即执行 `getComputedStyle` 等 DOM 操作来计算边框宽度和查找滚动容器，即使组件还未显示。这些计算会触发浏览器的 reflow，影响性能。现在将这些计算延迟到组件真正需要显示时才执行，减少了不必要的性能开销。

## 代码变更文件

1. `packages/base/src/absolute-list/absolute-list.tsx`
2. `packages/hooks/src/common/use-position-style/check-border.ts`
3. `packages/hooks/src/common/use-position-style/index.ts`

## 变更代码行

### 1. packages/base/src/absolute-list/absolute-list.tsx - 条件查找滚动容器
```diff
 useEffect(() => {
+  if (!focus) return;
   const closestScrollContainer = getClosestScrollContainer(parentElRef.current);
   if (closestScrollContainer) {
     setClosestScrollContainer(closestScrollContainer);
   }
- }, []);
+ }, [focus]);
```

### 2. packages/hooks/src/common/use-position-style/check-border.ts - 添加启用参数
```diff
- export const useCheckElementBorderWidth = (ref: RefObject<HTMLElement>, options?: Options) => {
+ export const useCheckElementBorderWidth = (ref: RefObject<HTMLElement>, options?: Options & { enable?: boolean }) => {
   const { direction } = options || {};
   const [borderWidth, setBorderWidth] = useState({ borderLeftWidth: 0, borderTopWidth: 0 });
   
   useEffect(() => {
+    if (options?.enable === false) return;
     if (!ref.current) return;
     const styles = getComputedStyle(ref.current);
     // ... 计算逻辑
-  }, [ref.current]);
+  }, [ref.current, options?.enable]);
```

### 3. packages/hooks/src/common/use-position-style/index.ts - 条件计算边框宽度
```diff
- const parentElBorderWidth = useCheckElementBorderWidth(parentElRef, { direction: 'horizontal' });
+ const parentElBorderWidth = useCheckElementBorderWidth(parentElRef, { 
+   direction: 'horizontal',
+   enable: show 
+ });
```

## 变更前后逻辑差异

### 变更前
- 组件 mount 时立即执行 DOM 计算，包括查找滚动容器和计算边框宽度
- 即使 Popover 未显示也会触发 `getComputedStyle` 等耗时操作
- 页面中多个 Popover 实例会在初始化时产生性能开销

### 变更后
- DOM 计算延迟到组件需要显示时（`focus` 或 `show` 为 true）才执行
- 避免了未显示组件的不必要计算
- 减少了浏览器 reflow 次数，提升了初始化性能

## 逻辑影响范围
- 仅影响组件初始化阶段的性能表现
- 不改变组件的功能行为
- 对所有使用 Popover 的场景都有性能提升，特别是页面中有大量 Popover 实例的情况

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：这是内部性能优化，不涉及公共 API 变更

### 行为变化说明

1. **性能提升**：
   - 影响场景：所有使用 Popover 的场景，特别是同页面多实例场景
   - 具体表现：组件初始化更快，减少页面加载时的卡顿
   - 受影响代码示例：
   ```tsx
   // 之前：100 个 Popover 会在初始化时执行 100 次 DOM 计算
   // 现在：只有显示的 Popover 才会执行 DOM 计算
   {items.map(item => (
     <Popover key={item.id} content={item.tooltip}>
       <span>{item.name}</span>
     </Popover>
   ))}
   ```
   - 是否需要调整：不需要，性能优化对用户透明