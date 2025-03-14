## 3.6.0-beta.26
2025-03-14

### 🐞 BugFix
- 修复 `Tooltip` 在滚动容器中的水平用法下，且不给定宽，在靠近窗口右侧时弹出层的宽度被非预期挤压，导致内容换行的问题 ([#997](https://github.com/sheinsight/shineout-next/pull/997))


## 3.5.3
2024-12-04

### 💎 Enhancement

- `Tooltip` 的 `persistent` 属性支持 `setConfig` 全局配置 ([#832](https://github.com/sheinsight/shineout-next/pull/832))

### 🆕 Feature

- `Tooltip` 新增 `persistent` 属性，鼠标悬停提示信息时将不会关闭 ([#813](https://github.com/sheinsight/shineout-next/pull/813))

## 3.3.6
2024-08-29

### 🐞 BugFix

- 修复 `Tooltip` 默认 `auto` 不生效、边界场景被遮挡的问题 ([#623](https://github.com/sheinsight/shineout-next/pull/623))
- 修复 `Tooltip` 在Chrome 128版本下，document.body设置了zoom时的定位问题 ([#622](https://github.com/sheinsight/shineout-next/pull/622))


## 3.3.0
2024-07-22

### 🐞 BugFix

- 修复 `Tooltip` delay 属性失效的问题 ([#575](https://github.com/sheinsight/shineout-next/pull/575))

## 3.1.26
2024-06-05

### 🐞 BugFix

- 修复 `Tooltip` 在边界情况下高频触发 hover 的问题 ([#503](https://github.com/sheinsight/shineout-next/pull/503))

## 3.1.14
2024-05-21

### 🐞 BugFix

- 修复 `Tooltip` 在某些场景下的箭头样式问题 ([#460](https://github.com/sheinsight/shineout-next/pull/460))


## 3.1.11
2024-05-16

### 🐞 BugFix

- 修复 `Tooltip` 设置`type = "light"` 的时候箭头样式问题([#454](https://github.com/sheinsight/shineout-next/pull/454))
