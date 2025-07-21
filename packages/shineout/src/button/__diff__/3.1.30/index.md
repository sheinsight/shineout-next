# Button 组件 3.1.30 版本 Diff 报告

## 问题描述
调整 `Button` 文本按钮的加载样式

## 代码变更文件
1. `packages/hooks/src/components/use-button/use-button.ts`
2. `packages/shineout-style/src/button/button.ts`

## 变更代码行
```diff
// use-button.ts
const getRootProps = () => {
  return {
-   disabled: mergedDisabled,
+   disabled: mergedDisabled || loading,
  }
}

// button.ts
// 注释掉所有 loading 特定样式
- '&$loading': {
-   color: token.buttonColorPrimaryLoading,
-   backgroundColor: token.buttonBackgroundColorPrimaryLoading,
- }
```

## 变更前后逻辑差异
- **变更前**：loading 状态有单独的样式定义，不同类型按钮有不同的 loading 样式
- **变更后**：loading 状态复用 disabled 样式，通过 `disabled || loading` 统一处理

## 逻辑影响范围
- 所有类型按钮的 loading 样式统一为 disabled 样式 + spinner
- loading 状态自动禁用点击事件，防止重复提交
- 减少 CSS 体积和维护成本

## 风险使用场景
- 如果项目自定义了 loading 样式，需要改为自定义 disabled 样式
- 依赖 loading 状态特殊样式的场景需要调整