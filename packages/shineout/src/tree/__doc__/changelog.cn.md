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






