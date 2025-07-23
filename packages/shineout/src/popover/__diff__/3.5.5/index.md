# Popover 组件受控展示修复 diff 报告

## 问题描述

修复 Popover 组件受控为 true 但不在视口范围内时无法展示的问题。之前的逻辑会在元素不在可视区域内时隐藏 Popover，即使它是受控状态且 `open` 属性为 `true`。这导致了受控组件行为不符合预期。

## 代码变更文件

- `packages/hooks/src/common/use-position-style/index.ts`

## 变更代码行

### packages/hooks/src/common/use-position-style/index.ts（第279行）

```diff
-    if (scrollElRef?.current && scrollElRef.current?.contains(parentElRef.current)) {
+    if (!show && scrollElRef?.current && scrollElRef.current?.contains(parentElRef.current)) {
```

## 变更前后逻辑差异

### 变更前
- 只要父元素在滚动容器内，就会检查元素是否在可视区域
- 如果元素不在可视区域内，会返回 `hideStyle`，隐藏 Popover
- 这个检查不考虑 Popover 的受控状态

### 变更后
- 增加了 `!show` 条件判断
- 只有当 `show` 为 `false` 时，才会进行可视区域检查
- 当 `show` 为 `true`（受控展示）时，跳过可视区域检查，确保 Popover 显示

### 对组件运作逻辑的影响

1. **受控模式优先**：受控状态（`open` 属性）现在具有最高优先级
2. **视口检查时机**：只在非受控或受控为 false 的情况下进行视口检查
3. **行为一致性**：确保受控组件的行为符合 React 受控组件的标准模式

## 风险使用场景

### 代码执行风险
1. **性能考虑**：受控为 true 时跳过视口检查，可能会渲染不可见的内容
2. **内存占用**：大量不在视口内但受控显示的 Popover 可能增加内存使用

### 交互体验差异

1. **修复前的问题**：
   - 受控 Popover 在滚动出视口后会消失
   - 无法通过代码控制不在视口内的 Popover 显示
   - 破坏了受控组件的预期行为

2. **修复后的改善**：
   - 受控状态完全由 `open` 属性决定
   - 支持在任何位置强制显示 Popover
   - 符合 React 受控组件的标准行为

### 需要注意的场景

1. **长列表场景**：
   - 虚拟滚动列表中的受控 Popover
   - 大量数据项都有受控 Popover 的情况

2. **性能敏感场景**：
   - 同时存在多个受控为 true 但不在视口内的 Popover
   - 需要考虑是否真的需要渲染不可见的内容

3. **特殊用例**：
   - 程序化控制 Popover 显示
   - 需要在元素不可见时预渲染 Popover 内容
   - 滚动到指定位置前预先显示 Popover

4. **边界情况**：
   - 元素部分可见时的处理
   - 快速滚动时的表现
   - 容器尺寸变化时的响应