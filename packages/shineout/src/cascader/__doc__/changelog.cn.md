## 3.9.12-beta.9
2026-03-25

### 💎 Enhancement
- 优化 `Tree`/`TreeSelect`/`Cascader` 多选模式下获取选中值时的性能，使用浅拷贝替代深拷贝以减少不必要的开销 ([#1667](https://github.com/sheinsight/shineout-next/pull/1667))

## 3.9.12-beta.8
2026-03-25

### 🐞 BugFix
- 修复 `Cascader` 开启 `multiple` 但未设置 `mode` 时，勾选节点后选中状态立即回弹的问题 ([#1666](https://github.com/sheinsight/shineout-next/pull/1666))

### 🆕 Feature
- `Tree`/`TreeSelect`/`Cascader` 新增 `sortBySelect` 属性，开启后多选模式下的值数组将按照用户勾选的先后顺序排列 ([#1666](https://github.com/sheinsight/shineout-next/pull/1666))


## 3.9.0-beta.3
2025-10-14

### 🆕 Feature
- `Cascader` 新增 `checkOnFiltered` 属性，开启后勾选操作仅针对筛选后的数据生效 ([#1411](https://github.com/sheinsight/shineout-next/pull/1411))


## 3.9.0-beta.1
2025-10-13
### 💎 Enhancement
- 增强 `Cascader` 的 `renderOptionList` 属性，支持其在搜索结果面板也生效 ([#1395](https://github.com/sheinsight/shineout-next/pull/1395))

## 3.8.10-beta.3
2025-11-13

### 🐞 BugFix
- 修复 `Cascader` 动态加载场景父级节点无法勾选的问题 （Regression: since v3.7.5）([#1461](https://github.com/sheinsight/shineout-next/pull/1461))

## 3.8.6-beta.7
2025-10-13

### 🐞 BugFix
- 修复 `Cascader` 在大尺寸模式下的结果样式垂直不居中的问题 （Regression: since v3.7.2）([#1409](https://github.com/sheinsight/shineout-next/pull/1409))


## 3.8.2-beta.3
2025-09-09

### 🐞 BugFix
- 修复 `Cascader` 开启 `compressed` 时，在 `onFilter` 中重新设置 `data` 后可能报RangeError的问题 ([#1353](https://github.com/sheinsight/shineout-next/pull/1353))


## 3.8.1-beta.4
2025-09-03

### 🐞 BugFix
- 修复 `Cascader` 开启 `renderOptionList` 时，当数据为空时，`renderOptionList` 不渲染的问题 ([#1342](https://github.com/sheinsight/shineout-next/pull/1342))


## 3.8.0-beta.45
2025-08-22

### 🆕 Feature
- `Cascader` 新增 `onClear` 属性，支持监听清除事件 ([#1322](https://github.com/sheinsight/shineout-next/pull/1322))


## 3.8.0-beta.8
2025-06-23

### 🆕 Feature
- `Cascader` 新增 `showParent` 属性，支持显示父级节点 ([#1199](https://github.com/sheinsight/shineout-next/pull/1199))


## 3.7.10-beta.2
2025-08-11

### 🐞 BugFix
- 修复 `Cascader` 的 `renderCompressed` 在某些特殊交互后，自定义的Popover无法正常打开的问题 ([#1297](https://github.com/sheinsight/shineout-next/pull/1297))


## 3.7.8-beta.3
2025-07-23

### 🐞 BugFix
- 修复 `Cascader` 用 `renderOptionList` 做全选的场景下，输入框可能不能聚焦的问题 ([#1260](https://github.com/sheinsight/shineout-next/pull/1260))


## 3.7.5-beta.9
2025-07-04

### 🐞 BugFix
- 修复 `Cascader` 的 `expandTrigger` 为 `hover` 或 `hover-only` 时，多选模式下，勾选框点击失效的问题（Regression: since v3.7.3） ([#1224](https://github.com/sheinsight/shineout-next/pull/1224))


### 🚀 Performance
- 优化 `Cascader` 的 `compressed` 在大数据场景下的性能表现 ([#1224](https://github.com/sheinsight/shineout-next/pull/1224))


## 3.7.3-beta.7
2025-06-18

### 🐞 BugFix
- 修复 `Cascader` 多选模式下，末级叶子节点的勾选框点击失效的问题（Regression: since v3.7.2） ([#1192](https://github.com/sheinsight/shineout-next/pull/1192))


## 3.7.2-beta.1
2025-06-12

### 🐞 BugFix
- 修复 `Cascader` 多选模式下，末级叶子节点没有高亮路径的问题 ([#1165](https://github.com/sheinsight/shineout-next/pull/1165))


## 3.7.0-beta.34
2025-05-29

### 🐞 BugFix
- 修复 `Cascader` 外部受控打开的场景下，从外部修改 `value` 导致的面板勾选情况没有及时同步([#4e70d57](https://github.com/sheinsight/shineout-next/commit/4e70d57c6c01fc3d6f6031af3f8b590432e07a7a))


## 3.7.0-beta.31
2025-05-27

### 🆕 Feature
- `Cascader` 新增 `highlight` 属性，开启搜索关键字高亮功能 ([#1126](https://github.com/sheinsight/shineout-next/pull/1126))


## 3.7.0-beta.27
2025-05-22

### 🐞 BugFix
- 修复 `Cascader` 的 `beforeChange` 不生效的问题 ([#1120](https://github.com/sheinsight/shineout-next/pull/1120))


## 3.6.6-beta.4
2025-05-09

### 🐞 BugFix
- 修复 `Cascader`结果框高度不继承的问题  ([#1105](https://github.com/sheinsight/shineout-next/pull/1105))


## 3.6.6-beta.3
2025-05-07

### 💎 Enhancement
- `Cascader` 增强 `compressed` 属性，新增 `hide-popover` 模式隐藏合并后的选项，仅展示合并数量 ([#1098](https://github.com/sheinsight/shineout-next/pull/1098))


## 3.6.5-beta.1
2025-04-23

### 🐞 BugFix
- 修复 `Cascader` 在 `Popover` 中使用并且开启了compressed属性后，点击compressed弹出层中的删除条目时会引起样式异常的问题 ([#1079](https://github.com/sheinsight/shineout-next/pull/1079))


## 3.6.4-beta.6
2025-04-11

### 🐞 BugFix
- 修复 `Cascader` 设置了expandTrigger为hover后切换高亮路径后但不选中值，二次打开面板时高亮路径与选中值不匹配的问题 ([#1070](https://github.com/sheinsight/shineout-next/pull/1070))


## 3.6.3-beta.3
2025-04-11

### 🐞 BugFix
- 修复 `Cascader` 最大高度限制失效的问题（默认 max-height 应为 80px） ([#1051](https://github.com/sheinsight/shineout-next/pull/1051))


## 3.6.0
2025-03-18

### 🆕 Feature
- `Cascader` 新增 `emptyText` 属性，支持自定义空数据时的下拉列表内容 ([#971](https://github.com/sheinsight/shineout-next/pull/971))


### 🐞 BugFix
- 修复 `Cascader` mode=0时，外部动态修改data后导致的选中结果与勾选的显示情况不一致的问题 ([#999](https://github.com/sheinsight/shineout-next/pull/999))


## 3.5.8
2025-02-13

### 💎 Enhancement
- `Cascader` 新增 `disabled` 配置模式，支持实时计算 disabled 状态 ([#936](https://github.com/sheinsight/shineout-next/pull/936))
- `Cascader` 支持非 hover 的多选模式下，末级节点整个节点区域点击选中 Checkbox ([#927](https://github.com/sheinsight/shineout-next/pull/927))


### 🐞 BugFix
- 修复 `Cascader` 开启动态搜索后部分场景下父禁用子而可选的问题 ([#942](https://github.com/sheinsight/shineout-next/pull/942))
- 修复 `Cascader` 禁用状态下的箭头图标颜色不正确的问题 ([#930](https://github.com/sheinsight/shineout-next/pull/930))
- 修复 `Cascader` 多选模式下搜索时没有自动展开命中结果的问题（Regression: since v3.1.6） ([#926](https://github.com/sheinsight/shineout-next/pull/926))


## 3.5.6
2025-01-06

### 🐞 BugFix
- 修复 `Cascader` 在输入搜索过程中点击选项后 `onChange` 第二参数未返回的问题 ([#904](https://github.com/sheinsight/shineout-next/pull/904))
- 修复 `Cascader` 选择结果后箭头和关闭 icon 展示异常的问题 ([#903](https://github.com/sheinsight/shineout-next/pull/903))


## 3.5.1
2024-11-14

### 🐞 BugFix
- 修复 `Cascader` 在开启 `unmatch` 情况下指定 renderItem 为 string 类型时渲染异常的问题(Regression: since v3.5.0) ([#800](https://github.com/sheinsight/shineout-next/pull/800))
- 修复 `Cascader` 非虚拟列表情况下搜索内容溢出列表的问题 ([#798](https://github.com/sheinsight/shineout-next/pull/798))


### 🆕 Feature
- `Cascader` 单选模式下搜索结果列表支持虚拟列表 ([#798](https://github.com/sheinsight/shineout-next/pull/798))


## 3.5.0
2024-11-11

### 🆕 Feature
- `Cascader` 新增 `renderCompressed` 属性，自定义渲染折叠展示内容([#751](https://github.com/sheinsight/shineout-next/pull/751))
- `Cascader` 新增 `virtual` 属性，支持虚拟列表([#746](https://github.com/sheinsight/shineout-next/pull/746))


## 3.4.5
2024-10-31

### 🐞 BugFix
- 修复 `Cascader` 开启 `expandTrigger` 为 hover 或 hover-only 时点击 checkbox 勾选失效的问题 ([#770](https://github.com/sheinsight/shineout-next/pull/770))


## 3.4.4
2024-10-28

### 🐞 BugFix
- 修复 `Cascader` 无法拖拽选中 dom 内容的问题 ([#729](https://github.com/sheinsight/shineout-next/pull/729))


## 3.3.6
2024-09-02

### 🐞 BugFix
- 修复 `Cascader` 的 `onChange` 第二参数缺失的问题([#632](https://github.com/sheinsight/shineout-next/pull/632))


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
