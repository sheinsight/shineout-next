# Menu 组件 3.2.0 版本 Diff 报告

## 问题描述

Menu 组件在 3.2.0 版本中新增了三个重要功能：
1. **Collapse 折叠功能**：新增 `collapse` 属性，支持将垂直菜单折叠成图标形式
2. **renderIcon 图标渲染**：新增 `renderIcon` 属性，允许自定义菜单项的图标渲染逻辑
3. **header 头部内容**：新增 `header` 属性，支持在菜单顶部渲染自定义内容

## 代码变更文件

1. `packages/base/src/menu/menu.tsx`
2. `packages/base/src/menu/menu.type.ts`
3. `packages/base/src/menu/item.tsx`
4. `packages/shineout-style/src/menu/menu.ts`
5. `packages/theme/src/menu/menu.ts`
6. `packages/theme/src/menu/token.ts`

## 变更代码行

### 1. packages/base/src/menu/menu.type.ts - 新增属性定义
```diff
+ /**
+  * @cn 渲染Icon
+  * @en Render Icon
+  */
+ renderIcon?: (data: DataItem) => React.ReactNode;
+ /**
+  * @cn 是否折叠
+  * @en Whether to collapse
+  * @default false
+  */
+ collapse?: boolean;
+ /**
+  * @cn 头部内容， 仅在 mode为 'inline' 时生效
+  */
+ header?: React.ReactNode;
```

### 2. packages/base/src/menu/menu.tsx - 实现折叠逻辑
```diff
const Menu = <DataItem, Key extends KeygenResult>(props: MenuProps<DataItem, Key>) => {
- const { data = emptyArray, mode = 'inline', theme = 'light' } = props;
+ const {
+   data = emptyArray,
+   mode: modeProps = 'inline',
+   theme = 'light',
+   collapse,
+ } = props;
+ const mode = collapse ? 'vertical' : modeProps;
  
+ const [collapseOpenKeys, setCollapseOpenKeys] = useState([]);
  const { openKeys, onOpenChange, bindUpdate, unbindUpdate, changeActiveId } = useMenu({
    data,
    active: props.active,
    defaultOpenKeys: props.defaultOpenKeys,
-   openKeys: props.openKeys,
-   onOpenChange: props.onOpenChange as any,
+   openKeys: props.collapse ? collapseOpenKeys : props.openKeys,
+   onOpenChange: props.collapse ? setCollapseOpenKeys : (props.onOpenChange as any),
  });
  
+ const style = { ...props.style };
+ if (collapse) delete style.width;
- const listStyle = isVertical ? { width: props.style?.width } : undefined;
+ const listStyle = isVertical && !collapse ? { width: props.style?.width } : undefined;
```

### 3. packages/base/src/menu/item.tsx - 添加 renderIcon 支持
```diff
+ const iconNode = props.renderIcon ? props.renderIcon(props.dataItem) : null;

// 在渲染时使用 iconNode
{iconNode && <span className={menuClasses?.icon}>{iconNode}</span>}
```

### 4. packages/shineout-style/src/menu/menu.ts - 折叠样式
```diff
+ wrapperCollpase: {
+   width: token.menuCollapseWidth,
+   '& $item': {
+     paddingLeft: 0,
+     justifyContent: 'center',
+   },
+   '& $titleContent': {
+     opacity: 0,
+     width: 0,
+   },
+ },
+ header: {
+   padding: token.menuHeaderPadding,
+   borderBottom: `1px solid ${token.menuDividerColor}`,
+ },
```

## 变更前后逻辑差异

### 变更前
1. 菜单只能以完整形式展示
2. 图标仅能通过 renderItem 整体渲染控制
3. 菜单顶部无法添加额外内容

### 变更后
1. 支持折叠模式，仅显示图标
2. 可以独立控制图标渲染
3. 支持在菜单顶部添加自定义内容

## 逻辑影响范围
- 新增功能均为可选属性
- 不影响现有使用方式
- 折叠时自动切换为 vertical 模式

## 升级注意事项

### 代码兼容性
- **无破坏性变更**：所有新功能都是可选的

### 行为变化说明

1. **折叠功能**：
   - 影响场景：需要节省侧边栏空间的应用
   - 具体表现：设置 `collapse={true}` 后菜单收缩为图标
   - 使用示例：
   ```tsx
   // 实现可折叠的侧边栏
   <Menu
     collapse={isCollapsed}
     data={menuData}
     renderIcon={(item) => item.icon}
   />
   ```
   - 是否需要调整：不需要，新增功能

2. **图标独立渲染**：
   - 影响场景：需要为菜单项添加图标
   - 具体表现：通过 renderIcon 单独控制图标
   - 使用示例：
   ```tsx
   <Menu
     data={menuData}
     renderIcon={(item) => <Icon type={item.iconType} />}
   />
   ```
   - 是否需要调整：不需要，可选功能

3. **头部内容支持**：
   - 影响场景：需要在菜单顶部显示 Logo 或其他信息
   - 具体表现：仅在 inline 模式下生效
   - 使用示例：
   ```tsx
   <Menu
     mode="inline"
     header={<Logo />}
     data={menuData}
   />
   ```
   - 是否需要调整：不需要，可选功能