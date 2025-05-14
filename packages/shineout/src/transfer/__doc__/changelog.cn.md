## 3.6.5-beta.11
2025-04-29

### 🐞 BugFix

- 修复 `Transfer` 自定义children时左右勾选互斥的问题，并修正children的 `onSelect` TS类型 ([#1089](https://github.com/sheinsight/shineout-next/pull/1089))


## 3.6.2-beta.6
2025-04-02

### 🐞 BugFix

- 修复 `Transfer` 动态设置 `loading` 不生效的问题 ([#1035](https://github.com/sheinsight/shineout-next/pull/1035))

## 3.6.1-beta.1
2025-03-24

### 🐞 BugFix

- 修复 `Transfer` 设置了 `renderFilter` 之后可能导致左右面板高度不一致的问题 ([#1008](https://github.com/sheinsight/shineout-next/pull/1008))

## 3.5.8
2025-02-13

### 🐞 BugFix

- 修复 `Transfer` 的 `renderFilter` 内部获取不到外部数据的问题 ([#932](https://github.com/sheinsight/shineout-next/pull/932))
- 修复 `Transfer` 的 `filterProps` 中 `isSrouce` 错别字为 `isSource` 的问题 ([#932](https://github.com/sheinsight/shineout-next/pull/932))

## 3.3.7
2024-09-09

### 🐞 BugFix

- 修复 `Transfer` 的 `onSelectChange` 第二参数丢失的问题 ([#652](https://github.com/sheinsight/shineout-next/pull/652))


## 3.1.19
2024-05-29

### 🆕 Feature

- 新增 `equalPanelWidth` 属性，支持根据容器宽度均等分配面板宽度 ([#613](https://github.com/sheinsight/shineout-next/pull/613))

### 💎 Enhancement

- 优化勾选项的容器宽度，默认占满整行，超出后自动省略文案内容 ([#613](https://github.com/sheinsight/shineout-next/pull/613))

## 3.1.19
2024-05-29

### 🆕 Feature

- 新增 `equalPanelWidth` 属性，支持根据容器宽度均等分配面板宽度 ([#613](https://github.com/sheinsight/shineout-next/pull/613))

### 💎 Enhancement

- 优化勾选项的容器宽度，默认占满整行，超出后自动省略文案内容 ([#613](https://github.com/sheinsight/shineout-next/pull/613))

## 3.1.19
2024-05-29

### 🐞 BugFix

- 修复 `Transfer` 自定义渲染参数 `selectKeys` 为空问题 ([#484](https://github.com/sheinsight/shineout-next/pull/484))
- 修复 `Transfer` 自定义渲染时 `listHeight` 和 `listClassName` 失效问题 ([#484](https://github.com/sheinsight/shineout-next/pull/484))
