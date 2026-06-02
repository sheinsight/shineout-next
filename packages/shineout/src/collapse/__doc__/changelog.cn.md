## 3.9.16-beta.2
2026-06-02

### 🆕 Feature
- `Collapse.Item` 新增 `simple` 属性，开启后移除内容区域的上下内边距和背景色 ([#1724](https://github.com/sheinsight/shineout-next/pull/1724))


## 3.9.16-beta.1
2026-06-02

### 🐞 BugFix
- 修复 `Collapse` 设置 `expandIconPosition` 为 `left` 或 `right` 时，内容区域左右内边距未随图标位置正确调整的问题 ([#1723](https://github.com/sheinsight/shineout-next/pull/1723))


## 3.6.0
2025-02-13

### 🆕 Feature
- `Collapse` 新增 `animation` 属性，支持关闭折叠动画 ([#953](https://github.com/sheinsight/shineout-next/pull/953))


### 🚀 Performance

- 优化 `Collapse` 初始化动画，在组件首次挂载后不会触发动画效果，挂载结束后正常添加折叠动画 ([#953](https://github.com/sheinsight/shineout-next/pull/953))

