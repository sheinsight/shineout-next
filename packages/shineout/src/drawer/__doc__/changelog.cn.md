## 3.9.11-beta.6
2026-03-11

### 🐞 BugFix

- 修复 `Drawer` 在嵌套使用 `Modal` 时面板样式选择器匹配异常的问题 ([#1649](https://github.com/sheinsight/shineout-next/pull/1649))


## 3.9.1-beta.7
2025-11-28

### 🐞 BugFix

- 修复 `Drawer` 的 `cascade` 属性只对相同 position 方位的 Drawer 应用 transform 偏移 ([#1490](https://github.com/sheinsight/shineout-next/pull/1490))


## 3.9.0-beta.7
2025-10-20

### 🆕 Feature

- `Drawer` 新增 `cascade` 属性，多层嵌套时父级自动偏移避免被遮挡（仅 left/right 位置生效） ([#1419](https://github.com/sheinsight/shineout-next/pull/1419))


## 3.8.1-beta.1
2025-09-01

### 🐞 BugFix

- 修复 `Drawer` 设置了 `destroy` 属性后，html元素的overflow样式无法正常销毁的问题 (Regression: since v3.8.0) ([#1336](https://github.com/sheinsight/shineout-next/pull/1336))


## 3.0.5
2024-04-24

### 🐞 BugFix

- 修复 `Drawer` 没有默认支持内滚的问题 ([#393](https://github.com/sheinsight/shineout-next/pull/393))






