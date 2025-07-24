# Select 组件 3.4.5 版本 Diff 报告

## 问题描述

修复 `Select` 动态的从单选切换为多选时，placeholder 内容显示不完整的问题。当组件的 `multiple` 属性从 `false` 动态切换到 `true` 时，placeholder 的显示宽度没有正确更新，导致文本被截断或显示不完整。

## 代码变更文件

1. `packages/base/src/select/result.tsx`

## 变更代码行

### packages/base/src/select/result.tsx - 修复 placeholder 动态更新
```diff
- const showPlaceholder = useMemo(() => {
-   return !multiple && focusInput && renderResultContent ? renderResultContent : undefined;
- }, [multiple, focusInput, renderResultContent]);
+ const showPlaceholder = !multiple && focusInput && renderResultContent ? renderResultContent : undefined;
```

## 变更前后逻辑差异

### 变更前
- 使用 `useMemo` 缓存 placeholder 的计算结果
- 当 `multiple` 属性动态变化时，缓存值未及时更新
- 导致从单选切换到多选时，placeholder 显示异常

### 变更后
- 移除 `useMemo`，每次渲染时实时计算 placeholder
- 确保 `multiple` 属性变化时立即反映到界面上
- placeholder 能够正确响应模式切换

## 逻辑影响范围

1. **动态模式切换**：只影响运行时改变 `multiple` 属性的场景
2. **placeholder 显示**：影响有 placeholder 且会切换单选/多选模式的组件
3. **不受影响**：静态配置的 Select、没有 placeholder 的场景

## 风险场景分析

### DOM 结构变更风险

无相关风险

### 行为逻辑变更风险

1. **性能影响**
   - **风险示例**：移除 `useMemo` 后，每次渲染都会重新计算 `showPlaceholder`，在频繁更新的场景下可能有轻微的性能影响
   - **规避方案**：
     - 通常情况下影响可忽略不计
     - 如果在性能敏感的场景（如大量 Select 组件同时渲染），可以通过减少不必要的父组件更新来优化

### 样式变更风险

无相关风险

## 升级注意事项

### 代码兼容性

**无破坏性变更**

此修复仅优化了内部实现，不会影响组件的 API 和使用方式。

### 行为变化说明

1. **动态切换单选/多选模式**
   - **影响场景**：运行时通过状态控制 `multiple` 属性的场景
   - **具体表现**：之前切换后 placeholder 可能被截断，现在能完整显示
   - **受影响代码示例**：
     ```tsx
     // 之前：从单选切换到多选时，placeholder 显示不完整
     // 现在：切换后 placeholder 正确显示完整内容
     const [isMultiple, setIsMultiple] = useState(false);
     <Select 
       multiple={isMultiple}
       placeholder="请选择一个或多个选项"
       data={options}
     />
     ```
   - **是否需要调整**：无需调整，显示效果修正