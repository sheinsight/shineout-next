## 3.9.12-beta.9
2026-03-25

### 💎 Enhancement
- 优化 `TreeSelect` 多选模式下获取选中值时的性能，使用浅拷贝替代深拷贝以减少不必要的开销 ([#1667](https://github.com/sheinsight/shineout-next/pull/1667))

## 3.9.12-beta.8
2026-03-25

### 🆕 Feature
- `TreeSelect` 新增 `sortBySelect` 属性，开启后多选模式下的值数组将按照用户勾选的先后顺序排列 ([#1666](https://github.com/sheinsight/shineout-next/pull/1666))


## 3.9.11-beta.12
2026-03-20
### 🐞 BugFix
- 修复 `TreeSelect` 虚拟列表模式下设置 `defaultExpandAll` 后，折叠某个父节点会导致其他父节点异常折叠的问题 ([#1657](https://github.com/sheinsight/shineout-next/pull/1657))

## 3.9.11-beta.11
2026-03-19
### 🐞 BugFix
- 修复 `TreeSelect` 虚拟列表模式下 `actionOnClick` 不生效的问题 ([#1656](https://github.com/sheinsight/shineout-next/pull/1656))
- 修复 `TreeSelect` 虚拟列表模式下展开节点时滚动条闪烁的问题 ([#1656](https://github.com/sheinsight/shineout-next/pull/1656))


## 3.9.9-beta.14
2026-02-10
### 🐞 BugFix
- 修复 `TreeSelect` 通过粘贴文本搜索时可能出现搜索结果不更新的问题 ([#1621](https://github.com/sheinsight/shineout-next/pull/1621))


## 3.9.4-beta.1
2025-12-15

### 🆕 Feature
- `TreeSelect` 新增 `renderOptionList` 属性  ([#1530](https://github.com/sheinsight/shineout-next/pull/1530))


## 3.9.2-beta.4
2025-12-03

### 🐞 BugFix

- 修复 `TreeSelect` 的 `trim` 默认值与老版本不一致的问题 ([#1497](https://github.com/sheinsight/shineout-next/pull/1497))

## 3.9.0-beta.3
2025-10-14

### 🆕 Feature
- `TreeSelect` 新增 `checkOnFiltered` 属性，开启后勾选操作仅针对筛选后的数据生效 ([#1411](https://github.com/sheinsight/shineout-next/pull/1411))

## 3.8.6-beta.7
2025-10-13

### 🐞 BugFix
- 修复 `TreeSelect` 在大尺寸模式下的结果样式垂直不居中的问题 （Regression: since v3.7.2）([#1409](https://github.com/sheinsight/shineout-next/pull/1409))


## 3.8.5-beta.3
2025-09-28

### 🐞 BugFix
- 修复 `TreeSelect` 设置 `focusSelected` 为 false 不生效的问题 ([#1392](https://github.com/sheinsight/shineout-next/pull/1392))


## 3.8.3-beta.1
2025-09-15

### 🐞 BugFix
- 修复 `TreeSelect` 在 `onChange` 中删除原始引用值后，内部勾选情况未同步更新的问题 ([#1364](https://github.com/sheinsight/shineout-next/pull/1364))


## 3.8.0-beta.45
2025-08-22

### 🆕 Feature
- `TreeSelect` 新增 `onClear` 属性，支持监听清除事件 ([#1322](https://github.com/sheinsight/shineout-next/pull/1322))


## 3.7.10-beta.5
2025-08-15

### 🐞 BugFix
- 修复 `TreeSelect` 开启 `virtual` 后，预设值在面板首次打开时节点未高亮的问题 ([#1309](https://github.com/sheinsight/shineout-next/pull/1309))


## 3.7.8-beta.9
2025-07-25

### 🐞 BugFix
- 修复 `TreeSelect` 开启 `virtual` 后，滚动到底部后再搜索切换数据时，滚动条位置不正确的问题 ([#1266](https://github.com/sheinsight/shineout-next/pull/1266))


## 3.7.8-beta.6
2025-07-25

### 🐞 BugFix
- 修复 `TreeSelect` 的 `compressed` 属性在某些场景下，仅展示了合并数量而不展示第一项结果的问题 ([#1265](https://github.com/sheinsight/shineout-next/pull/1265))


## 3.7.5-beta.11
2025-07-04

### 🚀 Performance
- 优化 `TreeSelect` 的 `compressed` 在大数据场景下的性能表现 ([#1226](https://github.com/sheinsight/shineout-next/pull/1226))


## 3.7.2-beta.5
2025-06-13

### 🐞 BugFix
- 修复 `TreeSelect` 开启 `virtual` 后传入 undefined 数据导致死循环问题 ([#1172](https://github.com/sheinsight/shineout-next/pull/1172))


## 3.7.1-beta.8
2025-06-06

### 💅 Style
- `TreeSelect` 新增禁用选项的背景色 token ([#1163](https://github.com/sheinsight/shineout-next/pull/1163))


## 3.7.1-beta.3
2025-06-06

### 💎 Enhancement
- `TreeSelect` 增强 `disabled` 属性，支持动态 disabled ([#1156](https://github.com/sheinsight/shineout-next/pull/1156))


## 3.7.0-beta.32
2025-05-27

### 💎 Enhancement
- `TreeSelect` 增强 `size` 属性，下拉面板的列表尺寸跟随size联动 ([#1128](https://github.com/sheinsight/shineout-next/pull/1128))


## 3.7.0-beta.31
2025-05-27

### 🆕 Feature
- `TreeSelect` 新增 `highlight` 属性，开启搜索关键字高亮功能 ([#1126](https://github.com/sheinsight/shineout-next/pull/1126))


## 3.7.0-beta.27
2025-05-22

### 🐞 BugFix
- 修复 `TreeSelect` 的 `beforeChange` 不生效的问题 ([#1120](https://github.com/sheinsight/shineout-next/pull/1120))


## 3.7.0-beta.18
2025-05-07

### 🆕 Feature
- `TreeSelect` 新增 `renderCompressed` 属性，支持自定义渲染合并内容 ([#1099](https://github.com/sheinsight/shineout-next/pull/1099))


## 3.6.6-beta.4
2025-05-09

### 🐞 BugFix
- 修复 `TreeSelect`结果框高度不继承的问题  ([#1105](https://github.com/sheinsight/shineout-next/pull/1105))


## 3.6.6-beta.3
2025-05-07

### 💎 Enhancement
- `TreeSelect` 增强 `compressed` 属性，新增 `hide-popover` 模式隐藏合并后的选项，仅展示合并数量 ([#1098](https://github.com/sheinsight/shineout-next/pull/1098))


## 3.6.5-beta.1
2025-04-23

### 🐞 BugFix
- 修复 `TreeSelect` 在 `Popover` 中使用并且开启了compressed属性后，点击compressed弹出层中的删除条目时会引起样式异常的问题 ([#1079](https://github.com/sheinsight/shineout-next/pull/1079))


## 3.6.4-beta.8
2025-04-22

### 🐞 BugFix
- 修复 `TreeSelect` 在页面边界搜索时，下拉弹出层的位置未实时更新导致偏离父元素的问题 ([#1076](https://github.com/sheinsight/shineout-next/pull/1076))


## 3.6.4-beta.7
2025-04-18

### 🐞 BugFix
- 修复 `TreeSelect` 的 `onFilter` ts 类型和第二参数丢失的问题 ([#1073](https://github.com/sheinsight/shineout-next/pull/1073))


## 3.6.3-beta.6
2025-04-11

### 🆕 Feature
- `TreeSelect` 新增 `contentClass` 属性，功能同 `Tree` 组件属性 ([#1055](https://github.com/sheinsight/shineout-next/pull/1055))


## 3.6.3-beta.3
2025-04-11

### 🐞 BugFix
- 修复 `TreeSelect` 最大高度限制失效的问题（默认 max-height 应为 80px） ([#1051](https://github.com/sheinsight/shineout-next/pull/1051))


## 3.6.0
2025-03-20

### 🆕 Feature

- `TreeSelect` 新增 `actionOnClick` 属性，配置点击节点时的行为：`expand` 展开/收起节点，`check` 勾选或取消勾选节点 ([#986](https://github.com/sheinsight/shineout-next/pull/986))
- `TreeSelect` 新增 `virtual` 属性支持虚拟列表 ([#948](https://github.com/sheinsight/shineout-next/pull/948))


### 🐞 BugFix
- 修复 `TreeSelect` 输入过滤内容并选中选项后，输入内容无法默认全选的问题 ([#971](https://github.com/sheinsight/shineout-next/pull/971))


### 🚀 Performance
- 优化 `TreeSelect` 大数据量下的树形数据搜索性能 ([#877](https://github.com/sheinsight/shineout-next/pull/877))
- 优化 `TreeSelect` 在大数据量下同时被渲染很多个时的页面初始化性能问题 ([#877](https://github.com/sheinsight/shineout-next/pull/877))


## 3.4.4
2024-10-28

### 🐞 BugFix
- 修复 `TreeSelect` 组件无法拖拽选中 dom 内容的问题 ([#729](https://github.com/sheinsight/shineout-next/pull/729))


## 3.4.0
2024-09-19

### 🐞 BugFix
- 修复 `TreeSelect` 的 `filterDelay` 属性失效的问题 ([#672](https://github.com/sheinsight/shineout-next/pull/672))


## 3.3.3
2024-08-15

### 🆕 Feature
- 支持 `TreeSelect` 单选搜索时，展示非string类型的值(renderItem返回的结果) ([#605](https://github.com/sheinsight/shineout-next/pull/605))


## 3.2.4
2024-06-26



### 🐞 Style

- 优化 `TreeSelect` 单选结果的样式 ([#549](https://github.com/sheinsight/shineout-next/pull/549))


## 3.2.3
2024-06-25



### 🐞 BugFix

- 修复  `TreeSelect`  点击高亮逻辑问题 ([#545](https://github.com/sheinsight/shineout-next/pull/545))


## 3.1.24
2024-06-03



### 🐞 BugFix

- 修复  `TreeSelect`  异步加载数据时，选中结果没有更新的问题 ([#496](https://github.com/sheinsight/shineout-next/pull/496))


## 3.1.18
2024-05-27

### 💅 Style

- 优化 `TreeSelect` 合并选项的样式 ([#482](https://github.com/sheinsight/shineout-next/pull/482))


## 3.1.17
2024-05-24

### 🐞 BugFix

- 修复 `TreeSelect` 属性  `compressed` 无效的问题 ([#477](https://github.com/sheinsight/shineout-next/pull/477))


## 3.1.9
2024-05-14

### 🐞 BugFix

- 修复 `TreeSelect` 在单选的情况下会返回数组的问题 ([#440](https://github.com/sheinsight/shineout-next/pull/440))

- 修复 `TreeSelect` 单选后节点没有高亮的问题  ([#439](https://github.com/sheinsight/shineout-next/pull/439))


## 3.1.7
2024-05-11

### 🐞 BugFix

- 修复 `TreeSelect` 单选后节点没有高亮的问题 ([#439](https://github.com/sheinsight/shineout-next/pull/439))


## 3.1.6
2024-05-11

### 🐞 BugFix

- 修复 `TreeSelect` 本地筛选的时候防抖没有生效导致频繁渲染的问题 ([#428](https://github.com/sheinsight/shineout-next/pull/428))


## 3.1.0
2024-05-09

### 🆕 Feature
- `TreeSelect` 属性 `loader` 支持返回 Promise 来关闭加载状态 ([#417](https://github.com/sheinsight/shineout-next/pull/417))


## 3.0.11
2024-05-08

### 🐞 BugFix

- 修复 `TreeSelect` 在多选模式下，进行过滤后选择新项会导致原有选择项被覆盖的问题 ([#411](https://github.com/sheinsight/shineout-next/pull/411))
- 修复 `TreeSelect` 组件在渲染未匹配数据时可能出现的数据重复和无法删除的问题 ([#412](https://github.com/sheinsight/shineout-next/pull/412))


## 3.0.9
2024-04-26

### 🐞 BugFix

- 修复 `TreeSelect` 合并选项功能当数据动态变化或者宽度变化时没有动态更新的问题 ([#402](https://github.com/sheinsight/shineout-next/pull/402))


## 3.0.8
2024-04-26

### 🐞 BugFix

- 修复 `TreeSelect` noCache 属性无效的问题 ([#398](https://github.com/sheinsight/shineout-next/pull/398))


## 3.0.5
2024-04-24

### 🐞 BugFix

- 修复 `TreeSelect` 当清空输入框文本时会展示上次筛选内容的问题 ([#391](https://github.com/sheinsight/shineout-next/pull/391))


## 3.0.3
2024-04-22

### 🐞 BugFix

- 修复 `TreeSelect` 在多选场景下点击下拉输入框无法自动聚焦的问题 ([#380](https://github.com/sheinsight/shineout-next/pull/380))
- 修复 `TreeSelect` 在失去焦点时筛选文本清空存在延迟的问题 ([#380](https://github.com/sheinsight/shineout-next/pull/380))
- 修复 `TreeSelect` 当 `renderItem` 返回 ReactElement 时，输入框可能会展示 `[object Object]` 的问题 ([#379](https://github.com/sheinsight/shineout-next/pull/379))
