
## 3.5.3-beta.5
2024-12-02

### 🐞 BugFix
- 修复 `Table` 合并行数据的最大行数超过rowsInView时，导致垂直滚动时，这个合并单元格的内容闪烁的问题 ([#836](https://github.com/sheinsight/shineout-next/pull/836))

## 3.5.3-beta.3
2024-11-29

### 🐞 BugFix

- 修复 `Table` 合并行数据的最大行数超过rowsInView时，导致垂直滚动时，这个合并单元格的内容闪烁的问题 ([#830](https://github.com/sheinsight/shineout-next/pull/830))
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
- 优化 `Table` 组件 Spin 支持从全局配置读取相关设置 ([#727](https://github.com/sheinsight/shineout-next/pull/727))


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

- `Table` 组件新增属性 `showTopScrollbar`，开启顶部滚动条  ([#671](https://github.com/sheinsight/shineout-next/pull/671))
- `Table` 组件 `onScroll` 事件新增 top 参数 ([#658](https://github.com/sheinsight/shineout-next/pull/658))
- `Table` 组件 `Ref` 支持 `getRenderIndexByData` 方法，用于获取指定数据在渲染列表中的索引

## 3.3.7
2024-09-14

### 🐞 BugFix
- 修复`Table` 在`Tabs`组件中切换时的滚动条抖动一下的问题 ([#667](https://github.com/sheinsight/shineout-next/pull/667))
### 🐞 BugFix
- 修复`Table` 虚拟滚动时，默认的rowsInView渲染结果不够撑满一屏导致的滚动空白问题 ([#628](https://github.com/sheinsight/shineout-next/pull/628))
- 修复`Table` 虚拟滚动的内部元素被执行scrollIntoView导致的页面偏移的问题 ([#624](https://github.com/sheinsight/shineout-next/pull/624))


## 3.3.3
2024-08-15

### 🐞 BugFix
- 修复`Table`空数据时,resize后的固定列位置不对的问题 ([#606](https://github.com/sheinsight/shineout-next/pull/606))
- 修复`Table`有合并行数据时滚动到数据的底部时，依然能滚动一段距离的问题
- 修复`Table`有合并行数据时多次动态切换data时,表格重复渲染出多余的行的问题 ([#592](https://github.com/sheinsight/shineout-next/pull/592))
- 修复`Table`的虚拟列表场景下的合并行中内容闪烁的问题 ([#595](https://github.com/sheinsight/shineout-next/pull/595))
- 修复`Table`的列中有动态加载的内容导致tbody和thead不对齐的问题 ([#595](https://github.com/sheinsight/shineout-next/pull/595))


## 3.3.0
2024-07-23

### 🐞 BugFix
- 修复 `Table` 组件 `height` 类型错误，支持 string 类型 ([#584](https://github.com/sheinsight/shineout-next/pull/584))
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

### 🆕 Feature

### 🐞 BugFix

- 修复 `Table` 属性 `onRowClick` 漏传参数 `fireAttr` ([#418](https://github.com/sheinsight/shineout-next/pull/418))
- 修复 `Table` 选择行合并的场景下会出现部分选中的列没有高亮的问题 ([#415](https://github.com/sheinsight/shineout-next/pull/415))

### 💎 Enhancement

### 💅 Style

### 🆎 Type

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





