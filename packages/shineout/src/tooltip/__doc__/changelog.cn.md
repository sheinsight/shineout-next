## 3.9.6-beta.1
2025-12-30
### 💎 Enhancement
- 增强 `Tooltip` 与 `Switch`、`Radio`、`Checkbox` 的兼容性 ([#1553](https://github.com/sheinsight/shineout-next/pull/1553))


## 3.9.2-beta.3
2025-12-03

### 🐞 BugFix
- 修复 `Tooltip` 在快速 hover 多个组件时可能出现不消失的问题 ([#1496](https://github.com/sheinsight/shineout-next/pull/1496))

## 3.8.6-beta.2
2025-10-10

### 💎 Enhancement
- 优化 `Tooltip` 在设置了非 `auto` 位置时的滚动跟随行为，提升用户体验 ([#1401](https://github.com/sheinsight/shineout-next/pull/1401))


## 3.8.5-beta.2
2025-09-28

### 🐞 BugFix
- 修复 `Tooltip` 存在动态属性时报"Rendered fewer hooks than expected" 错误 (Regression: since 3.8.4) ([#1390](https://github.com/sheinsight/shineout-next/pull/1390))


## 3.8.4-beta.8
2025-09-25

### 🐞 BugFix
- 修复 `Tooltip` 在 `persistent` 模式下 children 的 `onMouseEnter`、`onMouseLeave`、`onClick` 事件会触发两次的问题 ([#1386](https://github.com/sheinsight/shineout-next/pull/1386))


## 3.8.1-beta.8
2025-09-05

### 🆕 Feature
- `Tooltip` 新增 `mouseLeaveDelay` 属性，用于设置鼠标移出后延迟隐藏组件，单位为毫秒 ([#1348](https://github.com/sheinsight/shineout-next/pull/1348))


## 3.8.0-beta.46
2025-08-04

### 🐞 BugFix
- 修复 `Tooltip` 关闭后，外部意外的移除了组件样式后暴露出来的问题 ([#1323](https://github.com/sheinsight/shineout-next/pull/1323))


## 3.8.0-beta.2
2025-06-13

### 💎 Enhancement
- 优化 `Tooltip` 的弹出动画，增加缩放效果 ([#1173](https://github.com/sheinsight/shineout-next/pull/1173))


## 3.8.0-beta.1
2025-06-11

### 🆕 Feature
- `Tooltip` 新增 `popupGap` 属性，用于设置弹出层与目标元素的间距 ([#1162](https://github.com/sheinsight/shineout-next/pull/1162))


## 3.7.5-beta.1
2025-07-02

### 🐞 BugFix
- 修复 `Tooltip` 在 `Dropdown` 中使用时，'soui-dropdown-item' 的 className 被传递到 `Tooltip` 的问题 ([#1216](https://github.com/sheinsight/shineout-next/pull/1216))


## 3.6.4-beta.5
2025-04-17

### 💎 Enhancement
- 优化 `Tooltip` 在窗口resize和父容器滚动后依然能跟随目标 ([#1069](https://github.com/sheinsight/shineout-next/pull/1069))


## 3.6.1-beta.7
2025-03-27

### 🐞 BugFix
- 修复 `Tooltip` 的 `persistent` 配置优先级问题，使其优先于全局配置并符合就近原则 ([#1020](https://github.com/sheinsight/shineout-next/pull/1020))


### 💎 Enhancement
- 优化 `Tooltip` 的箭头，使其在内容动态修改后位置保持正确 ([#1019](https://github.com/sheinsight/shineout-next/pull/1019))


## 3.6.0
2025-03-17

### 🆕 Feature
- `Tooltip` 新增 `showArrow` 属性，用于控制是否显示箭头 ([#998](https://github.com/sheinsight/shineout-next/pull/998))


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
