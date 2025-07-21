# Alert 组件 3.7.5-beta.10 版本 Diff 报告

## 问题描述
修复 `Alert` 传入空字符串 `title` 属性也能渲染结构的问题

## 代码变更文件
`packages/base/src/alert/alert.tsx`

## 变更代码行
```diff
- if ('title' in props && title !== undefined) {
+ if (title) {
```

## 变更前后逻辑差异
- **变更前**：判断 `'title' in props && title !== undefined`，空字符串、null、0 等假值也会渲染 title DOM 结构
- **变更后**：判断 `title` 真值，空字符串、null、undefined、0、false 等假值不再渲染 title 结构

## 逻辑影响范围
- `<Alert title="" />` 不再渲染空的 title 结构
- `<Alert title={null} />` 和 `<Alert title={0} />` 等假值情况统一不渲染
- Alert 组件内部布局更紧凑，避免空元素占用空间

## 风险使用场景
- 如果业务代码依赖空字符串 title 渲染特定样式，需要调整
- 动态控制 title 时使用 `title={showTitle ? "标题" : ""}` 的场景行为会改变