# Select 组件 3.5.6 版本 Diff 报告

## 问题描述

修复 `Select` 多选模式下，开启 `onFilter` 后且使用 `open` 做面板受控打开时，自动聚焦失效的问题。当组件处于多选模式并开启过滤功能，同时使用 `open` 属性控制面板显示状态时，输入框应该在面板打开时自动获得焦点，但此功能失效。

## 代码变更文件

1. `packages/base/src/select/result.tsx`

## 变更代码行

### packages/base/src/select/result.tsx - 添加自动聚焦逻辑

```diff
+ // Select多选模式下，且开启了onFilter，自动聚焦
+ useLayoutEffect(() => {
+   if (multiple && focus && inputRef?.current) {
+     inputRef.current.focus();
+   }
+ }, [focus, multiple]);

  useLayoutEffect(() => {
    handleResetMore();
  }, [valueProp, data]);
```

## 变更前后逻辑差异

### 变更前
- 多选模式下使用 `open` 控制面板时输入框不会自动聚焦
- 需要手动点击输入框才能开始输入筛选内容

### 变更后
- 多选模式下面板打开时输入框自动获得焦点
- 可以直接输入筛选内容，无需额外点击

## 逻辑影响范围

- 仅影响多选模式下的 `Select` 组件
- 仅在开启 `onFilter` 且使用 `open` 受控时生效
- 不影响单选模式和非受控场景
- 不影响已有的聚焦逻辑

## 风险场景分析

### DOM 结构变更风险
无相关风险

### 行为逻辑变更风险

**风险场景**：依赖多选模式下输入框不自动聚焦的业务逻辑

**风险示例**：
```tsx
// 可能依赖输入框不自动聚焦的场景
<Select
  multiple
  open={isOpen}
  onFilter={handleFilter}
  onFocus={() => {
    // 期望在这里手动控制聚焦逻辑
    if (someCondition) {
      inputRef.current?.focus();
    }
  }}
/>
```

**规避方案**：在 `onFocus` 回调中使用 `preventDefault` 或调整业务逻辑

### 样式变更风险
无相关风险

## 升级注意事项

### 代码兼容性
**无破坏性变更**

### 行为变化说明

**1. 多选自动聚焦**
- **影响场景**：多选模式 + `onFilter` + `open` 受控
- **具体表现**：面板打开时输入框自动获得焦点
- **受影响代码示例**：
  ```tsx
  // 之前：需要手动点击输入框
  // 现在：自动聚焦，可直接输入
  <Select
    multiple
    open={isOpen}
    onFilter={(text) => filterData(text)}
    data={data}
  />
  ```
- **是否需要调整**：通常不需要，提升了用户体验