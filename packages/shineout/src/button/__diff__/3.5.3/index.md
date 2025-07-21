# Button 组件 3.5.3 版本 Diff 报告

## 问题描述
调整 `Button` 加载状态下仅隐藏前置图标，不隐藏后置图标

## 代码变更文件
`packages/base/src/button/button.tsx`

## 变更代码行
```diff
{React.Children.map(children, (child, index) => {
  if (React.isValidElement(child)) {
    const isShineoutIcon = util.isShineoutIcon(child);
-   if (loading && isShineoutIcon) {
+   if (loading && isShineoutIcon && index === 0) {
      return null;
    }
  }
  return child;
})}
```

## 变更前后逻辑差异
- **变更前**：加载状态下隐藏所有 ShineoutIcon
- **变更后**：加载状态下只隐藏第一个 ShineoutIcon（index === 0），后置图标保留

## 逻辑影响范围
- 下拉按钮的箭头图标在加载时保留
- 导出、分享等操作按钮的后置图标不受影响
- 前置功能图标仍会被 loading spinner 替换

## 风险使用场景

### 代码执行风险
- 无直接代码执行风险

### 交互体验差异
- 重要图标放在 children 中第二个位置时，加载状态下不会被隐藏
- 原来加载时所有图标都隐藏，现在只隐藏第一个