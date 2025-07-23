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

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：仅调整了加载状态下的图标显示逻辑

### 行为变化说明
1. **加载状态图标显示变化**：
   - 升级前：loading 状态下隐藏所有 Shineout 图标
   - 升级后：loading 状态下仅隐藏第一个图标，保留后续图标
   - 受影响场景：
     ```tsx
     // 下拉按钮场景
     <Button loading>
       操作
       <Icon.ArrowDown />  {/* 升级前：隐藏，升级后：显示 */}
     </Button>
     
     // 多图标场景
     <Button loading>
       <Icon.Download />   {/* 升级前后都隐藏 */}
       导出
       <Icon.ArrowRight /> {/* 升级前：隐藏，升级后：显示 */}
     </Button>
     ```
   - 行为变化：下拉箭头、方向指示等后置图标在加载时保持可见
   - 是否需要调整：通常不需要，这是体验优化