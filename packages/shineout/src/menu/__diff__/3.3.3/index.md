# Menu 组件 3.3.3 版本 Diff 报告

## 问题描述

修复 `Menu` 水平模式下高度 100% 的问题。在水平模式（horizontal）下，Menu 组件不应该占满父容器的高度，但之前的样式无差别地应用了 `height: 100%`，导致水平菜单的高度异常。

## 代码变更文件

1. `packages/shineout-style/src/menu/menu.ts`

## 变更代码行

### packages/shineout-style/src/menu/menu.ts - 条件应用高度样式
```diff
const menuStyle: JsStyles<MenuClassType> = {
  wrapper: {
-   height: '100%',
    width: '100%',
    backgroundColor: token.menuItemBackgroundColor,
    transition: `width ${animationDuration} ${transitionFunc}`,
    color: token.menuFontColor,
    display: 'flex',
    flexDirection: 'column',
+
+   '&:not([data-soui-mode=horizontal])': {
+     height: '100%',
+   }
  },
```

## 变更前后逻辑差异

### 变更前
- 所有模式的 Menu 都应用 `height: 100%`
- 水平模式下菜单高度被强制拉伸到父容器高度
- 影响水平菜单的视觉效果和布局

### 变更后
- 使用 CSS 选择器 `:not([data-soui-mode=horizontal])` 排除水平模式
- 仅在非水平模式（垂直、内联）下应用 `height: 100%`
- 水平模式的高度由内容决定

## 逻辑影响范围
- 仅影响水平模式的 Menu 高度表现
- 垂直模式和内联模式保持原有行为
- 不影响功能逻辑，纯样式修复

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：修复了不合理的样式行为

### 行为变化说明

1. **水平菜单高度恢复正常**：
   - 影响场景：使用 `mode="horizontal"` 的菜单
   - 具体表现：菜单高度不再强制 100%，由内容自然撑开
   - 受影响代码示例：
   ```tsx
   // 之前：水平菜单被拉伸到父容器高度
   // 现在：高度由菜单内容决定
   <div style={{ height: '500px' }}>
     <Menu 
       mode="horizontal"
       data={menuData}
     />
   </div>
   ```
   - 是否需要调整：如果依赖了错误的高度行为需要调整布局

2. **垂直模式不受影响**：
   - 垂直和内联模式继续保持 `height: 100%`
   - 侧边栏菜单等场景正常工作