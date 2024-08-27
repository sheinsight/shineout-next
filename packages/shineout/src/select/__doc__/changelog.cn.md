## 3.3.4
2024-08-21

### 🆕 Feature
- 支持 `Select` 的树形数据展开时，弹出层的位置自适应([#614](https://github.com/sheinsight/shineout-next/pull/614))

### 🐞 BugFix
- 修复 `Select` 的树形数据展开时，设置的autoAdapt(下拉列表宽度根据内容自由展开)不生效的问题([#614](https://github.com/sheinsight/shineout-next/pull/614))


## 3.3.3
2024-08-15

### 🆕 Feature
- 支持 `Select` 单选搜索时，展示非string类型的值(renderItem返回的结果) ([#605](https://github.com/sheinsight/shineout-next/pull/605))
## 3.4.0-beta.1
2024-08-20

### 🆕 Feature

- 新增 `onLoadMore` 属性，支持滚动加载 ([#610](https://github.com/sheinsight/shineout-next/pull/594))
- 新增 `threshold` 属性，支持设置滚动加载阈值 ([#610](https://github.com/sheinsight/shineout-next/pull/594))
- 新增 `trigger` 属性，支持更改展开下拉面板的触发方式 ([#610](https://github.com/sheinsight/shineout-next/pull/594))

## 3.3.3
2024-08-15

### 🆕 Feature
- 支持 `Select` 单选搜索时，展示非string类型的值(renderItem返回的结果) ([#605](https://github.com/sheinsight/shineout-next/pull/605))

### 🐞 BugFix

- 修复 `Select` 选中项最终为假值时渲染异常的问题 ([#594](https://github.com/sheinsight/shineout-next/pull/594))

## 3.2.4
2024-06-26

### 🐞 Style

- 优化 `Select` 单选结果的样式 ([#549](https://github.com/sheinsight/shineout-next/pull/549))

## 3.1.27
2024-06-06

### 🐞 BugFix

- 修复 `Select` 禁用后筛选框仍然可以输入的问题 ([#509](https://github.com/sheinsight/shineout-next/pull/509))

- 修复 `Select` 合并选项个数计显示错误的问题  ([#508](https://github.com/sheinsight/shineout-next/pull/508))

## 3.1.26
2024-06-05

### 🐞 BugFix

- 修复 `Select` 渲染的 `result` 为空可能会导致页面报错的问题 ([#503](https://github.com/sheinsight/shineout-next/pull/503))

## 3.1.18
2024-05-27

### 💅 Style

- 优化 `Select` 合并选项的样式 ([#481](https://github.com/sheinsight/shineout-next/pull/481))

## 3.1.17
2024-05-24

### 🐞 BugFix

- 修复 `Select` 属性 `compressed` 无效的问题 ([#477](https://github.com/sheinsight/shineout-next/pull/477))

## 3.1.15
2024-05-23

### 🐞 BugFix

- 修复 `Select` 在某些场景下弹出层会被遮挡的问题 ([#467](https://github.com/sheinsight/shineout-next/pull/467))



## 3.1.10
2024-05-15

### 🐞 BugFix

- 修复 `Select` 选项文字过长没有截断并且出现滚动条的问题 ([#445](https://github.com/sheinsight/shineout-next/pull/445))

## 3.0.11
2024-05-08

### 🐞 BugFix

- 修复 `Select` 组件在渲染未匹配数据时可能出现的数据重复和无法删除的问题 ([#412](https://github.com/sheinsight/shineout-next/pull/412))

## 3.0.10
2024-05-06

### 🐞 BugFix

- 修复 `Select` 选项禁用后仍然可以点击取消的问题 ([#408](https://github.com/sheinsight/shineout-next/pull/408))
- 修复 `Select` 创建选项功能，当输入框失去焦点的时候没有创建的问题 ([#408](https://github.com/sheinsight/shineout-next/pull/408))

## 3.0.9
2024-04-26

### 🐞 BugFix

- 修复 `Select` 设置 `onCreate = true` 无法输入的问题 ([#402](https://github.com/sheinsight/shineout-next/pull/402))
- 修复 `Select` 合并选项功能当数据动态变化或者宽度变化时没有动态更新的问题  ([#402](https://github.com/sheinsight/shineout-next/pull/402))



## 3.0.8
2024-04-26

### 🐞 BugFix

- 修复 `Select` noCache 属性无效的问题 ([#398](https://github.com/sheinsight/shineout-next/pull/398))

## 3.0.5
2024-04-24

### 🐞 BugFix

- 修复 `Select` 当清空输入框文本时会展示上次筛选内容的问题 ([#391](https://github.com/sheinsight/shineout-next/pull/391))


## 3.0.3
2024-04-22

### 🐞 BugFix

- 修复 `Select` 在多选场景下点击下拉输入框无法自动聚焦的问题  ([#379](https://github.com/sheinsight/shineout-next/pull/379))
- 修复 `Select` 在失去焦点时筛选文本清空存在延迟的问题  ([#379](https://github.com/sheinsight/shineout-next/pull/379))
- 修复 `Select` 当 `renderItem` 返回 ReactElement 时，输入框可能会展示 `[object Object]` 的问题  ([#379](https://github.com/sheinsight/shineout-next/pull/379))







