## 3.6.7-beta.4
2025-05-20

### 🐞 BugFix

- 修复 `Tree` 在 data 发生变化后 `defaultExpanded` 不生效的问题 ([#1119](https://github.com/sheinsight/shineout-next/pull/1119))

## 3.6.7-beta.3
2025-05-20

### 🐞 BugFix

- 修复 `Tree` 在 data 发生变化后 `defaultExpanded` 不生效的问题 ([#1118](https://github.com/sheinsight/shineout-next/pull/1118))

## 3.6.6-beta.2
2025-05-06

### 🐞 BugFix

- 修复 `Tree` 的 `onChange` 第二参数丢失和类型问题 ([#1095](https://github.com/sheinsight/shineout-next/pull/1095))

## 3.6.4-beta.6
2025-04-17

### 🐞 BugFix

- 修复 `Tree` 传入 `rowsInView` 属性失效的问题 ([#1071](https://github.com/sheinsight/shineout-next/pull/1071))

## 3.6.3-beta.7
2025-04-15

### 💎 Enhancement

- 优化 `Tree` 的节点鼠标手势，节点content区域的鼠标手势修改为pointer ([#1058](https://github.com/sheinsight/shineout-next/pull/1058))

## 3.6.2-beta.6
2025-04-07

### 💎 Enhancement

- 优化 `Tree` 拖拽时原节点立即隐藏带来的性能问题和交互不友好问题，改为不立即隐藏原节点 ([#1039](https://github.com/sheinsight/shineout-next/pull/1039))

## 3.6.0
2025-03-19

### 🐞 BugFix

- 修复 `TreeSelect` 开 `virtual` 和 `defaultExpandedAll` 后，过滤数据不展开的问题 ([#1001](https://github.com/sheinsight/shineout-next/pull/1001))
- 修复 `TreeSelect` 节点样式可能不对齐对问题 ([#1001](https://github.com/sheinsight/shineout-next/pull/1001))

## 3.6.0
2025-03-07

### 🆕 Feature

- `Tree` 新增 `actionOnClick` 属性，配置点击节点时的行为：`expand` 展开/收起节点，`check` 勾选或取消勾选节点 ([#986](https://github.com/sheinsight/shineout-next/pull/986))
- `Tree` 新增 `virtual` 属性支持虚拟列表 ([#948](https://github.com/sheinsight/shineout-next/pull/948))


## 3.6.0
2025-03-04

### 🐞 BugFix

- 修复 `Tree` 传入的非树形数据时, 一级节点有多余的缩进问题 ([#981](https://github.com/sheinsight/shineout-next/pull/981))

## 3.5.8
2025-02-13

### 🐞 BugFix

- 修复 `Tree` 组件一级的叶子结点缩进不正确的问题 ([#941](https://github.com/sheinsight/shineout-next/pull/941))


## 3.5.2
2024-11-28

### 🐞 BugFix

- 修复 `Tree` 组件开启 `doubleClickExpand` 后，双击节点（非根节点）无法展开的问题 ([#818](https://github.com/sheinsight/shineout-next/pull/818))

## 3.4.3
2024-10-14

### 🐞 BugFix

- 修复 `Tree` 组件在开启 `loader` 情况下设置 `defaultExpandAll` 展开状态异常的问题 ([#699](https://github.com/sheinsight/shineout-next/pull/699))
- 修复 `Tree` 的 `setActive` 会触发多次的问题 ([#699](https://github.com/sheinsight/shineout-next/pull/699))

### 💎 Enhancement

- `Tree` 的 `setActive` 新增第二参当前选中节点数据数的返回 ([#699](https://github.com/sheinsight/shineout-next/pull/699))
- 新增 `Tree` 类型 `KeygenResult` 导出 ([#699](https://github.com/sheinsight/shineout-next/pull/699))

## 3.4.2
2024-09-29

### 🐞 BugFix

- 修复 `useTree` hooks 在重复 key 数据情况下后续节点无法正常注册的问题 ([#694](https://github.com/sheinsight/shineout-next/pull/694))

## 3.4.1
2024-09-20

### 🐞 BugFix

- 修复 `Tree` 一级节点的缩进过大的问题  ([#682](https://github.com/sheinsight/shineout-next/pull/682))



## 3.4.0
2024-09-19

### 🆕 Feature

- `Tree` 组件新增`setActive`，与`active`组成高亮的受控功能  ([#665](https://github.com/sheinsight/shineout-next/pull/665))


## 3.1.22
2024-05-31

### 🐞 BugFix

- 修复 `Tree` 当 `disabeld` 为 bool 类型，并且值变化时组件没有更新的问题  ([#495](https://github.com/sheinsight/shineout-next/pull/495))


## 3.1.14
2024-05-21

### 🐞 BugFix

- 修复 `Tree` 拖动子节点的时候无法触发拖拽事件回调函数的问题 ([#464](https://github.com/sheinsight/shineout-next/pull/464))
- 修复 `Tree` 禁用节点会导致 `onClick` 无法触发的问题 ([#461](https://github.com/sheinsight/shineout-next/pull/461))

### 💎 Enhancement
- 优化 `Tree` 换行场景下的连线样式 ([#463](https://github.com/sheinsight/shineout-next/pull/463))




## 3.1.13
2024-05-20

### 🐞 BugFix

- 修复 `Tree` 属性 `defaultExpandAll` 没有效果的问题 ([#457](https://github.com/sheinsight/shineout-next/pull/457))

## 3.1.9
2024-05-14

### 🆎 Type

- 修复 `Tree` 属性 `leafClass` 类型错误 ([#437](https://github.com/sheinsight/shineout-next/pull/437))

## 3.1.0
2024-05-09

### 🆕 Feature

- `Tree` 属性 `loader` 支持返回 Promise 来关闭加载状态 ([#417](https://github.com/sheinsight/shineout-next/pull/417))

## 3.0.10
2024-05-06

### 🐞 BugFix

- 修复 `Tree` value 变化时节点渲染更新异常的问题 ([#405](https://github.com/sheinsight/shineout-next/pull/405))






