# Select 组件 3.5.0 版本 Diff 报告

## 问题描述

优化 `Select` 默认 `placeholder` 占位形式。将 placeholder 的渲染逻辑进行重构，通过 `useMemo` 缓存 placeholder 元素，避免重复创建，同时优化了空对象时 placeholder 的处理逻辑，提升了性能和代码可维护性。

## 代码变更文件

1. `packages/base/src/select/result.tsx`

## 变更代码行

### packages/base/src/select/result.tsx - 优化 placeholder 渲染逻辑
```diff
+ const basePlaceholder = useMemo(() => {
+   return (
+     <span className={classNames(styles.placeholder, styles.ellipsis)}>
+       <span>{placeholder}</span>
+     </span>
+   );
+ }, [placeholder]);

  const renderPlaceholder = () => {
    if (!placeholder) return renderNbsp();
-   return (
-     <span className={classNames(styles.placeholder, styles.ellipsis)}>
-       <span>{placeholder}</span>
-     </span>
-   );
+   return basePlaceholder;
  };
```

```diff
  if (!multiple && valueProp && valueProp !== 0) {
    const result = getDataByValues(value);
    _placeholder = renderResultContent(result[0]);
-   if (_placeholder === undefined) _placeholder = placeholder;
+   if (_placeholder === undefined) {
+     return basePlaceholder;
+   }
  }
```

## 变更前后逻辑差异

### 变更前
- 每次渲染时重新创建 placeholder 元素
- 空对象时直接使用字符串 placeholder
- placeholder 渲染逻辑分散在多处

### 变更后
- 使用 `useMemo` 缓存 placeholder 元素，避免重复创建
- 空对象时返回统一的 placeholder 元素结构
- placeholder 渲染逻辑集中管理

## 逻辑影响范围

1. **性能优化**：减少了 placeholder 元素的重复创建
2. **代码结构**：统一了 placeholder 的渲染方式
3. **显示一致性**：确保所有场景下 placeholder 的样式结构一致
4. **不受影响**：功能行为保持不变，仅优化内部实现

## 风险场景分析

### DOM 结构变更风险

1. **placeholder DOM 结构变化**
   - **风险示例**：空对象时之前返回字符串，现在返回完整的 DOM 结构，如果有依赖 placeholder 容器内部结构的 CSS 选择器或 JavaScript 查询，可能受到影响
   - **规避方案**：
     - 检查是否有直接操作 Select 内部 DOM 的代码
     - 使用更稳定的选择器，避免依赖内部实现细节
     - 示例：
       ```css
       /* 避免这样的选择器 */
       .select-wrapper > span:first-child { }
       
       /* 使用组件提供的类名 */
       .select-placeholder { }
       ```

### 行为逻辑变更风险

无相关风险

### 样式变更风险

无相关风险

## 升级注意事项

### 代码兼容性

**无破坏性变更**

此优化仅涉及内部实现，不影响组件的对外接口和行为。

### 行为变化说明

1. **placeholder 渲染优化**
   - **影响场景**：所有使用 placeholder 的 Select 组件
   - **具体表现**：渲染性能提升，DOM 结构保持一致
   - **受影响代码示例**：
     ```tsx
     // 之前：每次渲染重新创建 placeholder 元素
     // 现在：使用缓存的 placeholder 元素
     <Select 
       placeholder="请选择选项"
       data={options}
     />
     ```
   - **是否需要调整**：无需调整，性能优化

2. **空值 placeholder 处理**
   - **影响场景**：value 为空对象或 renderResult 返回 undefined
   - **具体表现**：返回完整的 placeholder DOM 结构而非字符串
   - **受影响代码示例**：
     ```tsx
     // 之前：返回字符串 placeholder
     // 现在：返回带样式的 placeholder 元素
     <Select 
       value={{}}
       placeholder="请选择"
       renderResult={(d) => d?.name}
     />
     ```
   - **是否需要调整**：无需调整，显示效果保持一致