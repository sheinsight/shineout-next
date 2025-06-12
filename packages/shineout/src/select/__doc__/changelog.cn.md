## 3.7.2-beta.2
2025-06-11

### 💅 Style
- 优化框类组件小尺寸字号下 `innerTitle` 的样式表现 ([#1169](https://github.com/sheinsight/shineout-next/pull/1169))

## 3.7.1-beta.9
2025-06-11

### 🐞 BugFix
- 修复 `Select` 在 `Drawer` 中使用并且开启了compressed属性后，点击compressed弹出层中的删除第二次无效的问题 ([#1164](https://github.com/sheinsight/shineout-next/pull/1164))

## 3.7.1-beta.5
2025-06-10

### 🐞 BugFix
- 修复 `Select` 同时设置了 `absolute` 和 `optionWidth` 属性后，弹出层在右侧溢出时位置不自动调整的问题 ([#1159](https://github.com/sheinsight/shineout-next/pull/1159))

## 3.7.1-beta.4
2025-06-09

### 🐞 BugFix
- 修复 `Select` 的下拉框是动态高度时，弹出层位置不自动调整的问题 ([#1157](https://github.com/sheinsight/shineout-next/pull/1157))


## 3.7.1-beta.1
2025-06-05

### 🐞 BugFix
- 修复 `Select` 设置了 `absolute` 用法下，在某些位置打开下拉框时有多余的过渡动画问题 ([#1154](https://github.com/sheinsight/shineout-next/pull/1154))


## 3.7.0-beta.31
2025-05-27

### 🆕 Feature
- `Select` 新增 `highlight` 属性，开启搜索关键字高亮功能 ([#1126](https://github.com/sheinsight/shineout-next/pull/1126))


## 3.7.0-beta.18
2025-05-07

### 🆕 Feature
- `Select` 新增 `renderCompressed` 属性，支持自定义渲染合并内容 ([#1099](https://github.com/sheinsight/shineout-next/pull/1099))

## 3.6.6-beta.4
2025-05-09

### 🐞 BugFix
- 修复 `Select`结果框高度不继承的问题  ([#1105](https://github.com/sheinsight/shineout-next/pull/1105))

## 3.6.6-beta.3
2025-05-07

### 💎 Enhancement
- `Select` 增强 `compressed` 属性，新增 `hide-popover` 模式隐藏合并后的选项，仅展示合并数量 ([#1098](https://github.com/sheinsight/shineout-next/pull/1098))

## 3.6.5-beta.1
2025-04-23

### 🐞 BugFix
- 修复 `Select` 在 `Popover` 中使用并且开启了compressed属性后，点击compressed弹出层中的删除条目时会引起样式异常的问题 ([#1079](https://github.com/sheinsight/shineout-next/pull/1079))

## 3.6.4-beta.3
2025-04-16

### 🐞 BugFix
- 修复 `Select` 开启过滤后打开面板快速再次聚焦时可能清空输入框文本内容的问题 ([#1064](https://github.com/sheinsight/shineout-next/pull/1064))

## 3.6.4-beta.2
2025-04-16

### 🐞 BugFix
- 修复 `Select` 搜索内容后选项被遮挡的问题 ([#1066](https://github.com/sheinsight/shineout-next/pull/1066))

## 3.6.2-beta.4
2025-04-01

### 🐞 BugFix
- 修复 `Select` 最大高度限制失效的问题（默认 max-height 应为 80px） ([#1030](https://github.com/sheinsight/shineout-next/pull/1030))

## 3.6.0
2025-03-19

### 🐞 BugFix
- 修复 `Select` 的 `onLoadMore` 在加载第二页的时候重新打开面板滚动位置异常的问题(Regression: since v3.5.5) ([#1000](https://github.com/sheinsight/shineout-next/pull/1000))
- 修复 `Select` 的 `reFocus` 属性失效的问题 ([#971](https://github.com/sheinsight/shineout-next/pull/971))


### 🚀 Performance
- 优化 `Select` 大数据量下的树形数据搜索性能 ([#877](https://github.com/sheinsight/shineout-next/pull/877))
- 优化 `Select` 在大数据量下同时被渲染很多个时的页面初始化性能问题 ([#877](https://github.com/sheinsight/shineout-next/pull/877))



## 3.5.7
2025-01-14

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
- 修复 `Select` 在开启 `absolute` 属性后，多选模式下选择内容换行后面板位置不更新的问题 ([#804](https://github.com/sheinsight/shineout-next/pull/804))

## 3.5.0
2024-11-11

### 💎 Enhancement

- 优化 `Select` 默认 `placeholder` 占位形式 ([#788](https://github.com/sheinsight/shineout-next/pull/788))

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
- 修复 `Select` 的 `columns` 只有 1 列情况下列表宽度不自动撑满的问题 ([#686](https://github.com/sheinsight/shineout-next/pull/686))

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







