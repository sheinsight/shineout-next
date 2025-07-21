# Alert 组件 3.1.31 版本 Diff 报告

## 问题描述
优化 Alert 组件的单词换行样式

## 代码变更文件
`packages/shineout-style/src/alert/alert.ts`

## 变更代码行
```diff
content: {
  flex: '1 1 0',
+ wordBreak: 'break-all',
},
```

## 变更前后逻辑差异
- **变更前**：长单词或连续字符串可能溢出 Alert 容器
- **变更后**：添加 `word-break: break-all`，允许在任意字符位置断行，确保内容不溢出

## 逻辑影响范围
- 影响所有 Alert 组件的内容区域文本换行
- 长 URL、文件路径、错误码等超长文本会被强制换行
- 在小屏幕设备上表现更好

## 风险使用场景
- 单词可能在非自然位置断开，影响可读性
- 技术术语、代码、ID 等被断开可能影响理解
- 如需保持完整性，建议使用 `<code>` 标签包裹