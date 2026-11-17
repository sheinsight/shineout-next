## 3.9.10-beta.3
2026-02-28
### 🆕 Feature
- `Textarea` 新增 `showClear` 属性，支持显示清除按钮 ([#1634](https://github.com/sheinsight/shineout-next/pull/1634))

## 3.9.8-beta.4
2026-01-19
### 🐞 BugFix
- 修复 `Textarea` 的 `clearable` 属性在禁用状态下仍然显示清除按钮的问题 ([#1586](https://github.com/sheinsight/shineout-next/pull/1586))


## 3.8.5-beta.4
2025-09-29

### 🐞 BugFix
- 修复 `Textarea` 的 `onEnterPress` 事件的第二参数ts类型错误问题 ([#1396](https://github.com/sheinsight/shineout-next/pull/1396))


## 3.8.4-beta.1
2025-09-22

### 🐞 BugFix

- 修复 `Textarea` 在 Safari 浏览器中使用 autosize 时，高度不正确的问题 (Regression: since v3.7.9) ([#1377](https://github.com/sheinsight/shineout-next/pull/1377))


## 3.7.9-beta.1
2025-07-30

### 🐞 BugFix

- 修复 `Textarea` 启动 autosize后输入内容后高度自动变高的问题 (Regression: since v3.7.6) ([#1229](https://github.com/sheinsight/shineout-next/pull/1229))


## 3.7.6-beta.1
2025-07-07

### 🐞 BugFix

- 修复 `Textarea` 在 flex 容器中使用时，可能存在的内部textarea元素与外部容器高度不一致的问题 ([#1229](https://github.com/sheinsight/shineout-next/pull/1229))


## 3.7.1-beta.7
2025-06-11

### 🐞 BugFix

- 修复 `Textarea` 的 `onBlur` 和 `onFocus` 事件的参数类型错误问题 ([#1161](https://github.com/sheinsight/shineout-next/pull/1161))


## 3.6.0
2025-03-17

### 🆕 Feature

- `Textarea` 新增 `limit` 属性，支持限制输入字符长度  ([#998](https://github.com/sheinsight/shineout-next/pull/998))
- `Textarea` 新增 `clearable` 属性，支持一键清除内容  ([#998](https://github.com/sheinsight/shineout-next/pull/998))


## 3.4.4
2024-10-28

### 💎 Enhancement

- `Textarea` 的 `info` 重构为Popover实现，支持`popoverProps`设置 ([#735](https://github.com/sheinsight/shineout-next/pull/735))


## 3.4.0
2024-09-19

### 🆕 Feature

- `Textarea` 的 `info` 属性新增配置模式，支持配置定位 ([#676](https://github.com/sheinsight/shineout-next/pull/676))


## 3.1.10
2024-05-15

### 🐞 BugFix

- 修复 `Textarea` 失去焦点的时候 info 没有隐藏的问题和 info 会被遮挡的问题 ([#448](https://github.com/sheinsight/shineout-next/pull/448))


## 3.0.10
2024-04-29

### 🐞 BugFix

- 修复 `Textarea` 设置 `autosize` 当容器默认`dispaly: none`时高度没有了 ([#404](https://github.com/sheinsight/shineout-next/pull/404))








