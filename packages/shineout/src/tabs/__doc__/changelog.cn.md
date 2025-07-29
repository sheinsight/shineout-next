## 3.8.0-beta.17
2025-07-22

### 🐞 BugFix
- 修复 `Tabs` 在外部容器设置了缩放后，下划线不居中对齐的问题 ([#1258](https://github.com/sheinsight/shineout-next/pull/1258))

## 3.7.0-beta.8
2025-04-21

### 🆕 Feature
- `Tabs` 新增 `renderTabsHeader` 属性，支持自定义渲染头部内容 ([#1075](https://github.com/sheinsight/shineout-next/pull/1075))

## 3.6.6-beta.1
2025-04-30

### 🐞 BugFix
- 修复 `Tabs.Panel` 设置 `background` 非预期的影响到shape为button和fill的样式（Regression: since v3.6.2） ([#1094](https://github.com/sheinsight/shineout-next/pull/1094))



## 3.6.2-beta.1
2025-03-31

### 🐞 BugFix
- 修复 `Tabs.Panel` 设置 `background` 属性失效的问题 ([#1028](https://github.com/sheinsight/shineout-next/pull/1028))

## 3.5.8
2025-02-13

### 🐞 BugFix
- 调整 `Tabs` 首次挂载布局更新方式 ([#945](https://github.com/sheinsight/shineout-next/pull/945))

## 3.5.5
2024-12-24

### 🐞 BugFix
- 修复 `Tabs.Panel` 设置动态属性后可能导致的 `Tabs.Header` 渲染顺序不正确的问题(Regression: since 3.5.3) ([#882](https://github.com/sheinsight/shineout-next/pull/882))
- 修复 `Tabs` 动态删除末尾的Tab时，TabsHeader没有正确的删除(Regression: since 3.5.3) ([#870](https://github.com/sheinsight/shineout-next/pull/870))


## 3.5.3
2024-12-04

### 🆕 Feature
- `Tabs` 新增 `allowNonPanel` 属性，开启后支持渲染非 `Tabs.Panel` 子组件，例如 `Form.FieldSet` ([#812](https://github.com/sheinsight/shineout-next/pull/812))


## 3.5.1
2024-11-14

### 🐞 BugFix

- 修复 `Tabs` 折叠用法下，折叠面板后Tabs.Panel内容溢出展示的问题 ([#794](https://github.com/sheinsight/shineout-next/pull/794))


## 3.4.3
2024-10-14

### 🐞 BugFix

- 修复 `Tabs` 页签内容异步变更后下划线长度异常的问题 ([#707](https://github.com/sheinsight/shineout-next/pull/707))

## 3.4.2
2024-09-29

### 🐞 BugFix

- 修复 `Tabs` 在 `shape='line'` 嵌套使用时的高亮下划线在某些情况下不显示的问题 ([#692](https://github.com/sheinsight/shineout-next/pull/692))


## 3.4.1
2024-09-20

### 🐞 BugFix

- 修复 `Tabs` 的card模式下的边框样式 ([#681](https://github.com/sheinsight/shineout-next/pull/681))

## 3.4.0
2024-09-19

### 🐞 BugFix

- 修复 `Tabs.Panel` 是异步的动态长度时，需要 resize 页面才会出现左右的滚动箭头 ([#668](https://github.com/sheinsight/shineout-next/pull/668))

## 3.3.7
2024-09-10

### 🐞 BugFix

- 修复 `Tabs` 在 `shape='button'` 风格下 ref 属性透传警告的问题 ([#657](https://github.com/sheinsight/shineout-next/pull/657))

## 3.3.5
2024-08-22

### 🐞 BugFix

- 修复 `Tabs` 下渲染非Tabs.Panel子组件时报错的问题

## 3.3.3
2024-08-07

### 🐞 BugFix

- 修复 `Tabs` 下的a标签在边缘区域无法点击的问题

## 3.3.3
2024-08-07

### 🐞 BugFix

- 修复 `Tabs` 下的a标签在边缘区域无法点击的问题

## 3.3.2
2024-07-29

### 🐞 BugFix

- 修复 `Tabs` 的line模式下的hr线段位置不是从最左边开始绘制的问题 ([#591](https://github.com/sheinsight/shineout-next/pull/591))

## 3.1.22
2024-05-31

### 🐞 BugFix

- 修复 `Tabs` 从可滚状态变为不可以滚动状态的时没有把偏移距离设置为 0 的问题  ([#493](https://github.com/sheinsight/shineout-next/pull/493))

## 3.1.20
2024-05-30
### 💅 Style

- 调整 `Tabs` 按钮和 tab 的间距 ([#489](https://github.com/sheinsight/shineout-next/pull/489)) 

## 3.0.2
2024-04-18

### 🆕 Feature

### 🐞 BugFix

- 优化 `Tabs` 初始隐藏后面再展示会无法出现滚动条的问题 ([#374](https://github.com/sheinsight/shineout-next/pull/374))

- 修复 `Tabs` 动态加载数据，当 `children = []` 时仍然会触发 `loader` 的问题 ([#366](https://github.com/sheinsight/shineout-next/pull/366))

### 💎 Enhancement

### 💅 Style

### 🆎 Type


## 3.0.1
2024-04-16

### 🐞 BugFix

- 修复 `Tabs` 内容超出后被隐藏的问题 ([#363](https://github.com/sheinsight/shineout-next/pull/363))






