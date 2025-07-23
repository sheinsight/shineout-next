# Gap 组件 3.1.30 版本 Diff 报告

## 问题描述

修复 `Gap` 属性 `itemStyle` 不生效的问题。当浏览器支持 flex gap 时，组件错误地忽略了用户传入的 `itemStyle` 属性。

## 代码变更文件

`packages/base/src/gap/gap.tsx`

## 变更代码行

```diff
const itemStyle = supportFlexGap
-  ? undefined
+  ? itemStyleProps
  : {
      ...itemStyleProps,
      marginBottom: row,
```

## 变更前后逻辑差异

### 变更前
- 当浏览器支持 flex gap（`supportFlexGap` 为 true）时，`itemStyle` 被设置为 `undefined`
- 用户传入的 `itemStyleProps` 被完全忽略
- 只有在不支持 flex gap 的浏览器中才会应用 `itemStyle`

### 变更后
- 无论浏览器是否支持 flex gap，都会保留用户传入的 `itemStyleProps`
- 在支持 flex gap 的浏览器中，直接使用 `itemStyleProps`
- 在不支持 flex gap 的浏览器中，合并 `itemStyleProps` 和间距样式

## 逻辑影响范围
- 修复了现代浏览器中 `itemStyle` 属性失效的问题
- 保持了对旧浏览器的兼容性处理
- 不影响组件的间距功能，仅修复样式传递问题

## 风险使用场景

### 代码执行风险
- 无破坏性变更，仅修复了属性传递问题

### 交互体验差异
1. **样式恢复正常**：
   - 影响场景：在支持 flex gap 的浏览器中使用 `itemStyle` 属性
   - 具体表现：原本不生效的自定义样式现在会正常应用
   - 受影响代码示例：`<Gap itemStyle={{ background: 'red' }}>...</Gap>`