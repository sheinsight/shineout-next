# Button 组件 3.1.2 版本 Diff 报告

## 问题描述
调整 `Button` 加载状态下没有隐藏 ShineoutIcon 的问题

## 代码变更文件
`packages/base/src/button/button.tsx`

## 变更代码行
```diff
// 1. 添加 ShineoutIcon 检测和隐藏逻辑
const renderChildren = () => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
+     const isShineoutIcon = util.isShineoutIcon(child);
+     if (loading && isShineoutIcon) {
+       return null;
+     }
    }
    return child;
  });
};

// 2. 修改默认 Spin 类型
- const spinElement = renderSpin(spin || <Spin size={spinSize} />);
+ const spinElement = renderSpin(spin || <Spin size={spinSize} type='ring' />);
```

## 变更前后逻辑差异
- **变更前**：loading 状态下，ShineoutIcon 和 loading spinner 同时显示，造成视觉混乱
- **变更后**：通过 `util.isShineoutIcon` 检测并隐藏 ShineoutIcon，且将 Spin 默认类型改为 'ring'

## 逻辑影响范围
- 所有作为 children 的 ShineoutIcon 在加载时被隐藏
- 自定义 React 组件图标不受影响
- 按钮加载动画统一为 ring 类型

## 风险使用场景
- 如果业务中使用自定义组件包装了 ShineoutIcon，可能不会被正确检测
- 依赖原有 Spin 默认样式的场景需要适配