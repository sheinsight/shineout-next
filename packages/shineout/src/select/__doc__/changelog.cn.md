## 3.9.13-beta.7
2026-04-08

### 🐞 BugFix
- 修复 `Select` 同时开启 `onFilter` 和 `onCreate` 时，搜索并选中项后关键词被意外清空的问题 ([#1689](https://github.com/sheinsight/shineout-next/pull/1689))

## 3.9.12-beta.13
2026-03-30

### 💅 Style
- 修复 `Select`/`TreeSelect`/`Cascader` 鼠标移入移出时清除图标与箭头图标宽度不一致导致内容区域闪跳的问题 ([#1673](https://github.com/sheinsight/shineout-next/pull/1673))

## 3.9.12-beta.11
2026-03-27

### 💅 Style
- 修复 `Select` 多列模式（columns）在不同尺寸（small/large）下列表头部、选项内边距和对齐样式异常的问题 ([#1671](https://github.com/sheinsight/shineout-next/pull/1671))

## 3.9.9-beta.13
2026-02-06
### 🐞 BugFix
- 修复 `Select` 开启 `onFilter` 后输入关键字进行滚动加载时列表重置到第一条的问题 ([#1619](https://github.com/sheinsight/shineout-next/pull/1619))


## 3.9.9-beta.12
2026-02-05
### 🐞 BugFix
- 修复 `Select` 输入框内容过长时出现滚动条的问题 ([#1618](https://github.com/sheinsight/shineout-next/pull/1618))


## 3.9.9-beta.5
2026-01-28

### 🐞 BugFix
- 修复 `Select` 的 `renderCompressed` 在 `compressed='no-repeat'` 模式下 `data` 参数未去重的问题 ([#1610](https://github.com/sheinsight/shineout-next/pull/1610))


## 3.9.6-beta.5
2025-12-31
### 🐞 BugFix
- 修复 `Select` 的 `renderItem` 函数第二参数 index 没有值的问题  ([#1560](https://github.com/sheinsight/shineout-next/pull/1560))


## 3.9.2-beta.4
2025-12-03

### 🐞 BugFix

- 修复 `Select` 的 `trim` 默认值与老版本不一致的问题 ([#1497](https://github.com/sheinsight/shineout-next/pull/1497))

## 3.9.1-beta.3
2025-11-26

### 🆕 Feature

- `Select` 新增 `createOnBlur` 属性，控制开启 onCreate 时输入框失焦是否自动创建选项 ([#1486](https://github.com/sheinsight/shineout-next/pull/1486))


## 3.9.0-beta.34
2025-11-25

### 🐞 BugFix

- 修复 `Select` 的虚拟列表经历搜索之后，可滚动高度与实际内容不符的问题  ([#1482](https://github.com/sheinsight/shineout-next/pull/1482))


## 3.9.0-beta.21
2025-11-05

### 🆕 Feature

- `Select` 新增 `virtual`: 开启树形数据的虚拟列表 ([#1454](https://github.com/sheinsight/shineout-next/pull/1454))


## 3.8.10-beta.9
2025-11-19

### 🐞 BugFix

- 修复 `Select` 下拉框滚动位置丢失问题 （Regression: since v3.7.1）([#1473](https://github.com/sheinsight/shineout-next/pull/1473))


## 3.8.10-beta.2
2025-11-13

### 🐞 BugFix

- 修复 `Select` 多选模式下，`renderItem` 返回的是数字0时不回显的问题 ([#1460](https://github.com/sheinsight/shineout-next/pull/1460))

## 3.8.9-beta.3
2025-11-05

### 🐞 BugFix

- 修复 `Select` 的 `emptyAfterSelect` 设置为 false 不生效的问题 ([#1449](https://github.com/sheinsight/shineout-next/pull/1449))


## 3.8.8-beta.4
2025-10-29

### 🐞 BugFix

- 修复 `Select` 的 `onCreate` 函数参数的TS类型不正确的问题 ([#1434](https://github.com/sheinsight/shineout-next/pull/1434))

## 3.8.8-beta.2
2025-10-28

### 🐞 BugFix
- 修复 `Select` 的 `renderResult` 中使用了弹出层类组件且开启了 `onFilter` 后，聚焦输入框时出现额外文本内容的问题 ([#1432](https://github.com/sheinsight/shineout-next/pull/1432))

## 3.8.6-beta.7
2025-10-13

### 🐞 BugFix
- 修复 `Select` 在大尺寸模式下的结果样式垂直不居中的问题 （Regression: since v3.7.2）([#1409](https://github.com/sheinsight/shineout-next/pull/1409))

## 3.8.5-beta.3
2025-09-28

### 🐞 BugFix
- 修复 `Select` 设置 `focusSelected` 为 false 不生效的问题 ([#1392](https://github.com/sheinsight/shineout-next/pull/1392))


## 3.8.3-beta.5
2025-09-17

### 🐞 BugFix
- 修复 `Select` 的 `data` 传入树形数据且存在重复id数据时，渲染的结果可能不正确的问题 ([#1369](https://github.com/sheinsight/shineout-next/pull/1369))


## 3.8.3-beta.4
2025-09-16

### 🐞 BugFix

- 修复 `Select` 同时处于 `disabled` 和校验失败状态下时背景颜色不正确的问题 ([#1368](https://github.com/sheinsight/shineout-next/pull/1368))


## 3.8.3-beta.3
2025-09-16

### 💎 Enhancement
- 增强 `Select` 的 `groupBy` 属性，支持返回 React 组件，用于自定义渲染分组标题 ([#1366](https://github.com/sheinsight/shineout-next/pull/1366))


## 3.8.1-beta.2
2025-09-02

### 🐞 BugFix
- 修复 `Select` 开启 `renderOptionList` 后，当数据为空时，`renderOptionList` 不渲染的问题 ([#1337](https://github.com/sheinsight/shineout-next/pull/1337))


## 3.8.0-beta.45
2025-08-22

### 🆕 Feature
- `Select` 新增 `onClear` 属性，支持监听清除事件 ([#1322](https://github.com/sheinsight/shineout-next/pull/1322))


## 3.8.0-beta.36
2025-08-18

### 🐞 BugFix
- 修复 `Select` 开启 `onCreate` 且开启 `renderUnmatched` 时，渲染结果与老版本不一致的问题 ([#1312](https://github.com/sheinsight/shineout-next/pull/1312))


## 3.8.0-beta.9
2025-06-30

### 🆕 Feature
- `Select` 新增 `preventEnterSelect` 属性，开启 onCreate 时可阻止回车选中已有选项，仅创建选项 ([#1214](https://github.com/sheinsight/shineout-next/pull/1214))


## 3.7.10-beta.1
2025-08-11

### 🐞 BugFix
- 优化 `Select` 开启 `columns` 后，列表上方的全选字样支持多语言配置 ([#1294](https://github.com/sheinsight/shineout-next/pull/1294))


## 3.7.8-beta.12
2025-07-29

### 🐞 BugFix
- 修复 `Select` 开启 `columns` 后，滚动容器的内边距不正确的样式问题 ([#1274](https://github.com/sheinsight/shineout-next/pull/1274))


## 3.7.8-beta.8
2025-07-28

### 🐞 BugFix
- 修复 `Select` 过滤过程中受 `trim` 属性影响，表现与老版本（v1、v2）不一致的问题 ([#1267](https://github.com/sheinsight/shineout-next/pull/1267))


## 3.7.6-beta.4
2025-07-10

### 🐞 BugFix
- 修复 `Select` 开启 `onLoadMore` 加载新数据时列表重置到第一条的问题(Regression: since v3.7.1) ([#1237](https://github.com/sheinsight/shineout-next/pull/1237))


## 3.7.6-beta.2
2025-07-08

### 🐞 BugFix
- 修复 `Select` 开启 `highlight` 后在 renderItem 中渲染非单层 dom 结构功能失效的问题 ([#1232](https://github.com/sheinsight/shineout-next/pull/1232))


## 3.7.5-beta.11
2025-07-04

### 🚀 Performance
- 优化 `Select` 的 `compressed` 在大数据场景下的性能表现 ([#1226](https://github.com/sheinsight/shineout-next/pull/1226))

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







