## 3.9.0-beta.5
2025-10-16

### 🆕 Feature

- `Table` 新增 `strictRowHeight` 属性，强制统一行高，可提升虚拟滚动性能 ([#1415](https://github.com/sheinsight/shineout-next/pull/1415))


## 3.8.9-beta.2
2025-11-04

### 🐞 BugFix
- 修复 `Table` 在某些场景下因 Hooks 调用顺序不一致导致的渲染错误（Regression: since v3.8.8-beta.6）([#1446](https://github.com/sheinsight/shineout-next/pull/1446))


## 3.8.9-beta.1
2025-11-03

### 🐞 BugFix
- 修复 `Table` 有合并列的表头同时设置为右固定列时，可能出现表头的布局错乱的问题 ([#1445](https://github.com/sheinsight/shineout-next/pull/1445))
- 修复 `Empty` 组件的 `emptyNoData` 图标在页面存在多个实例时，除第一个外其他图标的渐变和滤镜效果不生效的问题（SVG ID 冲突） ([#1445](https://github.com/sheinsight/shineout-next/pull/1445))


## 3.8.8-beta.6
2025-10-29

### 🚀 Performance
- 优化 `Table` 的虚拟列表下存在弹出层类组件的性能 ([#1437](https://github.com/sheinsight/shineout-next/pull/1437))

## 3.8.8-beta.5
2025-10-29

### 🐞 BugFix
- 修复 `Table` 设置的 `rowsInView` 偏小时容器底部有空白的问题 ([#1435](https://github.com/sheinsight/shineout-next/pull/1435))


## 3.8.7-beta.2
2025-10-15

### 🚀 Performance
- 优化 `Table` 的虚拟滚动性能 ([#1414](https://github.com/sheinsight/shineout-next/pull/1414))

## 3.8.4-beta.3
2025-09-23

### 🐞 BugFix
- 修复 `Table` 在存在右固定列且浏览器滚动条宽度为0（通常发生在 macOS 上）时，固定列和头部垂直不对齐的问题 ([#1380](https://github.com/sheinsight/shineout-next/pull/1380))


## 3.8.4-beta.2
2025-09-23

### 💎 Enhancement
- 优化 `Table` 在设置了 `virtual` 且样式中有 maxHeight 但无 height 时的渲染性能，避免表格内容变化引起的不必要重新渲染 ([#1379](https://github.com/sheinsight/shineout-next/pull/1379))


## 3.8.3-beta.7
2025-09-18

### 🐞 BugFix
- 修复 `Table` 在定高且 `data` 数量不足以撑满高度时，底部总结栏的位置不正确的问题 ([#1372](https://github.com/sheinsight/shineout-next/pull/1372))


## 3.8.2-beta.7
2025-09-12

### 🐞 BugFix
- 修复 `Table` 不定设置固定高度的虚拟列表下，compressed 弹出层内部无法滚动的问题 （Regression: since v3.7.7） ([#1358](https://github.com/sheinsight/shineout-next/pull/1358))


## 3.8.2-beta.6
2025-09-10

### 💎 Enhancement
- 增强 `Table` 的 `showTopScrollbar` 属性设置，支持设置滚动容器 ([#1356](https://github.com/sheinsight/shineout-next/pull/1356))


## 3.8.1-beta.5
2025-09-04

### 🐞 BugFix
- 修复 `Table` 在可展开行内嵌套使用时，斑马纹样式不正确的问题 ([#1345](https://github.com/sheinsight/shineout-next/pull/1345))


## 3.8.0-beta.43
2025-08-21

### 🐞 BugFix
- 修复 `Table` 设置了 `showBottomScrollbar` 属性后可能出现双滚动条的问题 ([#1320](https://github.com/sheinsight/shineout-next/pull/1320))


## 3.8.0-beta.5
2025-06-18

### 🆕 Feature

- `Table` 新增 `cellSortable` 属性，支持点击单元格触发排序 ([#1188](https://github.com/sheinsight/shineout-next/pull/1188))


## 3.7.9-beta.7
2025-08-04

### 🐞 BugFix
- 修复 `Table` 快速横滚时可能出现的固定列被瞬时遮挡一下的问题 ([#1287](https://github.com/sheinsight/shineout-next/pull/1287))([#1290](https://github.com/sheinsight/shineout-next/pull/1290))


## 3.7.9-beta.4
2025-07-31

### 🐞 BugFix
- 修复 `Table` 虚拟列表模式下合并行 `checkbox` 状态丢失的问题 ([#1280](https://github.com/sheinsight/shineout-next/pull/1280))


## 3.7.9-beta.2
2025-07-30

### 🐞 BugFix

- 修复 `Table` 在数据为空时，底部总结行依然会展示，表现与 v1 v2 不一致的问题 ([#1278](https://github.com/sheinsight/shineout-next/pull/1278))


## 3.7.7-beta.7
2025-07-17

### 🐞 BugFix

- 修复 `Table` 的 `scrollToIndex` 方法滚动位置计算不准确的问题 （Regression: since v3.7.0） ([#1250](https://github.com/sheinsight/shineout-next/pull/1250))


## 3.7.7-beta.6
2025-07-16

### 🐞 BugFix

- 修复 `Table` 的thead或tfoot存在动态高度时，虚拟列表的最后一条数据看不全的问题 （Regression: since v3.7.0） ([#1249](https://github.com/sheinsight/shineout-next/pull/1249))


## 3.7.7-beta.5
2025-07-16

### 🐞 BugFix

- 修复 `Table` 在 `Popover` 中使用虚拟列表时，二次打开弹窗后虚拟列表失效，渲染了全量数据的问题 （Regression: since v3.7.0） ([#1248](https://github.com/sheinsight/shineout-next/pull/1248))


## 3.7.4-beta.7
2025-06-26

### 🐞 BugFix

- 修复 `Table` 的固定列在快速滚动时，sticky样式的应用可能有迟滞的问题 ([#1209](https://github.com/sheinsight/shineout-next/pull/1209))


## 3.7.4-beta.4
2025-06-25

### 🐞 BugFix

- 修复 `Table` 在有动态固定列时，固定列吸附的位置不正确的问题 ([#1203](https://github.com/sheinsight/shineout-next/pull/1203))


## 3.7.1-beta.2
2025-06-06

### 🐞 BugFix
- 修复 `Table` 单元格中使用的 Popover 设置的挂载容器在 td 元素内时的遮挡问题 ([#1155](https://github.com/sheinsight/shineout-next/pull/1155))


## 3.7.0-beta.44
2025-06-04

### 🐞 BugFix

- 修复 `Table` 自定义 `empty` 缺失一层内部结构导致 flex 布局异常的问题 ([#1148](https://github.com/sheinsight/shineout-next/pull/1148))


## 3.7.0-beta.42
2025-06-04

### 🐞 BugFix

- 修复 `Table` 的 data 引用不变但数据变化后，组件不触发更新的问题 ([#1146](https://github.com/sheinsight/shineout-next/pull/1146))


## 3.7.0-beta.38
2025-06-03

### 🐞 BugFix

- 修复 `Table` 前端过滤多选的勾选状态在重置后未清空的问题 ([#1140](https://github.com/sheinsight/shineout-next/pull/1140))


## 3.7.0-beta.26
2025-05-20

### 🐞 BugFix

- 修复 `Table` 的不定高场景下依然开启了虚拟列表的数据渲染不全和抖动的问题 ([#1117](https://github.com/sheinsight/shineout-next/pull/1117))


## 3.7.0-beta.23
2025-05-14

### 🆕 Feature

- `Table` 的 columns 新增 `groupProps` 属性，支持设置 style 和 className ([#1112](https://github.com/sheinsight/shineout-next/pull/1112))


## 3.7.0-beta.21
2025-05-07

### 🐞 BugFix
- 修复 `Table` 的 columns 中 render 字段不传导致组件报错的问题 ([#1102](https://github.com/sheinsight/shineout-next/pull/1102))


## 3.7.0-beta.14
2025-04-30

### 🆕 Feature
- `Table` 的 `virtual` 属性值新增lazy，设置后可提高虚拟列表的垂直滚动性能 ([#1093](https://github.com/sheinsight/shineout-next/pull/1093))


## 3.7.0-beta.6
2025-04-14

### 🆕 Feature

- `Table` 新增 `showBottomScrollbar` 属性，启用后显示可吸附底部的横向滚动条 ([#1068](https://github.com/sheinsight/shineout-next/pull/1068))


## 3.7.0-beta.4
2025-04-11

### 🐞 BugFix
- 修复 `Table` 的colgroup平均分配时产生的小数位像素在浏览器渲染时偶现的单元格垂直边框对不齐问题  ([#1050](https://github.com/sheinsight/shineout-next/pull/1050))


###  🚀 Performance
- 优化 `Table` 合并行或列的hover渲染性能 ([#1050](https://github.com/sheinsight/shineout-next/pull/1050))


## 3.7.0-beta.3
2025-04-09

### 🚀 Performance
- 优化 `Table` 的虚拟列表横向滚动性能，调整了thead的dom位置 ([#1047](https://github.com/sheinsight/shineout-next/pull/1047))


## 3.6.3-beta.3
2025-04-11

### 🐞 BugFix
- 修复 `Table` 开启拖拽行之后偶现的拖拽不成功问题  ([#1052](https://github.com/sheinsight/shineout-next/pull/1052))


## 3.6.3-beta.3
2025-04-11

### 🐞 BugFix
- 修复 `Table` 的 tfoot 没有在底部吸附的问题（Regression： since v3.5.0）  ([#1045](https://github.com/sheinsight/shineout-next/pull/1045))


## 3.6.2-beta.6
2025-04-07

### 🐞 BugFix
- 修复 `Table` 点击 `Button` 等元素会触发单元格 click 事件的问题  ([#1040](https://github.com/sheinsight/shineout-next/pull/1040))


## 3.6.1-beta.3
2025-03-25

### 🐞 BugFix
- 修复 `Table` 的columns是动态值时，column.filter的过滤功能意外的被重置的问题 ([#1012](https://github.com/sheinsight/shineout-next/pull/1012))


## 3.6.0
2025-03-06

### 🆕 Feature
- `Table` 新增筛选功能： 设置 `columns` 配置项的 `filter` 属性 ([#986](https://github.com/sheinsight/shineout-next/pull/986))
- `Table` 的 `TableRef` 新增 `sortByColumn` 方法，支持根据列 key 进行排序 ([#914](https://github.com/sheinsight/shineout-next/pull/914))


### 🐞 BugFix
- 修复 `Table` 的column.width设置为0时不生效的问题（Regression: since v3.4.5） ([#998](https://github.com/sheinsight/shineout-next/pull/998))
- 修复 `Table` 调用了 `scrollToIndex` 后，滚动条向上滚动时，滚动条位置往下跳跃的问题 ([#961](https://github.com/sheinsight/shineout-next/pull/961))


## 3.5.8
2025-02-13

### 🐞 BugFix

- 修复 `Table` 在虚拟列表大数据下拖拽滚动条时和调用 `scrollToIndex` 的性能问题（Regression: since: v3.5.4） ([#937](https://github.com/sheinsight/shineout-next/pull/937))


## 3.5.5
2024-12-24

### 🐞 BugFix
- `Table` 空数据状态下，右侧有固定列时，横向滚动时右侧可能有内容露底显示问题 ([#872](https://github.com/sheinsight/shineout-next/pull/872))


### 💎 Enhancement
- `Table` 空数据状态下，tbody区域可展示横向滚动条 ([#872](https://github.com/sheinsight/shineout-next/pull/872))


## 3.5.4
2024-12-12

### 🆕 Feature
- `Table` 新增 `expandIcon` 属性，支持自定义渲染可展开行的 icon 区域内容 ([#864](https://github.com/sheinsight/shineout-next/pull/864))


### 🐞 BugFix
- 修复 `Table` 合并行数据在虚拟列表下偶现的抖动问题 ([#861](https://github.com/sheinsight/shineout-next/pull/861))
- 修复 `Table` 同时设置了`defaultTreeExpandKeys`, `treeExpandKeys`, `onTreeExpand`后导致的组件渲染卡死问题 ([#852](https://github.com/sheinsight/shineout-next/pull/852))


### 🚀 Performance
- 优化 `Table` 在大合并行数据下的性能 ([#850](https://github.com/sheinsight/shineout-next/pull/850))


## 3.5.3
2024-12-04

### 🐞 BugFix
- 修复 `Table` 合并行数据的最大行数超过rowsInView时，导致垂直滚动时，这个合并单元格的内容闪烁的问题 ([#836](https://github.com/sheinsight/shineout-next/pull/836))
- 修复 `Table` 的column type为'checkbox'，且column的render为函数时，render不生效的问题 ([#825](https://github.com/sheinsight/shineout-next/pull/825))


## 3.5.2
2024-11-28

### 🐞 BugFix

- 修复 `Table` 设置了`fixed`或`virtual`，但未设置表格高度时，动态添加表格行后横向滚动条出现抖动的问题 ([#821](https://github.com/sheinsight/shineout-next/pull/821))


## 3.5.1
2024-11-14

### 🐞 BugFix

- 修复 `Table` 的列设置为百分比宽度时，单元格内的自定义的css ellipsis效果不生效的问题(Regression: since v3.5.0) ([#795](https://github.com/sheinsight/shineout-next/pull/795))


## 3.5.0
2024-11-11

### 🆕 Feature
- `Table` 新增 `sortDirections` 属性，支持对全部列设置排序方向，同时`column` 新增 `sortDirections` 属性，支持对单列设置排序方向 ([#784](https://github.com/sheinsight/shineout-next/pull/784))
- `Table` 新增 `scrollColumnIntoView` 方法，支持根据列 key 跳转至指定列 ([#738](https://github.com/sheinsight/shineout-next/pull/738))
- `Table` 新增 `scrollColumnByLeft` 方法，支持自定义跳转至指定横向位置 ([#738](https://github.com/sheinsight/shineout-next/pull/738))


### 💎 Enhancement
- 优化 `Table` 内的弹出层类元素跟随滚动的行为逻辑 ([#754](https://github.com/sheinsight/shineout-next/pull/754))
- `Table` 树形数据用法下，新增 `loader` 开启动态加载子节点数据 ([#747](https://github.com/sheinsight/shineout-next/pull/747))
- `Table` 树形数据用法下，新增 `treeExpandIcon` 自定义展开/折叠图标 ([#747](https://github.com/sheinsight/shineout-next/pull/747))
- 优化 `Table` 非虚拟列表场景下，横向纵向的滚动事件修改为原生滚动 ([#740](https://github.com/sheinsight/shineout-next/pull/740))


## 3.4.6
2024-11-05

### 🐞 BugFix

- 修复 `Table` 点击 checkbox 触发行展开的问题 ([#777](https://github.com/sheinsight/shineout-next/pull/777))


## 3.4.5
2024-10-31

### 🐞 BugFix

- 修复 `Table` 的 `minWidth` 设置失效的问题 ([#774](https://github.com/sheinsight/shineout-next/pull/774))
- 修复 `Table` 中点击部分组件会触发行展开的问题 ([#761](https://github.com/sheinsight/shineout-next/pull/761))


## 3.4.4
2024-10-28

### 💎 Enhancement
- 优化 `Table` 的 `Spin` 支持从全局配置读取相关设置 ([#727](https://github.com/sheinsight/shineout-next/pull/727))


## 3.4.3
2024-10-14

### 🐞 BugFix

- 修复 `Table` 的width和ColumnItem的width的类型问题 ([#717](https://github.com/sheinsight/shineout-next/pull/717))


## 3.4.2
2024-09-29

### 🐞 BugFix

- 修复 `Table` 空数据状态下可能出现垂直滚动条的问题 ([#690](https://github.com/sheinsight/shineout-next/pull/690))
- 修复 `Table` 在 `data` 动态变化后滚动状态异常的问题 ([#687](https://github.com/sheinsight/shineout-next/pull/687))


## 3.4.0
2024-09-19

### 🐞 BugFix

- 修复TableRef的`scrollToIndex`的回调方法不生效问题 ([#651](https://github.com/sheinsight/shineout-next/pull/651))


### 🆕 Feature

- `Table` 新增属性 `showTopScrollbar`，开启顶部滚动条  ([#671](https://github.com/sheinsight/shineout-next/pull/671))
- `Table` 的 `onScroll` 事件新增 top 参数 ([#658](https://github.com/sheinsight/shineout-next/pull/658))
- `Table` 的 `Ref` 支持 `getRenderIndexByData` 方法，用于获取指定数据在渲染列表中的索引


## 3.3.7
2024-09-14

### 🐞 BugFix
- 修复 `Table` 在 `Tabs` 中切换时的滚动条抖动一下的问题 ([#667](https://github.com/sheinsight/shineout-next/pull/667))


### 🐞 BugFix
- 修复 `Table` 虚拟滚动时，默认的rowsInView渲染结果不够撑满一屏导致的滚动空白问题 ([#628](https://github.com/sheinsight/shineout-next/pull/628))
- 修复 `Table` 虚拟滚动的内部元素被执行scrollIntoView导致的页面偏移的问题 ([#624](https://github.com/sheinsight/shineout-next/pull/624))


## 3.3.3
2024-08-15

### 🐞 BugFix
- 修复 `Table` 空数据时,resize后的固定列位置不对的问题 ([#606](https://github.com/sheinsight/shineout-next/pull/606))
- 修复 `Table` 有合并行数据时滚动到数据的底部时，依然能滚动一段距离的问题
- 修复 `Table` 有合并行数据时多次动态切换data时,表格重复渲染出多余的行的问题 ([#592](https://github.com/sheinsight/shineout-next/pull/592))
- 修复 `Table` 的虚拟列表场景下的合并行中内容闪烁的问题 ([#595](https://github.com/sheinsight/shineout-next/pull/595))
- 修复 `Table` 的列中有动态加载的内容导致tbody和thead不对齐的问题 ([#595](https://github.com/sheinsight/shineout-next/pull/595))


## 3.3.0
2024-07-23

### 🐞 BugFix
- 修复 `Table` 的 `height` 类型错误，支持 string 类型 ([#584](https://github.com/sheinsight/shineout-next/pull/584))
- 修复 `Table` 在低于Chrome99版本下的横向滚动条不可见的问题 ([#580](https://github.com/sheinsight/shineout-next/pull/580))
- 修复 `Table` 虚拟滚动在`Tabs`切换会导致滚动的问题 ([#580](https://github.com/sheinsight/shineout-next/pull/580))
- 修复 `Table` 在数据不断变化的场景下可能导致滚动偏移的位置计算错误 ([#553](https://github.com/sheinsight/shineout-next/pull/553))
- 修复 `Table` 在数据不断变化的场景下可能导致滚动偏移的位置计算错误 ([#553](https://github.com/sheinsight/shineout-next/pull/553))


### 🆕 Feature
- `Table` 新增属性 `onCellClick` 支持单元格点击后的回调 ([#550](https://github.com/sheinsight/shineout-next/pull/550))


## 3.2.6
2024-07-05

### 🐞 BugFix
- 修复 `Table` 分页的current被重置后，不能点击上一个相同页码的问题 ([#569](https://github.com/sheinsight/shineout-next/pull/569))
- 修复 `Table` 在bordered模式下, 浏览器缩放引起的滚动条计算偏差问题 ([#562](https://github.com/sheinsight/shineout-next/pull/562))
- 修复 `Table` 在屏幕某些缩放比例下闪烁的问题 ([#562](https://github.com/sheinsight/shineout-next/pull/562))


## 3.2.2
2024-06-21

### 🐞 BugFix
- 修复 `Table` 虚拟列表在缩放场景下可能导致滚动条跳动的问题 ([#539](https://github.com/sheinsight/shineout-next/pull/539))


### 💎 Enhancement
- 优化 `Table` 虚拟列表高度计算逻辑 ([#530](https://github.com/sheinsight/shineout-next/pull/530))


## 3.1.31
2024-06-14

### 🐞 BugFix
- 修复 `Table` 虚拟列表高度被撑高的问题 ([#523](https://github.com/sheinsight/shineout-next/pull/523))


## 3.1.30
2024-06-13



### 🐞 BugFix

- 修复 `Table` 在某些场景下无法滚动的问题 ([#519](https://github.com/sheinsight/shineout-next/pull/519))


## 3.1.28
2024-06-07



### 🐞 BugFix

- 修复 `Table` 虚拟列表在 Firefox 浏览器滚动条长度超长问题 ([#512](https://github.com/sheinsight/shineout-next/pull/512))


## 3.1.24
2024-06-03



### 🐞 BugFix

- 修复 `Table` 右侧固定列在某些场景会出现偏移的问题 ([#499](https://github.com/sheinsight/shineout-next/pull/499))


## 3.1.20
2024-05-30



### 💅 Style

- 修复 `Table` 选择行场景下复选框和文本不对齐问题([#486](https://github.com/sheinsight/shineout-next/pull/486)) 


## 3.1.15
2024-05-23



### 🐞 BugFix

- 修复 `Table` 异步加载数据可能导致滚动条闪烁的问题 ([#466](https://github.com/sheinsight/shineout-next/pull/466)) 
- 修复 `Table` 只使用样式的用法单元格下边框样式问题 ([#469](https://github.com/sheinsight/shineout-next/pull/469)) 


## 3.1.9
2024-05-14



### 🐞 BugFix

- 修复 `Table` 在缩放场景下可能导致 Table 高度一直变化的问题 ([#442](https://github.com/sheinsight/shineout-next/pull/442))
- 修复 `Table` 没有设置高度并且数据为空的场景下滚动条渲染异常的问题 ([#438](https://github.com/sheinsight/shineout-next/pull/438))


## 3.1.7
2024-05-11

### 🐞 BugFix

- `Table` 在 React17 版本下右侧固定列在首次渲染的时候发生偏移的问题 ([#431](https://github.com/sheinsight/shineout-next/pull/431))


## 3.1.6
2024-05-11

### 🐞 BugFix

- `Table` 表头分组场景下可能导致列宽计算错误的问题 ([#428](https://github.com/sheinsight/shineout-next/pull/428))
- `Table` 属性 `onColumnResize` 参数返回错误的问题 ([#427](https://github.com/sheinsight/shineout-next/pull/427))


## 3.1.5
2024-05-10

### 🐞 BugFix

- `Table` 在没有设置 `width` 的情况下表头可能错位的问题 ([#426](https://github.com/sheinsight/shineout-next/pull/426))


## 3.1.2
2024-05-10

### 💅 Style
- `Table` 容器增加 `min-width: 0` 样式 ([#422](https://github.com/sheinsight/shineout-next/pull/422))


## 3.1.0
2024-05-09


### 🐞 BugFix

- 修复 `Table` 属性 `onRowClick` 漏传参数 `fireAttr` ([#418](https://github.com/sheinsight/shineout-next/pull/418))
- 修复 `Table` 选择行合并的场景下会出现部分选中的列没有高亮的问题 ([#415](https://github.com/sheinsight/shineout-next/pull/415))


## 3.0.10
2024-05-06

### 🐞 BugFix

- 修复 `Table` 在 safari 中 `columns width` 没有效果([#409](https://github.com/sheinsight/shineout-next/pull/409))


## 3.0.3
2024-04-22

### 🐞 BugFix

- 修复 `Table` 当页面缩放的时候固定列可能出现偏移的问题 ([#384](https://github.com/sheinsight/shineout-next/pull/384))


## 3.0.2
2024-04-18

### 🐞 BugFix

- 修复 `Table` 开启虚拟列表后 `height` 默认值与2.x 版本不一致的问题 ([#370](https://github.com/sheinsight/shineout-next/pull/370))


### 💎 Enhancement

- 优化 `Table` 当没有传入 `summary` 时，不渲染总结栏区域([#377](https://github.com/sheinsight/shineout-next/pull/377))


### 💅 Style

- 优化 `Table` 拖拽列样式 ([#377](https://github.com/sheinsight/shineout-next/pull/377))





