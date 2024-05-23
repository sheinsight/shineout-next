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





