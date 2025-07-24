# Select 组件 3.7.1 版本 Diff 报告

## 问题描述

修复 `Select` 组件在特定场景下的多个问题。包括设置 `absolute` 属性时的过渡动画问题、动态高度下拉框的位置调整问题、`absolute` 和 `optionWidth` 同时设置时的溢出问题，以及在 `Drawer` 中使用 `compressed` 属性时的交互问题。

## 代码变更文件

1. `packages/hooks/src/common/use-position-style/index.ts`
2. `packages/hooks/src/common/use-position-style/check-element-size.ts`
3. `packages/base/src/select/list.tsx`
4. `packages/base/src/select/select.tsx`
5. `packages/base/src/select/select.type.ts`
6. `packages/base/src/select/result.tsx`

## 变更代码行

### packages/hooks/src/common/use-position-style/index.ts - 修复弹出层位置计算

```diff
+  // 处理 absolute 场景下右侧溢出的判断
+  useLayoutEffect(() => {
+    if (!popupEl || !parentElBoundingRect || !absolute) return;
+    const popupElWidth = popupEl.getBoundingClientRect().width;
+    if (parentElBoundingRect.right + popupElWidth > windowWidth) {
+      // 右侧溢出时的处理逻辑
+    }
+  }, [popupEl, parentElBoundingRect, absolute]);
```

### packages/hooks/src/common/use-position-style/check-element-size.ts - 增强尺寸检查

```diff
  const checkElementSize = (el: HTMLElement) => {
    const newSize = { width: el.offsetWidth, height: el.offsetHeight };
-   return newSize.width !== size.width || newSize.height !== size.height;
+   return (newSize.width !== size.width || newSize.height !== size.height) && newSize.height !== 0;
  };
```

### packages/base/src/select/select.type.ts - 移除过时属性

```diff
- /**
-  * @deprecated 已废弃
-  */
- keepScrollTop?: boolean;
```

### packages/base/src/select/result.tsx - 修复 compressed 模式交互

```diff
  const handleCloseMouseDown = () => {
    removeLock.current = true;
-   setTimeout(() => {
-     removeLock.current = false;
-   }, 0);
  };

  const handleResetMore = () => {
-   if (removeLock.current) return;
+   if (removeLock.current) {
+     removeLock.current = false;
+     return;
+   }
    // 重置逻辑
  };
```

## 变更前后逻辑差异

### 变更前
- `absolute` 模式下打开下拉框时会出现意外的过渡动画
- 下拉框高度动态变化时位置不会自动调整
- 设置 `absolute` 和 `optionWidth` 后，弹出层右侧溢出时不会自动调整位置
- 在 `Drawer` 中使用 `compressed` 属性时，第二次点击删除按钮无效

### 变更后
- 优化了位置计算逻辑，消除了 `absolute` 模式下的多余过渡动画
- 下拉框高度变化时会正确重新计算位置
- 弹出层在右侧溢出时会自动调整到合适位置
- 修复了 `compressed` 模式下的删除交互，确保每次点击都有效

## 逻辑影响范围

- 影响所有使用 `absolute` 属性的 `Select` 组件
- 影响下拉列表高度会动态变化的场景（如异步加载数据）
- 影响同时设置 `absolute` 和 `optionWidth` 属性的组件
- 影响在 `Drawer`、`Modal` 等弹层中使用 `compressed` 属性的场景
- 不影响普通的 `Select` 使用场景

## 风险场景分析

### DOM 结构变更风险
无相关风险

### 行为逻辑变更风险
- 依赖 `keepScrollTop` 属性的代码需要移除该属性
- 之前依赖错误的删除交互行为的代码可能需要调整

### 样式变更风险
无相关风险

## 升级注意事项

### 代码兼容性
**破坏性变更** - 移除了 `keepScrollTop` 属性

### 行为变化说明

1. **keepScrollTop 属性移除**
   - **影响场景**：使用了 `keepScrollTop` 属性的代码
   - **具体表现**：该属性已被移除，设置将无效
   - **受影响代码示例**：
   ```tsx
   // 之前：属性存在但已废弃
   // 现在：属性已完全移除
   <Select keepScrollTop data={data} />
   ```
   - **是否需要调整**：需要移除该属性

2. **absolute 模式动画优化**
   - **影响场景**：使用 `absolute` 属性的 `Select`
   - **具体表现**：消除了打开下拉框时的多余过渡动画
   - **受影响代码示例**：
   ```tsx
   // 之前：可能出现闪烁或跳动
   // 现在：平滑展开
   <Select absolute data={data} />
   ```
   - **是否需要调整**：不需要

3. **compressed 删除交互修复**
   - **影响场景**：在弹层中使用 `compressed` 的 `Select`
   - **具体表现**：删除按钮每次点击都会生效
   - **受影响代码示例**：
   ```tsx
   // 之前：第二次点击可能无效
   // 现在：每次点击都正常响应
   <Drawer>
     <Select compressed multiple data={data} value={[1,2,3,4,5]} />
   </Drawer>
   ```
   - **是否需要调整**：不需要