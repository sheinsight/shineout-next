# Card 组件 3.1.16 版本 Diff 报告

## 问题描述
修复 `Card.Header` 的 `simple` 模式下 `align` 不生效问题

## 代码变更文件
- `packages/base/src/card/card-header.tsx`
- `packages/shineout-style/src/card/card.ts`

## 变更代码行
```diff
// card-header.tsx
if (isSimple) {
  return (
    <div 
-     className={classNames(cardClasses.simpleHeader, className)}
+     className={classNames(
+       cardClasses.simpleHeader, 
+       className,
+       align === 'left' && cardClasses.headerLeft,
+       align === 'center' && cardClasses.headerCenter,
+       align === 'right' && cardClasses.headerRight,
+     )}
      style={style}
    >
      {children}
    </div>
  );
}

// card.ts
simpleHeader: {
+ display: 'block',
},
```

## 变更前后逻辑差异
- **变更前**：simple 模式下只应用 simpleHeader 和 className，不包含 align 相关样式类
- **变更后**：根据 align 属性值添加对应的对齐样式类，并为 simpleHeader 添加 display: block

## 逻辑影响范围
- simple 模式下的 Card.Header 支持 align="left"|"center"|"right" 对齐
- 不影响普通模式的 Card.Header
- 不影响其他属性如 extra、size 等

## 升级注意事项

### 代码兼容性
- 无直接代码执行风险

### 行为变化说明
- simple 模式下 align 属性从不生效变为生效
- display: block 可能影响自定义布局