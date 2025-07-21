# Alert 组件 3.2.5 版本 Diff 报告

## 问题描述
修复 Steps Alert 在 Safari 下样式异常的问题

## 代码变更文件
`packages/shineout-style/src/alert/alert.ts`

## 变更代码行
```diff
// close 样式部分
close: {
+ '& svg': {
+   width: '100%',
+ },
},

// icon 样式部分
icon: {
+ '& svg': {
+   width: '100%',
+ },
},
```

## 变更前后逻辑差异
- **变更前**：SVG 图标没有明确宽度，在 Safari 中可能出现尺寸异常
- **变更后**：为 close 和 icon 内的 SVG 元素添加 `width: 100%`，使其继承父容器宽度

## 逻辑影响范围
- Safari 浏览器下 Alert 的关闭按钮和状态图标正常显示
- 其他浏览器保持原有表现
- 只影响 Alert 组件内部的 SVG，不影响全局样式

## 风险使用场景

### 代码执行风险
- 无直接代码执行风险

### 交互体验差异
- 自定义 SVG 图标的尺寸可能被 width: 100% 影响
- 非正方形 SVG 图标可能出现拉伸变形