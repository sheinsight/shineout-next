# Card 组件 3.1.10 版本 Diff 报告

## 问题描述
修复 `Card` 在没有 `extra` 和 `collapse` 时多出一层，导致传入的 `className` 无法在 header 上生效

## 代码变更文件
`packages/base/src/card/card-header.tsx`

## 变更代码行
```diff
const renderHeader = () => {
+ // 简单情况：没有 extra 和 collapsible
+ if (!extra && !collapsible) {
+   return (
+     <div 
+       className={classNames(cardClasses.header, className)}
+       style={style}
+     >
+       {children}
+     </div>
+   );
+ }

  // 复杂情况：有 extra 或 collapsible
  return (
    <div className={cardClasses.header}>
      <div className={cardClasses.headerContent}>
        {children}
      </div>
      {extra && <div className={cardClasses.headerExtra}>{extra}</div>}
      {collapsible && renderCollapseIcon()}
    </div>
  );
};
```

## 变更前后逻辑差异
- **变更前**：所有 Card.Header 都使用嵌套结构，className 在 headerContent 层
- **变更后**：没有 extra 和 collapsible 时使用扁平结构，className 直接在 header 层

## 逻辑影响范围
- 简单 Card.Header 的 className 能正确应用到 header 元素上
- DOM 结构更简洁，减少不必要的嵌套
- 复杂 Header（有 extra 或 collapsible）保持原有结构

## 升级注意事项

### 代码兼容性
- CSS 选择器 `.header .headerContent` 在简单 header 上失效

### 行为变化说明
- className 应用位置从内层变为 header 层
- DOM 结构简化可能影响依赖嵌套结构的布局