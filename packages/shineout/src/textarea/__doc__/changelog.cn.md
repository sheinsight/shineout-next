## 3.7.9-beta.1
2025-07-30

### 🐞 BugFix

- 修复 `Textarea` 在 flex 容器中使用时，可能存在的内部textarea元素与外部容器高度不一致的问题 (Regression: since v3.7.6) ([#1229](https://github.com/sheinsight/shineout-next/pull/1229))


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








