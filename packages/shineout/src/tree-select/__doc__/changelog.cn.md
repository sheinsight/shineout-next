## 3.1.24
2024-06-03
### 🐞 BugFix

- 修复  `TreeSelect`  异步加载数据时，选中结果没有更新的问题 ([#496](https://github.com/sheinsight/shineout-next/pull/496))


## 3.1.18
2024-05-27

### 💅 Style

- 优化 `TreeSelect` 合并选项的样式 ([#482](https://github.com/sheinsight/shineout-next/pull/482))

## 3.1.17
2024-05-24

### 🐞 BugFix

- 修复 `TreeSelect` 属性  `compressed` 无效的问题 ([#477](https://github.com/sheinsight/shineout-next/pull/477))

## 3.1.9
2024-05-14

### 🐞 BugFix

- 修复 `TreeSelect` 在单选的情况下会返回数组的问题 ([#440](https://github.com/sheinsight/shineout-next/pull/440))

- 修复 `TreeSelect` 单选后节点没有高亮的问题  ([#439](https://github.com/sheinsight/shineout-next/pull/439))


## 3.1.7
2024-05-11

### 🐞 BugFix

- 修复 `TreeSelect` 单选后节点没有高亮的问题 ([#439](https://github.com/sheinsight/shineout-next/pull/439))

## 3.1.6
2024-05-11

### 🐞 BugFix

- 修复 `TreeSelect` 本地筛选的时候防抖没有生效导致频繁渲染的问题 ([#428](https://github.com/sheinsight/shineout-next/pull/428))

## 3.1.0
2024-05-09

### 🆕 Feature
- `TreeSelect` 属性 `loader` 支持返回 Promise 来关闭加载状态 ([#417](https://github.com/sheinsight/shineout-next/pull/417))


## 3.0.11
2024-05-08

### 🐞 BugFix

- 修复 `TreeSelect` 在多选模式下，进行过滤后选择新项会导致原有选择项被覆盖的问题 ([#411](https://github.com/sheinsight/shineout-next/pull/411))
- 修复 `TreeSelect` 组件在渲染未匹配数据时可能出现的数据重复和无法删除的问题 ([#412](https://github.com/sheinsight/shineout-next/pull/412))



## 3.0.9
2024-04-26

### 🐞 BugFix

- 修复 `TreeSelect` 合并选项功能当数据动态变化或者宽度变化时没有动态更新的问题 ([#402](https://github.com/sheinsight/shineout-next/pull/402))

## 3.0.8
2024-04-26

### 🐞 BugFix

- 修复 `TreeSelect` noCache 属性无效的问题 ([#398](https://github.com/sheinsight/shineout-next/pull/398))

## 3.0.5
2024-04-24

### 🐞 BugFix

- 修复 `TreeSelect` 当清空输入框文本时会展示上次筛选内容的问题 ([#391](https://github.com/sheinsight/shineout-next/pull/391))

## 3.0.3
2024-04-22

### 🐞 BugFix

- 修复 `TreeSelect` 在多选场景下点击下拉输入框无法自动聚焦的问题 ([#380](https://github.com/sheinsight/shineout-next/pull/380))
- 修复 `TreeSelect` 在失去焦点时筛选文本清空存在延迟的问题 ([#380](https://github.com/sheinsight/shineout-next/pull/380))
- 修复 `TreeSelect` 当 `renderItem` 返回 ReactElement 时，输入框可能会展示 `[object Object]` 的问题 ([#379](https://github.com/sheinsight/shineout-next/pull/379))
