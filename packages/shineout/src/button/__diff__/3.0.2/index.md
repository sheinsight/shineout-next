# Button 组件 3.0.2 版本 Diff 报告

## 问题描述
调整 `Button` 的 `shape='square'` 和 `shape='circle'` 两种风格下的样式，去除内边距

## 代码变更文件
`packages/shineout-style/src/button/button.ts`

## 变更代码行
```diff
// circle 形状样式
circle: {
  borderRadius: '50%',
+ padding: 0,
},

// square 形状样式  
square: {
  borderRadius: token.buttonBorderRadiusSquare,
+ padding: 0,
},
```

## 变更前后逻辑差异
- **变更前**：circle 和 square 形状的按钮有默认内边距
- **变更后**：为这两种形状添加 `padding: 0`，去除内边距，使内容紧贴边界

## 逻辑影响范围
- 圆形和方形按钮的尺寸由内容和 size 属性直接决定
- 适合单图标或单字符按钮，如关闭按钮、数字按钮
- 工具栏、计算器等场景的按钮布局更紧凑

## 升级注意事项

### 代码兼容性
- 无直接代码执行风险

### 行为变化说明
- 按钮尺寸变小（去除内边距），可能影响布局
- 长文本在 circle/square 按钮中可能溢出或显示不全