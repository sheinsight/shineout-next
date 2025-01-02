## 3.5.6-beta.11
2025-01-02

### 🐞 BugFix
- 修复 `Popover` 组件在 `position='left'` 模式下三角箭头和 trigger 元素之间的垫片元素不生效的问题 ([#906](https://github.com/sheinsight/shineout-next/pull/906))

## 3.5.5
2024-12-24

### 🐞 BugFix
- 修复 `Popover` 组件受控为 true 但不在视口范围内时无法展示的问题 ([#880](https://github.com/sheinsight/shineout-next/pull/880))

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
- 修复 `Popover` 组件 children 点击事件冒泡外层的问题 ([#654](https://github.com/sheinsight/shineout-next/pull/654))

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






