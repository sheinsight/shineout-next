## 3.5.7-beta.1
2025-01-06

### 🐞 BugFix
- 修复 `Select` 单选模式下设置了value为数组类型，此时开启 `onFilter` 后组件渲染报错的问题 ([#910](https://github.com/sheinsight/shineout-next/pull/910))


## 3.5.6
2025-01-06

### 🐞 BugFix
- 修复 `Select` 多选模式下，开启 `onFilter` 后且使用 `open` 做面板受控打开时，自动聚焦失效的问题 ([#891](https://github.com/sheinsight/shineout-next/pull/891))

## 3.5.2
2024-11-28

### 🐞 BugFix

- 修复 `Select` 开启 `filterSameChange` 后单选模式下选择重复项无法关闭面板的问题 ([#819](https://github.com/sheinsight/shineout-next/pull/819))
- 修复 `Select` 默认事件引起的点击异常问题(Regression: since v3.4.4) ([#810](https://github.com/sheinsight/shineout-next/pull/810))
- 修复 `Select` 开启创建选项后无法选中创建内容的问题(Regression: since v3.4.4) ([#807](https://github.com/sheinsight/shineout-next/pull/807))
- 修复 `Select` 组件在开启 `absolute` 属性后，多选模式下选择内容换行后面板位置不更新的问题 ([#804](https://github.com/sheinsight/shineout-next/pull/804))

## 3.5.0
2024-11-11

### 💎 Enhancement

- 优化 `Select` 组件默认 `placeholder` 占位形式 ([#788](https://github.com/sheinsight/shineout-next/pull/788))

## 3.4.7
2024-11-08

### 🐞 BugFix

- 修复 `Select` 在 value 为空对象时 placeholder 失效的问题 ([#783](https://github.com/sheinsight/shineout-next/pull/783))

## 3.4.6
2024-11-05

### 🐞 BugFix

- 修复 `Select` 禁用模式下 icon 样式异常的问题 ([#778](https://github.com/sheinsight/shineout-next/pull/778))

## 3.4.5
2024-10-30

### 🐞 BugFix
- 修复 `Select` 动态的从单选切换为多选时，placeholder内容显示不完整的问题 ([#769](https://github.com/sheinsight/shineout-next/pull/769))


## 3.4.4
2024-10-28

### 🐞 BugFix
- 修复 `Select` 动态的从单选切换为多选时，placeholder内容显示不完整的问题 ([#769](https://github.com/sheinsight/shineout-next/pull/769))
- 修复 `Select` 选中值之后再次聚焦时的回显值显示不正确的问题 ([#748](https://github.com/sheinsight/shineout-next/pull/748))
- 修复 `Select` 单选场景下开启搜索后，焦点输入框时没有自动选中文本的问题 ([#737](https://github.com/sheinsight/shineout-next/pull/737))
- 修复 `Select` 组件无法拖拽选中 dom 内容的问题 ([#729](https://github.com/sheinsight/shineout-next/pull/729))

## 3.4.3
2024-10-14

### 🐞 BugFix
- 修复 `Select` 开启absolute和multiple之后，下拉框较长选项的文字与勾选图标重叠的问题 ([#703](https://github.com/sheinsight/shineout-next/pull/703))

## 3.4.2
2024-09-29

### 🐞 BugFix
- 修复 `Select` 组件 `columns` 只有 1 列情况下列表宽度不自动撑满的问题 ([#686](https://github.com/sheinsight/shineout-next/pull/686))

## 3.4.0
2024-09-19

### 🆕 Feature
- `Select` 组件支持动态虚拟列表行高([#646](https://github.com/sheinsight/shineout-next/pull/646))
- `Select` 组件新增 `onLoadMore` 属性，支持滚动加载 ([#610](https://github.com/sheinsight/shineout-next/pull/594))
- `Select` 组件新增 `threshold` 属性，支持设置滚动加载阈值 ([#610](https://github.com/sheinsight/shineout-next/pull/594))
- `Select` 组件新增 `trigger` 属性，支持更改展开下拉面板的触发方式 ([#610](https://github.com/sheinsight/shineout-next/pull/594))

### 💎 Enhancement
- 优化 `Select` 组件在同时使用 `emptyText` 和 `renderOptionList` 时的渲染顺序([#627](https://github.com/sheinsight/shineout-next/pull/627))

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







