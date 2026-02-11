## 3.9.9-beta.15
2026-02-11
### 🆕 Feature
- `Radio` 新增 `verticalAlign` 属性：支持指示器和文字的顶对齐 ([#1628](https://github.com/sheinsight/shineout-next/pull/1628))


## 3.9.4-beta.8
2025-12-18
### 🆕 Feature
- `Radio` 和 `Radio.Group` 新增 `renderWrapper` 属性：完全的自定义渲染 ([#1537](https://github.com/sheinsight/shineout-next/pull/1537))


## 3.8.0-beta.37
2025-08-18
### 🐞 BugFix
- 修复 `Radio.Group` 设置的函数式 `disabled` 导致的子Radio组件(非推荐用法)都被禁用的问题 ([#1314](https://github.com/sheinsight/shineout-next/pull/1314))


## 3.7.9-beta.8
2025-08-06
### 🐞 BugFix
- 修复 `Radio.Group` 在嵌套使用时，内层 `Radio.Group` 的勾选状态不符合预期的问题 ([#1291](https://github.com/sheinsight/shineout-next/pull/1291))


## 3.7.0-beta.36
2025-05-29
### 🐞 BugFix
- 修复 `Radio.Group` 在文案过长情况下小圆点选择器样式被挤压异常的问题  ([#1135](https://github.com/sheinsight/shineout-next/pull/1135))


## 3.5.6
2025-01-06
### 🐞 BugFix
- 修复 `Radio.Group` 传 data 属性用法下，设置 `size` 属性不生效的问题 ([#893](https://github.com/sheinsight/shineout-next/pull/893))


## 3.4.4
2024-10-28
### 🐞 BugFix
- 修复 `Radio.Group` 在 React 18.3.0 以上版本中报 defaultProps 告警的问题 ([#725](https://github.com/sheinsight/shineout-next/pull/725))
