# Button 组件 3.7.0-beta.24 版本 Diff 报告

## 问题描述
修复 `Button` 在 React 18 以下初始化时有过渡动画的问题

## 代码变更文件
`packages/shineout-style/src/button/button.ts`

## 变更代码行
```diff
button: {
- transition: 'all .1s linear',
  '&:hover': {
+   transition: 'all .1s linear',
  }
}
```

## 变更前后逻辑差异
- **变更前**：transition 在按钮默认样式中，导致 React 18 以下初始渲染时出现不必要的动画
- **变更后**：transition 移到 :hover 伪类中，只在鼠标悬停时触发过渡效果

## 逻辑影响范围
- React 18 以下版本消除初次渲染时的闪烁或滑动效果
- 所有版本的 hover 过渡动画保持不变
- 减少初始渲染时的重绘和重排，提升性能

## 风险使用场景
- 如果业务代码依赖了按钮初始化时的过渡效果，需要调整
- 动态改变按钮样式时不再有过渡效果（除非 hover 状态）