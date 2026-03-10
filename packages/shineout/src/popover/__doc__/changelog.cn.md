## 3.9.11-beta.3
2026-03-10
### 🐞 BugFix
- 修复 `Popover` 设置 `disabled` 属性时在 React 17 下报错的问题 ([#1647](https://github.com/sheinsight/shineout-next/pull/1647))


## 3.9.9-beta.2
2026-01-27
### 🆕 Feature
 - `Popover` 新增全局配置项 `animation`，用于配置是否启用弹出动画效果 ([#1607](https://github.com/sheinsight/shineout-next/pull/1607))


## 3.8.4-beta.7
2025-09-25

### 🐞 BugFix
- 修复 `Popover` 的 `position` 为水平方向时设置 `adjust` 属性后没有自动调整位置的问题 [#1385](https://github.com/sheinsight/shineout-next/pull/1385)）


## 3.8.0-beta.23
2025-08-04

### 🐞 BugFix
- 修复 `Popover` 关闭后，外部意外的移除了组件样式后，弹出层暴露出来的问题 ([#1289](https://github.com/sheinsight/shineout-next/pull/1289))


## 3.8.0-beta.2
2025-04-01

### 💎 Enhancement

- 增加 `Popover` 的弹出动画效果 ([#1173](https://github.com/sheinsight/shineout-next/pull/1173))


## 3.7.11-beta.4
2025-08-28

### 🐞 BugFix
- 修复 `Popover` 的 `defaultVisible` 属性不生效的问题 ([#1328](https://github.com/sheinsight/shineout-next/pull/1328))


## 3.7.9-beta.6
2025-08-04

### 🐞 BugFix
- 修复 `Popover` 当 `children` 为函数时，在组件挂载时就执行，表现与老版本不一致的问题 ([#1288](https://github.com/sheinsight/shineout-next/pull/1288))


## 3.7.7-beta.4
2025-07-16

### 🐞 BugFix
- 修复 `Popover` 嵌套使用时，父子的position不相同时，子元素的箭头位置不正确的问题 ([#1247](https://github.com/sheinsight/shineout-next/pull/1247))


## 3.7.4-beta.2
2025-06-24

### 🚀 Performance
- 优化 `Popover` 初始化性能，移除mount时多余的DOM样式计算 ([#1200](https://github.com/sheinsight/shineout-next/pull/1200))


## 3.7.0-beta.1
2025-04-01

### 🆕 Feature
- `Popover` 新增 `disabled` 属性，是否禁用 ([#1032](https://github.com/sheinsight/shineout-next/pull/1032))


## 3.6.7-beta.1
2025-05-14

### 🐞 BugFix
- 修复 `Popover` 嵌套场景下关闭顺序不正确的问题 ([#1111](https://github.com/sheinsight/shineout-next/pull/1111))


## 3.6.4-beta.5
2025-04-17

### 💎 Enhancement
- 优化 `Popover` 在窗口resize和父容器滚动后依然能跟随目标 ([#1069](https://github.com/sheinsight/shineout-next/pull/1069))


## 3.6.1-beta.7
2025-03-26

### 💎 Enhancement
- 优化 `Popover` 的 `adjust` 属性，支持弹出层位置实时跟随父元素尺寸变化 ([#1018](https://github.com/sheinsight/shineout-next/pull/1018))


## 3.6.0
2025-03-21

### 🆕 Feature
- `Popover` 新增 `offset` 属性，设置弹出层宽度或高度的附加值，增加或减少宽度或高度 ([#965](https://github.com/sheinsight/shineout-next/pull/965))
- `Popover` 新增 `popupGap` 属性，设置弹出层与触发元素的间距 ([#965](https://github.com/sheinsight/shineout-next/pull/965))


### 🐞 BugFix
- 修复 `Popover` 在滚动容器中的水平用法下，且不给定宽，在靠近窗口右侧时弹出层的宽度被非预期挤压，导致内容换行的问题 ([#997](https://github.com/sheinsight/shineout-next/pull/997))


## 3.5.6
2025-01-06

### 🐞 BugFix
- 修复 `Popover` 在 `position='left'` 模式下三角箭头和 trigger 元素之间的垫片元素不生效的问题 ([#906](https://github.com/sheinsight/shineout-next/pull/906))


## 3.5.5
2024-12-24

### 🐞 BugFix
- 修复 `Popover` 受控为 true 但不在视口范围内时无法展示的问题 ([#880](https://github.com/sheinsight/shineout-next/pull/880))


## 3.4.4
2024-10-28

### 🐞 BugFix
- 修复 `Popover.Confirm` 的弹出容器的宽度在Table中有可能显示较窄的问题 ([#736](https://github.com/sheinsight/shineout-next/pull/736))
- 修复 `Popover` 在横滚的Table中有可能弹出位置不准确的问题 ([#741](https://github.com/sheinsight/shineout-next/pull/741))


## 3.4.3
2024-10-14

### 🐞 BugFix
- 修复 `Popover` 在滚动容器中的极限边界场景下不可见的问题 ([#702](https://github.com/sheinsight/shineout-next/pull/702))


## 3.3.7
2024-09-09

### 🐞 BugFix
- 修复 `Popover` 的 children 点击事件冒泡外层的问题 ([#654](https://github.com/sheinsight/shineout-next/pull/654))


## 3.2.2
2024-06-21

### 🐞 BugFix
- 修复 `Popover` 中元素 `autoFocus` 会导致页面滚动的问题 ([#535](https://github.com/sheinsight/shineout-next/pull/535))


## 3.2.0
2024-06-14


### 💅 Style

- `Popover` 优化隐藏箭头后弹层距离触发器的高度 ([#502](https://github.com/sheinsight/shineout-next/pull/502))


## 3.1.28
2024-06-07

### 🐞 BugFix

- 修复 `Popover` 卸载后没有清理掉全局事件的问题([#513](https://github.com/sheinsight/shineout-next/pull/513))


## 3.1.18
2024-05-27

### 🐞 BugFix

- 修复 `Popover.Confirm` 当 `ok` 和 `onCancel` 返回 `Promise` 没有处理 `.catch` 问题([#479](https://github.com/sheinsight/shineout-next/pull/479))






