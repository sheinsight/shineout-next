# Select 组件 3.5.7 版本 Diff 报告

## 问题描述

修复 `Select` 单选模式下设置了 value 为数组类型，此时开启 `onFilter` 后组件渲染报错的问题。当开发者错误地在单选模式下传入数组类型的 value，同时启用过滤功能时，组件会因为尝试访问数组的属性而导致运行时错误。

## 代码变更文件

1. `packages/base/src/select/select.tsx`

## 变更代码行

### packages/base/src/select/select.tsx - 修复 getRenderItem 和 getRenderResult 函数

```diff
- const getRenderItem = (data: DataItem, index?: number) => {
+ const getRenderItem = (data: DataItem, index?: number): ReactNode => {
    return typeof renderItemProp === 'function'
      ? renderItemProp(data, index)
-     : (data[renderItemProp] as ReactNode);
+     : (data?.[renderItemProp] || '') as ReactNode;
  };
```

```diff
- const getRenderResult = (data: DataItem, index?: number) => {
+ const getRenderResult = (data: DataItem, index?: number): ReactNode => {
    if (!renderResultProp) return renderItem(data, index);
-   return typeof renderResultProp === 'function'
+   const result = typeof renderResultProp === 'function'
      ? renderResultProp(data, index)
      : data[renderResultProp];
+   return result ?? null
  };
```

## 变更前后逻辑差异

### 变更前
- 单选模式下传入数组 value 会导致访问属性时报错
- `getRenderItem` 和 `getRenderResult` 可能返回 undefined
- 组件在边界情况下会崩溃

### 变更后
- 安全访问数据属性，避免运行时错误
- 确保渲染函数始终返回有效的 React 节点
- 组件能够容错处理不正确的 value 类型

## 逻辑影响范围

- 影响所有使用 `renderItem` 属性的 `Select` 组件
- 影响使用 `renderResult` 属性的场景
- 提升了组件在错误使用情况下的稳定性
- 不影响正确使用场景的功能

## 风险场景分析

### DOM 结构变更风险
无相关风险

### 行为逻辑变更风险

**风险场景**：依赖组件在错误 value 类型时报错的业务逻辑

**风险示例**：
```tsx
// 可能依赖报错来发现问题的代码
try {
  <Select
    value={[1, 2]} // 单选模式下错误地传入数组
    onFilter={handleFilter}
    renderItem="label"
  />
} catch (error) {
  // 之前：会捕获到错误
  // 现在：不会报错
  console.error('Select value 类型错误');
}
```

**规避方案**：使用 TypeScript 类型检查或在 onChange 中验证 value 类型

### 样式变更风险
无相关风险

## 升级注意事项

### 代码兼容性
**无破坏性变更**

### 行为变化说明

**1. 错误容错增强**
- **影响场景**：单选模式下错误传入数组 value
- **具体表现**：不再抛出运行时错误
- **受影响代码示例**：
  ```tsx
  // 之前：运行时报错
  // 现在：正常渲染，显示空内容
  <Select
    value={['option1', 'option2']} // 错误的 value 类型
    onFilter={(text) => filterData(text)}
    renderItem="label"
    data={data}
  />
  ```
- **是否需要调整**：建议修正 value 类型为单个值

**2. 空值处理优化**
- **影响场景**：数据为 null/undefined 或属性不存在
- **具体表现**：返回空字符串或 null 而非 undefined
- **受影响代码示例**：
  ```tsx
  // 之前：可能显示 undefined
  // 现在：显示空字符串
  <Select
    renderItem="nonExistentProp"
    data={[{ id: 1, name: 'Option' }]}
  />
  ```
- **是否需要调整**：不需要，提升了健壮性