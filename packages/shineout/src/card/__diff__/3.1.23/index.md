# Card 组件 3.1.23 版本 Diff 报告

## 问题描述
修复 `Card` 嵌套使用下，外层 `split` 属性会透传影响下层的问题

## 代码变更文件
`packages/shineout-style/src/card/card.ts`

## 变更代码行
```diff
body: {
- '$wrapperSplit $header+&': {
+ '$wrapperSplit>$header+&': {
    borderTop: `1px solid ${token.cardBorderColor}`,
  },
}
```

## 变更前后逻辑差异
- **变更前**：使用空格选择器 `$wrapperSplit $header+&`，会选中所有后代元素，导致内层 Card 也受影响
- **变更后**：使用直接子选择器 `$wrapperSplit>$header+&`，只影响当前层级的 header+body

## 逻辑影响范围
- 外层 Card 的 split 样式不再影响嵌套的内层 Card
- 每个 Card 的 split 属性独立生效
- 避免了嵌套 Card 出现意外的边框

## 风险使用场景

### 代码执行风险
- CSS 选择器依赖空格选择器的样式规则将失效

### 交互体验差异
- 内层 Card 不再继承外层的 split 样式
- 嵌套 Card 的边框显示与之前不同