# Breadcrumb 组件 3.7.6-beta.3 版本 Diff 报告

## 问题描述
`Breadcrumb` 设置 `max` 属性后，新增 Popover 展示完整菜单路径

## 代码变更文件
1. `packages/base/src/breadcrumb/breadcrumb-item.tsx` (新增)
2. `packages/base/src/breadcrumb/breadcrumb.tsx` 
3. `packages/shineout-style/src/breadcrumb/breadcrumb.ts`

## 变更代码行
```diff
// breadcrumb.tsx
+ const itemList = max && dataDrop && childrenArray.length > max 
+   ? [
+       ...childrenArray.slice(0, max - 1),
+       <BreadcrumbItem key="ellipsis" isEllipsis>...</BreadcrumbItem>,
+       ...childrenArray.slice(-1)
+     ]
+   : childrenArray;

// breadcrumb-item.tsx (新增)
+ const [showTooltip, setShowTooltip] = useState(false);
+ const contentRef = useRef<HTMLDivElement>(null);
+ 
+ useEffect(() => {
+   if (contentRef.current && contentRef.current.scrollWidth > 150) {
+     setShowTooltip(true);
+   }
+ }, [children]);

// breadcrumb.ts (样式)
+ contentMaxWidth: {
+   maxWidth: '150px',
+   overflow: 'hidden',
+   textOverflow: 'ellipsis',
+   whiteSpace: 'nowrap',
+ },
```

## 变更前后逻辑差异
- **变更前**：设置 max 属性时，中间项直接显示省略号，无法查看完整路径
- **变更后**：中间项使用 "..." 表示，鼠标悬停时通过 Popover 显示完整的面包屑路径；单个项超过 150px 时自动省略并显示 Tooltip

## 逻辑影响范围
- 设置了 `max` 属性的 Breadcrumb 组件会有新的交互行为
- 单个面包屑项超过 150px 宽度时自动省略
- 省略的项支持 hover 查看完整内容

## 升级注意事项

### 代码兼容性
- Popover 组件的引入可能影响打包体积，需要确保项目中已正确引入该依赖

### 行为变化说明
- 自定义面包屑省略样式可能与新增的 Popover 交互冲突
- 150px 的固定宽度限制可能在不同屏幕尺寸下表现不一致