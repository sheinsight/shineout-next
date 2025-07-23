# Menu 组件 3.4.0 版本 Diff 报告

## 问题描述

`Menu` 新增父节点激活状态下的文字颜色 token。之前父节点在激活路径上时，使用的是与子节点相同的激活颜色，无法独立控制。现在新增 `menuItemInpathActiveFontColor` token，允许为处于激活路径上的父节点设置不同的文字颜色，提升视觉层次感。

## 代码变更文件

1. `packages/shineout-style/src/menu/menu.ts`
2. `packages/theme/src/menu/menu.ts`
3. `packages/theme/src/menu/token.ts`
4. `packages/theme/src/menu/type.ts`

## 变更代码行

### 1. packages/shineout-style/src/menu/menu.ts - 应用新 token
```diff
// 父节点激活状态样式
'&$itemInpath': {
- color: token.menuItemActiveFontColor,
+ color: token.menuItemInpathActiveFontColor,
  '& $icon': {
-   color: token.menuItemActiveFontColor,
+   color: token.menuItemInpathActiveFontColor,
  },
},
```

### 2. packages/theme/src/menu/menu.ts - 定义 token 默认值
```diff
const menuTokens: MenuTokens = {
  // ... 其他 tokens
+ menuItemInpathActiveFontColor: Brand.Brand6,
};
```

### 3. packages/theme/src/menu/token.ts - 添加 token 映射
```diff
export const menuTokenMap: MenuTokenMap = {
  // ... 其他映射
+ menuItemInpathActiveFontColor: {
+   type: 'color',
+   value: 'Brand-6',
+   description: '菜单父节点激活状态下的字体颜色',
+ },
};
```

### 4. packages/theme/src/menu/type.ts - 添加类型定义
```diff
export interface MenuTokens {
  // ... 其他类型
+ /**
+  * @description 菜单父节点激活状态下的字体颜色
+  */
+ menuItemInpathActiveFontColor: string;
}
```

## 变更前后逻辑差异

### 变更前
- 父节点和子节点使用相同的激活颜色 token（`menuItemActiveFontColor`）
- 无法为父节点设置独立的激活状态颜色
- 视觉层次感不够分明

### 变更后
- 父节点使用独立的 token（`menuItemInpathActiveFontColor`）
- 可以通过主题配置为父节点设置不同的激活颜色
- 默认值为 Brand-6，保持视觉一致性

## 逻辑影响范围
- 仅影响处于激活路径上的父节点文字和图标颜色
- 不影响子节点的激活样式
- 不影响暗色主题（暗色主题逻辑未变）

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：新增 token，默认值与原行为视觉一致

### 行为变化说明

1. **父节点激活颜色可独立配置**：
   - 影响场景：多级菜单中，当子项被选中时，其父节点的文字颜色
   - 具体表现：父节点文字颜色现在可以独立设置
   - 使用示例：
   ```tsx
   // 通过主题配置自定义父节点激活颜色
   const theme = {
     menu: {
       menuItemInpathActiveFontColor: '#1890ff'
     }
   };
   
   <Menu
     data={menuData}
     theme={theme}
     active={activeKey}
   />
   ```
   - 是否需要调整：不需要，默认值保持原有视觉效果

2. **默认行为无变化**：
   - 不配置主题时，视觉效果与之前完全一致
   - Brand-6 是原有激活颜色的默认值
   - 无需修改现有代码