# Menu 组件 3.3.0 版本 Diff 报告

## 问题描述

本版本包含两个变更：
1. 修复 `Menu.Search` 的 `collapse` 属性拼写错误问题，之前错误地拼写为 `collpase`
2. `Menu` 支持水平模式的暗系主题，之前水平模式下暗色主题样式不完善

## 代码变更文件

1. `packages/base/src/menu/search.tsx`
2. `packages/base/src/menu/search.type.ts`
3. `packages/shineout-style/src/menu/menu.ts`
4. `packages/theme/src/menu/menu.ts`
5. `packages/theme/src/menu/token.ts`

## 变更代码行

### 1. packages/base/src/menu/search.type.ts - 修复拼写错误
```diff
export interface SearchProps {
  // ... 其他属性
- collpase?: boolean;
+ collapse?: boolean;
}
```

### 2. packages/base/src/menu/search.tsx - 更新属性使用
```diff
const Search = (props: SearchProps) => {
- const { collpase } = props;
+ const { collapse } = props;
  
  // 使用 collapse 替代 collpase
- if (collpase) {
+ if (collapse) {
    // 折叠状态逻辑
  }
};
```

### 3. packages/shineout-style/src/menu/menu.ts - 增强暗色主题样式
```diff
// 水平模式暗色主题样式增强
'&[data-soui-theme="dark"]': {
  '&[data-soui-mode="horizontal"]': {
    backgroundColor: token.menuDarkBackgroundColor,
    '& $item': {
      color: token.menuDarkFontColor,
      '&:hover': {
        backgroundColor: token.menuDarkItemHoverBackgroundColor,
      },
    },
  },
},
```

### 4. packages/theme/src/menu/token.ts - 新增暗色主题 token
```diff
export const menuTokenMap: MenuTokenMap = {
  // ... 其他 token
+ menuDarkBackgroundColor: {
+   type: 'color',
+   value: 'Neutral-800',
+   description: '菜单暗色主题背景色',
+ },
+ menuDarkItemHoverBackgroundColor: {
+   type: 'color',
+   value: 'Neutral-700',
+   description: '菜单项暗色主题悬停背景色',
+ },
};
```

## 变更前后逻辑差异

### 变更前
1. Menu.Search 组件使用错误的属性名 `collpase`
2. 水平模式下暗色主题样式缺失或不完整
3. 开发者使用时容易因拼写错误导致功能失效

### 变更后
1. 属性名修正为标准的 `collapse`
2. 水平模式完整支持暗色主题
3. 所有模式（inline、vertical、horizontal）都有完善的暗色主题支持

## 逻辑影响范围
- Menu.Search 的折叠功能属性名变更
- 水平模式的暗色主题视觉表现
- 不影响其他功能逻辑

## 升级注意事项

### 代码兼容性
- **破坏性变更**：`collpase` 属性名修正为 `collapse`

### 行为变化说明

1. **Menu.Search 属性名变更**：
   - 影响场景：使用了 Menu.Search 组件的 `collpase` 属性
   - 具体表现：旧属性名不再生效
   - 受影响代码示例：
   ```tsx
   // 需要修改的代码
   // 之前：
   <Menu.Search collpase={isCollapsed} />
   
   // 之后：
   <Menu.Search collapse={isCollapsed} />
   ```
   - 是否需要调整：**必须调整**，更新属性名

2. **水平模式暗色主题完善**：
   - 影响场景：使用水平模式且应用暗色主题
   - 具体表现：视觉效果更加完善，与其他模式保持一致
   - 使用示例：
   ```tsx
   <Menu 
     mode="horizontal"
     theme="dark"
     data={menuData}
   />
   ```
   - 是否需要调整：不需要，纯视觉增强