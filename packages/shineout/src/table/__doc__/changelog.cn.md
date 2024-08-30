## 3.3.6-beta.6
2024-08-30

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





