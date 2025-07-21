# Badge 组件 3.5.2 版本 Diff 报告

## 问题描述
修复 `Badge` 间距 css var 丢失的问题

## 代码变更文件
`packages/theme/src/badge/` 相关文件

## 变更代码行
```diff
// Token 定义中的间距引用
const badgeTokens = {
- badgeOffsetX: 'spacing-6',
- badgeOffsetY: 'spacing-8',
+ badgeOffsetX: 'Spacing-6',
+ badgeOffsetY: 'Spacing-8',
};
```

## 变更前后逻辑差异
- **变更前**：使用小写 `spacing-6` 和 `spacing-8`，但 CSS 变量实际名称是大写开头的 `Spacing-*`
- **变更后**：正确引用 `Spacing-6` 和 `Spacing-8`，CSS 变量能正常解析

## 逻辑影响范围
- Badge 组件的位置偏移量恢复正常
- 徽标不再贴着主体元素，有正确的 X/Y 轴偏移
- 影响所有使用 Badge 组件的场景

## 风险使用场景

### 代码执行风险
- 自定义主题使用错误的 token 名称（小写 spacing-*）将失效

### 交互体验差异
- Badge 位置从贴着元素变为有正确偏移
- 影响所有使用 Badge 组件的视觉布局