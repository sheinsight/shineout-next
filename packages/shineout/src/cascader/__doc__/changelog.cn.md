## 3.5.0-beta.3
2024-10-24

### 🆕 Feature
- `Cascader` 新增 `virtual` 属性，支持虚拟列表([#746](https://github.com/sheinsight/shineout-next/pull/746))

<<<<<<< HEAD

## 3.4.5-beta.7
2024-10-30

### 🐞 BugFix
- 修复 `Cascader` 开启 `expandTrigger` 为 hover 或 hover-only 时点击 checkbox 勾选失效的问题 ([#770](https://github.com/sheinsight/shineout-next/pull/770))

=======
>>>>>>> d1048ce7 (feat: `Cascader` 新增 `virtual` 属性支持虚拟列表 (#746))
## 3.4.4
2024-10-28

### 🐞 BugFix
- 修复 `Cascader` 组件无法拖拽选中 dom 内容的问题 ([#729](https://github.com/sheinsight/shineout-next/pull/729))


## 3.3.6
2024-09-02

### 🐞 BugFix
- 修复 `Cascader` 组件 `onChange` 第二参数缺失的问题([#632](https://github.com/sheinsight/shineout-next/pull/632))

## 3.3.3
2024-08-15

### 🆕 Feature
- 支持 `Cascader` 单选搜索时，展示非string类型的值(renderItem返回的结果) ([#605](https://github.com/sheinsight/shineout-next/pull/605))


## 3.3.0
2024-07-23

### 🆕 Feature
- `Cascader` 支持下拉弹窗溢出自动调整位置([#564](https://github.com/sheinsight/shineout-next/pull/564))

## 3.2.5
2024-07-02

### 🐞 BugFix

- 修复 `Cascader` 当开启 absolute 属性且数据为空时下拉列表宽度超长的问题([#555](https://github.com/sheinsight/shineout-next/pull/555))
- 修复 `Cascader` height 属性失效导致无法滚动的问题([#555](https://github.com/sheinsight/shineout-next/pull/555))

## 3.1.19
2024-05-29

### 🐞 BugFix

- 修复 `Cascader` 当 `value` 变为 `undefined` 时下拉选择状态没有更新的问题 ([#483](https://github.com/sheinsight/shineout-next/pull/483))


## 3.1.18
2024-05-27

### 💅 Style

- 优化 `Cascader` 合并选项的样式 ([#482](https://github.com/sheinsight/shineout-next/pull/482))

## 3.1.17
2024-05-24

### 🐞 BugFix

- 修复 `Cascader` 属性 `compressed` 无效的问题 ([#477](https://github.com/sheinsight/shineout-next/pull/477))

## 3.0.11
2024-05-08

### 🐞 BugFix
- 修复 `Cascader` 组件在渲染未匹配数据时可能出现的数据重复和无法删除的问题 ([#412](https://github.com/sheinsight/shineout-next/pull/412))

## 3.0.9
2024-04-26

### 🐞 BugFix

- 修复 `Cascader` 合并选项功能当数据动态变化或者宽度变化时没有动态更新的问题  ([#402](https://github.com/sheinsight/shineout-next/pull/402))

## 3.0.7
2024-04-25

### 🐞 BugFix

- 修复 `Cascader` 在多选场景下点击下拉输入框无法自动聚焦的问题 ([#397](https://github.com/sheinsight/shineout-next/pull/397))

## 3.0.5
2024-04-24

### 🐞 BugFix

- 修复 `Cascader` 当清空输入框文本时会展示上次筛选内容的问题 ([#391](https://github.com/sheinsight/shineout-next/pull/391))

## 3.0.4
2024-04-24

### 🐞 BugFix

- 修复 `Cascader` 设置 `height` 后内容溢出无法内滚  ([#386](https://github.com/sheinsight/shineout-next/pull/386))
- 修复 `Cascader` 设置 `childrenKey` 后选中结果展示错误 ([#386](https://github.com/sheinsight/shineout-next/pull/386))
- 修复 `Cascader` 设置 `mode = 4` 时禁用节点无法点击展开 ([#386](https://github.com/sheinsight/shineout-next/pull/386))

## 3.0.3
2024-04-22

### 🐞 BugFix

- 修复 `Cascader` 在多选场景下点击下拉输入框无法自动聚焦的问题  ([#381](https://github.com/sheinsight/shineout-next/pull/381))
- 修复 `Cascader` 在失去焦点时筛选文本清空存在延迟的问题  ([#381](https://github.com/sheinsight/shineout-next/pull/381))
- 修复 `Cascader` 当 `renderItem` 返回 ReactElement 时，输入框可能会展示 `[object Object]` 的问题  ([#379](https://github.com/sheinsight/shineout-next/pull/379))
