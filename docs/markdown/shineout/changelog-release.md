# 更新日志

> 这里会有详细的发版记录,版本号严格遵循 Semver 规范

## 3.9.9
<span class="time">2026-02-02</span>
### 🆕 Feature
- `Popover` 新增全局配置项 `animation`，用于配置是否启用弹出动画效果 ([#1607](https://github.com/sheinsight/shineout-next/pull/1607))
### 🐞 BugFix
- 修复 `Select` 同时使用 `compressed='no-repeat'` 和 `renderCompressed` 时，`renderCompressed` 的 `data` 参数没有遵循 `no-repeat` 逻辑的问题 ([#1610](https://github.com/sheinsight/shineout-next/pull/1610))
- 修复 `Table` 树形数据在 `treeCheckAll=true` 时，父节点 disabled 后无法通过 thead 全选勾选其未 disabled 的子节点的问题 ([#1613](https://github.com/sheinsight/shineout-next/pull/1613))
- 修复 `Table` 的 `pagination.onChange` 第三个参数 `sizeChange` 为 `undefined` 的问题 ([#1608](https://github.com/sheinsight/shineout-next/pull/1608))
- 修复 `Tabs` 的 line 模式在 RTL 布局的微前端环境下初始化时可能出现下划线位置与 active 标题不对齐的问题 ([#1613](https://github.com/sheinsight/shineout-next/pull/1613))
- 修复 `Tabs` 动态添加 `Tabs.Panel` 时滚动位置重置而导致 active tab 不在视口内的问题 ([#1611](https://github.com/sheinsight/shineout-next/pull/1611))
- 修复 `Tooltip` 在 `tip` 属性动态从空值变为有值时，第一次鼠标移入无法显示的问题 ([#1614](https://github.com/sheinsight/shineout-next/pull/1614))
### 💅 Style
- 优化多个组件的样式细节和交互体验，修复 `ButtonGroup`、`Cascader` 等组件的若干问题 ([#1611](https://github.com/sheinsight/shineout-next/pull/1611))

## 3.9.8
<span class="time">2026-01-23</span>
### 🆕 Feature
- `DatePicker` 新增 `startOfWeek` 和 `weekShort` 属性，支持自定义一周的起始日和星期显示 ([#1592](https://github.com/sheinsight/shineout-next/pull/1592))
- `Form` 新增 `validateTrigger` 属性，支持配置校验触发时机（change | change-blur） ([#1571](https://github.com/sheinsight/shineout-next/pull/1571))
- `Progress` 新增 `animation` 属性：是否开启进度条动画效果 ([#1590](https://github.com/sheinsight/shineout-next/pull/1590))
### 🐞 BugFix
- 修复 `DatePicker` 设置 `inputable` 和 `min`/`max` 属性后，手动输入超出范围的日期失焦时仍然生效的问题 ([#1599](https://github.com/sheinsight/shineout-next/pull/1599))
- 修复 `Descriptions` 的非 border 模式的 inline 样式在 Table 组件内使用时显示多余边框的问题 ([#1589](https://github.com/sheinsight/shineout-next/pull/1589))
- 修复 `Input` 上误传的 `required` 属性透传到了 input 元素上的问题 ([#1601](https://github.com/sheinsight/shineout-next/pull/1601))
- 修复 `Input.Group` 未能正确传递 `name` 和 `rules` 属性给子组件的问题 ([#1584](https://github.com/sheinsight/shineout-next/pull/1584))
- 修复 `Menu` 的前置展开符的缩进问题 ([#1603](https://github.com/sheinsight/shineout-next/pull/1603))
- 修复 `Modal` 在 `Popover` 内部使用时，点击 Modal 会触发 Popover 的 clickAway 导致 Popover 意外关闭的问题 ([#1597](https://github.com/sheinsight/shineout-next/pull/1597))
- 修复 `Table` 同时开启 `virtualColumn` 和 checkbox 列时渲染列不全的问题 ([#1595](https://github.com/sheinsight/shineout-next/pull/1595))
- 修复 `Tag` 在 Promise 关闭时图标隐藏了的问题 ([#1593](https://github.com/sheinsight/shineout-next/pull/1593))
- 修复 `Textarea` 的 `clearable` 属性在禁用状态下仍然显示清除按钮的问题 ([#1586](https://github.com/sheinsight/shineout-next/pull/1586))
- 修复 `Tooltip` 的 `type` 为 light 时，箭头未居中对齐的样式问题 ([#1595](https://github.com/sheinsight/shineout-next/pull/1595))
### 💅 Style
- 优化多个组件的 RTL 模式样式 ([#1585](https://github.com/sheinsight/shineout-next/pull/1585))

## 3.9.7
<span class="time">2026-01-13</span>
### 🆕 Feature
- `Progress` 新增 `success` 属性，支持在进度条上层显示成功进度段，适用于 line 和 circle 两种形状 ([#1568](https://github.com/sheinsight/shineout-next/pull/1568))
- `Slider` 添加 `discrete` 属性，开启离散模式，拖拽时实时对齐到步长值([#1570](https://github.com/sheinsight/shineout-next/pull/1570))
- `Tabs.Panel` 支持透传 data-\* 属性到 tabs-header 元素上 ([#1567](https://github.com/sheinsight/shineout-next/pull/1567))
### 💎 Enhancement
- 增强 `Slider` 的 `disabled` 属性，支持函数格式，可根据当前值动态判断是否禁用([#1570](https://github.com/sheinsight/shineout-next/pull/1531))
### 🐞 BugFix
- 修复树形数据类的组件可能报 "Cannot read properties of undefined (reading 'children')" 错误的问题 ([#1575](https://github.com/sheinsight/shineout-next/pull/1575))
- 修复 `Image` 的 `error` 信息默认没有居中显示的问题 ([#1572](https://github.com/sheinsight/shineout-next/pull/1572))
- 修复 `Input.Number` 无法输入负数小数的问题，输入 `-0` 后负号被错误删除 ([#1577](https://github.com/sheinsight/shineout-next/pull/1577))
- 修复 `Menu` 的折叠图标在 Safari 浏览器中不显示的问题 ([#1576](https://github.com/sheinsight/shineout-next/pull/1576))
- 修复 `Tree` 受控高亮模式下无法通过设置 `active` 为 undefined 取消高亮的问题 ([#1574](https://github.com/sheinsight/shineout-next/pull/1574))
### 💅 Style
- 优化 normalize 和 jss-insertion-point 标签，增加 data-alita-ignore 属性，避免被微前端框架删除 ([#1578](https://github.com/sheinsight/shineout-next/pull/1578))

## 3.9.6
<span class="time">2026-01-07</span>
### 🆕 Feature
- `Menu` 新增 `getItemProps` 属性，支持为每个菜单项添加自定义属性（如埋点属性） ([#1555](https://github.com/sheinsight/shineout-next/pull/1555))
- `Menu` 支持在数据项中直接配置 `data-*` 属性并应用到对应的 DOM 元素上 ([#1555](https://github.com/sheinsight/shineout-next/pull/1555))
### 💎 Enhancement
- 增强 `Tooltip` 与 `Switch`、`Radio`、`Checkbox` 的兼容性 ([#1553](https://github.com/sheinsight/shineout-next/pull/1553))
### 🐞 BugFix
- 修复 `Select` 的 `renderItem` 函数第二参数 index 没有值的问题 ([#1560](https://github.com/sheinsight/shineout-next/pull/1560))
- 修复 `Table` 虚拟滚动时 checkbox 列 `rowSpan` 合并行的勾选状态异常问题 ([#1564](https://github.com/sheinsight/shineout-next/pull/1564))
- 修复 `Table` 的可伸缩列在点击下去但未拖拽时触发了列宽变化回调的问题 ([#1562](https://github.com/sheinsight/shineout-next/pull/1562))
- 修复 `Table` 在非虚拟列表模式且浏览器缩放时滚动到底部 `onScroll` 回调 `y` 值无法达到 1 的问题 ([#1557](https://github.com/sheinsight/shineout-next/pull/1557))
- 修复 `Tabs.Panel` 的 tab 属性传入带有 `to` 属性的自定义组件时渲染结构异常的问题 ([#1563](https://github.com/sheinsight/shineout-next/pull/1563))
- 修复 `Transfer` 对搜索数据进行全选后再点击取消全选时失效的问题 ([#1558](https://github.com/sheinsight/shineout-next/pull/1558))

## 3.9.5
<span class="time">2025-12-29</span>
### 🐞 BugFix
- 修复 `Select`、`TreeSelect`、`Cascader` 非 string 类型的 `placeholder` 在有输入值时重复显示了的问题 ([#1551](https://github.com/sheinsight/shineout-next/pull/1551))
- 修复弹出层类组件在 CSS zoom 嵌套环境下使用 `absolute` 属性时位置偏移的问题 ([#1545](https://github.com/sheinsight/shineout-next/pull/1545))([#1546](https://github.com/sheinsight/shineout-next/pull/1546))
- 修复 `Descriptions` 的非 border 模式在 Table 组件内使用时显示多余边框的问题 ([#1547](https://github.com/sheinsight/shineout-next/pull/1547))
- 修复 `Input` 在 `Form` 中按回车提交时 `onEnterPress` 事件触发两次的问题 ([#1550](https://github.com/sheinsight/shineout-next/pull/1550))
- 修复 `Input.Group` 的 `innerTitle` 和 `placeTitle` 属性未能传递给子 Input 组件的问题 ([#1548](https://github.com/sheinsight/shineout-next/pull/1548))
- 修复 `Pagination` 重复点击相同页码时不触发 `onChange` 的问题 (Regression: since v3.2.3)([#1550](https://github.com/sheinsight/shineout-next/pull/1550))
- 修复 `Pagination` 在非受控模式下切换 pageSize 后点击页码会导致 pageSize 重置的问题 ([#1544](https://github.com/sheinsight/shineout-next/pull/1544))
- 修复 `Steps` 的 children 中包含 null 或 undefined 时导致的渲染错误问题 ([#1552](https://github.com/sheinsight/shineout-next/pull/1552))

## 3.9.4
<span class="time">2025-12-18</span>
### 🆕 Feature
- `Dropdown` 新增 `popupClassName`: 自定义弹出层的 className [#1533](https://github.com/sheinsight/shineout-next/pull/1533)）
- `Radio` 和 `Radio.Group` 新增 `renderWrapper` 属性：完全的自定义渲染 ([#1537](https://github.com/sheinsight/shineout-next/pull/1537))
- `TreeSelect` 新增 `renderOptionList` 属性 ([#1530](https://github.com/sheinsight/shineout-next/pull/1530))
### 🐞 BugFix
- 修复 `Select`、`TreeSelect`、`Cascader` 设置 `onFilter` 时，非 string 类型的 `placeholder` 不显示的问题 ([#1534](https://github.com/sheinsight/shineout-next/pull/1534))
- 修复 `Form` 的 `FieldSet` 嵌套使用时，某一项改变时触发了整个数组的校验的问题 (Regression: since v3.5.1) ([#1532](https://github.com/sheinsight/shineout-next/pull/1532))
- 修复 `Slider` 的 `formatScale` 和 `formatValue` 属性的 TS 类型 ([#1531](https://github.com/sheinsight/shineout-next/pull/1531))
- 修复 `Table` 的筛选功能从有数据进入空数据状态时可能出现列宽渲染错误的问题 ([#1535](https://github.com/sheinsight/shineout-next/pull/1535))
### 💅 Style
- 优化框类组件小尺寸字号下 `innerTitle` 的样式表现 ([#1536](https://github.com/sheinsight/shineout-next/pull/1536))

## 3.9.3
<span class="time">2025-12-11</span>
### 🆕 Feature
- `Tree` 新增 `filteredData` 属性，用于需过滤数据但勾选基于全量 data 的场景 ([#1511](https://github.com/sheinsight/shineout-next/pull/1511))([#1516](https://github.com/sheinsight/shineout-next/pull/1516))
### 💎 Enhancement
- `Table` 的 `virtualColumn` 支持对象格式配置，新增 `overscan` 参数用于自定义虚拟列的预渲染数量 ([#1517](https://github.com/sheinsight/shineout-next/pull/1517))
### 🚀 Performance
- 优化 `Table` 同时设置 `virtualColumn` 虚拟列和 virtual=lazy 虚拟行后的滚动表现 ([#1508](https://github.com/sheinsight/shineout-next/pull/1508))
### 🐞 BugFix
- 修复 `DatePicker` 时间格式匹配逻辑，正确处理时间戳格式 ([#1526](https://github.com/sheinsight/shineout-next/pull/1526))
- 修复 `DatePicker` 无值时默认时间字符串未按 `format` 格式展示的问题 ([#1526](https://github.com/sheinsight/shineout-next/pull/1526))
- 修复 `Form` 的 `FieldSet` 嵌套使用时，自定义校验规则在输入过程中可能不触发的问题 ([#1518](https://github.com/sheinsight/shineout-next/pull/1518))
- 修复 `Table` 的可展开行中嵌套 Table 时，子 Table 的固定列失效的问题 ([#1507](https://github.com/sheinsight/shineout-next/pull/1507))
### 💅 Style
- `setJssConfig` 支持设置 styleAttributes 属性 ([#1515](https://github.com/sheinsight/shineout-next/pull/1515))
- 重构多个组件的图标尺寸 token，从固定尺寸改为基于字体尺寸 ([#1505](https://github.com/sheinsight/shineout-next/pull/1505))

## 3.9.2
<span class="time">2025-12-05</span>
### 🆕 Feature
- `Menu` 新增 `inlineAnimate` 属性，支持 inline 模式下的子菜单折叠展开动画 ([#1484](https://github.com/sheinsight/shineout-next/pull/1484))([#1495](https://github.com/sheinsight/shineout-next/pull/1495))
### 🐞 BugFix
- 修复 `Form` 的 `FieldSet` 上自定义 rules 校验错误信息在 children 值变化时未正常显示的问题 ([#1492](https://github.com/sheinsight/shineout-next/pull/1492))
- 修复 `Modal` 函数式调用在特定销毁时序下可能报错的问题 ([#1493](https://github.com/sheinsight/shineout-next/pull/1493))
- 修复 `Pagination` 传入负数 `total` 时不隐藏的问题 ([#1503](https://github.com/sheinsight/shineout-next/pull/1503))
- 修复 `Select` 的 `trim` 默认值与老版本不一致的问题 ([#1497](https://github.com/sheinsight/shineout-next/pull/1497))
- 修复 `Table` 设置 `sticky` 属性和固定列后，表格顶部边框被遮挡的样式问题 ([#1498](https://github.com/sheinsight/shineout-next/pull/1498))
- 修复 `Tooltip` 在快速 hover 多个组件时可能出现不消失的问题 ([#1496](https://github.com/sheinsight/shineout-next/pull/1496))
- 修复 `TreeSelect` 的 `trim` 默认值与老版本不一致的问题 ([#1497](https://github.com/sheinsight/shineout-next/pull/1497))

## 3.9.1
<span class="time">2025-11-28</span>
### 🆕 Feature
- `Select`、`TreeSelect`、`Cascader` 组件新增 `popupClassName` 属性 ([#1489](https://github.com/sheinsight/shineout-next/pull/1489))
- `Select` 新增 `createOnBlur` 属性，控制开启 onCreate 时输入框失焦是否自动创建选项 ([#1486](https://github.com/sheinsight/shineout-next/pull/1486))
### 🐞 BugFix
- 修复 `Drawer` 的 `cascade` 属性只对相同 position 方位的 Drawer 应用 transform 偏移 ([#1490](https://github.com/sheinsight/shineout-next/pull/1490))
- 修复 `Input` 设置了 `delay` 为 0 后，失焦时触发了 `onChange` 的问题 ([#1487](https://github.com/sheinsight/shineout-next/pull/1487))
- 修复 `Rate` 只读状态下的小数显示 ([#1488](https://github.com/sheinsight/shineout-next/pull/1488))
- 修复 `Table` 可能出现高度为 0 的问题 (Regression: since v3.9.0-beta.26)([#1485](https://github.com/sheinsight/shineout-next/pull/1485))

## 3.9.0
<span class="time">2025-11-25</span>
### 🆕 Feature
- `Carousel` 新增 `defaultValue`、`value`、`onChange` 属性，支持受控/非受控模式以及索引变化回调 ([#1426](https://github.com/sheinsight/shineout-next/pull/1426))
- `Cascader` 新增 `checkOnFiltered` 属性，开启后勾选操作仅针对筛选后的数据生效 ([#1411](https://github.com/sheinsight/shineout-next/pull/1411))
- `DatePicker` 新增 `renderDate` 属性：支持定制日期单元格内容 ([#1468](https://github.com/sheinsight/shineout-next/pull/1468))
- `Drawer` 新增 `cascade` 属性，多层嵌套时父级自动偏移避免被遮挡（仅 left/right 位置生效） ([#1419](https://github.com/sheinsight/shineout-next/pull/1419))
- `Input.Group` 新增 `seamless` 属性：隐藏表单项之间的边框 ([#1408](https://github.com/sheinsight/shineout-next/pull/1408))
- `Modal` 新增 `headerStyle` 和 `footerStyle` 用于自定义头部和脚部样式 ([#1428](https://github.com/sheinsight/shineout-next/pull/1428))
- `Select` 新增 `virtual`: 开启树形数据的虚拟列表 ([#1454](https://github.com/sheinsight/shineout-next/pull/1454))
- `Table` 新增 `virtualColumn` 属性，设置后开启虚拟列能力 ([#1422](https://github.com/sheinsight/shineout-next/pull/1422))
- `Table` 新增 `strictRowHeight` 属性，强制统一行高，可提升虚拟滚动性能 ([#1415](https://github.com/sheinsight/shineout-next/pull/1415))
- `Tabs` 支持设置 css 变量实现角标功能 ([#1420](https://github.com/sheinsight/shineout-next/pull/1420))
- `Tag` 新增 orange 颜色类型 ([#1457](https://github.com/sheinsight/shineout-next/pull/1457))
- `TreeSelect` 新增 `checkOnFiltered` 属性，开启后勾选操作仅针对筛选后的数据生效 ([#1411](https://github.com/sheinsight/shineout-next/pull/1411))
### 💎 Enhancement
- 增强 `Cascader` 的 `renderOptionList` 属性，支持其在搜索结果面板也生效 ([#1395](https://github.com/sheinsight/shineout-next/pull/1395))
- 新增 utils.validate 方法的导出 ([#1479](https://github.com/sheinsight/shineout-next/pull/1479))
- 框类选择组件的结果增加原生 title 属性的显示 ([#1479](https://github.com/sheinsight/shineout-next/pull/1479))
- 优化组件动画过程中的交互响应，避免动画期间触发不必要的事件和重渲染([#1469](https://github.com/sheinsight/shineout-next/pull/1469))
- 增强 `setToken` 功能,支持设置 CSS 自定义属性(CSS Variables)格式的变量(如 `--variable-name`) ([#1421](https://github.com/sheinsight/shineout-next/pull/1421))
- 优化 `Input.Group` 下存在任意表单项的校验错误时，边框颜色能自动变为相应的错误颜色 ([#1412](https://github.com/sheinsight/shineout-next/pull/1412))
- 增强 `Table` 的筛选功能：支持树形数据 ([#1452](https://github.com/sheinsight/shineout-next/pull/1452))
- 优化 `Table` 空数据场景下的底部边框显示逻辑，在浏览器滚动条宽度为 0 时（如 macOS overlay scrollbar）显示底部边框 ([#1444](https://github.com/sheinsight/shineout-next/pull/1444))
- 增加 `Tag` 的 lineHeight 样式变量，以支持主题编辑器设置 ([#1423](https://github.com/sheinsight/shineout-next/pull/1423))
### 🚀 Performance
- 升级 `reactive` 包，修复潜在的 Symbol 变量覆盖问题 ([#1450](https://github.com/sheinsight/shineout-next/pull/1450))
- 优化 `Table` 的行高亮过渡动画效果，提升勾选交互性能（INP）([#1431](https://github.com/sheinsight/shineout-next/pull/1431))
### 🐞 BugFix
- 修复 `Select` 的虚拟列表经历搜索之后，可滚动高度与实际内容不符的问题 ([#1482](https://github.com/sheinsight/shineout-next/pull/1482))
- 修复 `Table` 的右固定列存在表头分组时，表头布局错乱的问题 ([#1478](https://github.com/sheinsight/shineout-next/pull/1478))
- 修复 `Table` 的祖先元素从 display:none 切换回来时，之前的滚动条位置没有保持住的问题 ([#1455](https://github.com/sheinsight/shineout-next/pull/1455))([#1463](https://github.com/sheinsight/shineout-next/pull/1463))
### 💅 Style
- 修改 `Alert` 的 danger 类型的图标 ([#1456](https://github.com/sheinsight/shineout-next/pull/1456))
- `Switch`、`Spin` 组件增强样式 token 配置([#1465](https://github.com/sheinsight/shineout-next/pull/1465))
- style 包新增 normalizeStyle、normalizeStyleId、jssInsertionPointId 的导出 ([#1448](https://github.com/sheinsight/shineout-next/pull/1448))
- `Tabs` 的--soui-tabs-line-padding-y 变量替换为--soui-tabs-line-padding-top 和--soui-tabs-line-padding-bottom ([#1451](https://github.com/sheinsight/shineout-next/pull/1451))

## 3.8.10
<span class="time">2025-11-20</span>
### 🚀 Performance
- 优化 `Form` 在 React 18 以上的并发渲染模式下且处于高负载渲染场景下的渲染 ([#1476](https://github.com/sheinsight/shineout-next/pull/1476))
### 🐞 BugFix
- 修复 `Cascader` 动态加载场景父级节点无法勾选的问题 （Regression: since v3.7.5）([#1461](https://github.com/sheinsight/shineout-next/pull/1461))
- 修复 `DatePicker` 的 `onPickerChange` 在切换年月时第三参数 areaType 不正确的问题 ([#1471](https://github.com/sheinsight/shineout-next/pull/1471))
- 修复 `DatePicker` 的 `selNow` 在异步的 `onChange` 赋值场景下触发两次的问题 ([#1466](https://github.com/sheinsight/shineout-next/pull/1466))
- 修复 `Descriptions` 的 horizontal 排列方式时所有子项的 value 都为空时的布局样式问题 ([#1464](https://github.com/sheinsight/shineout-next/pull/1464))
- 修复 `Descriptions` 合并列 `span` 属性和 inlineHorizontal 排列方式搭配使用时，合并列渲染不正确的问题 ([#1459](https://github.com/sheinsight/shineout-next/pull/1459))
- 修复 `List` 使用 `scrollLoading` 滚动加载第二页数据时,列表闪回到第一条数据的问题 ([#1472](https://github.com/sheinsight/shineout-next/pull/1472))
- 修复 `Select` 下拉框滚动位置丢失问题 （Regression: since v3.7.1）([#1473](https://github.com/sheinsight/shineout-next/pull/1473))
- 修复 `Select` 多选模式下，`renderItem` 返回的是数字 0 时不回显的问题 ([#1460](https://github.com/sheinsight/shineout-next/pull/1460))
- 修复 `Table` 列配置中 `title` 为空字符串时，表头单元格的下边框不显示的问题 ([#1470](https://github.com/sheinsight/shineout-next/pull/1470))

## 3.8.9
<span class="time">2025-11-05</span>
### 🐞 BugFix
- 修复 `Select` 的 `emptyAfterSelect` 设置为 false 不生效的问题 ([#1449](https://github.com/sheinsight/shineout-next/pull/1449))
- 修复 `Table` 在某些场景下因 Hooks 调用顺序不一致导致的渲染错误（Regression: since v3.8.8-beta.6）([#1446](https://github.com/sheinsight/shineout-next/pull/1446))
- 修复 `Table` 有合并列的表头同时设置为右固定列时，可能出现表头的布局错乱的问题 ([#1445](https://github.com/sheinsight/shineout-next/pull/1445))
- 修复 `Empty` 组件的 `emptyNoData` 图标在页面存在多个实例时，除第一个外其他图标的渐变和滤镜效果不生效的问题（SVG ID 冲突） ([#1445](https://github.com/sheinsight/shineout-next/pull/1445))

## 3.8.8
<span class="time">2025-10-29</span>
### 💎 Enhancement
- 支持自定义 data 属性透传至对应 DOM 节点 ([#1429](https://github.com/sheinsight/shineout-next/pull/1429))
### 🚀 Performance
- 优化 `Table` 的虚拟列表下存在弹出层类组件的性能 ([#1437](https://github.com/sheinsight/shineout-next/pull/1437))
### 🐞 BugFix
- 修复 `Rule` 内置校验规则的 Error.message 未跟随国际化显示的问题 ([#1433](https://github.com/sheinsight/shineout-next/pull/1433))
- 修复 `Select` 的 `onCreate` 函数参数的 TS 类型不正确的问题 ([#1434](https://github.com/sheinsight/shineout-next/pull/1434))
- 修复 `Select` 的 `renderResult` 中使用了弹出层类组件且开启了 `onFilter` 后，聚焦输入框时出现额外文本内容的问题 ([#1432](https://github.com/sheinsight/shineout-next/pull/1432))
- 修复 `Table` 设置的 `rowsInView` 偏小时容器底部有空白的问题 ([#1435](https://github.com/sheinsight/shineout-next/pull/1435))

## 3.8.7
<span class="time">2025-10-24</span>
### 🚀 Performance
- 优化 `Table` 的虚拟滚动性能 ([#1414](https://github.com/sheinsight/shineout-next/pull/1414))
### 🐞 BugFix
- 修复 `Breadcrumb` 设置 `max` 大于或等于 `data` 长度时，末尾多了个斜线的问题 ([#1424](https://github.com/sheinsight/shineout-next/pull/1424))
- 修复 `Breadcrumb` 设置 `max` 属性且设置了自定义的 `renderItem` 后，超宽标题的 Tooltip 弹出效果不展示的问题([#1418](https://github.com/sheinsight/shineout-next/pull/1418))
- 修复 `Form` 的 rules 正则校验的值是数字类型时不通过的错误 ([#1417](https://github.com/sheinsight/shineout-next/pull/1417))
- 修复 `Input.Number` 在有值时未设置 `showClear` 但常驻显示了清除图标的问题 ([#1413](https://github.com/sheinsight/shineout-next/pull/1413))

## 3.8.6
<span class="time">2025-10-13</span>
### 💎 Enhancement
- 优化 `Menu` 垂直模式下子级菜单高度超出窗口后的展示效果 ([#1404](https://github.com/sheinsight/shineout-next/pull/1404))
- 优化 `Tooltip` 在设置了非 `auto` 位置时的滚动跟随行为，提升用户体验 ([#1401](https://github.com/sheinsight/shineout-next/pull/1401))
### 🐞 BugFix
- 修复 `Cascader` 在大尺寸模式下的结果样式垂直不居中的问题 （Regression: since v3.7.2）([#1409](https://github.com/sheinsight/shineout-next/pull/1409))
- 修复 `Divider` 带文字的分割线样式在微前端下不正常显示的问题 ([#1403](https://github.com/sheinsight/shineout-next/pull/1403))
- 修复 `Modal` 方法形式调用时在低性能设备上可能出现的关闭时闪烁一下的问题 ([#1406](https://github.com/sheinsight/shineout-next/pull/1406))
- 修复 `Select` 在大尺寸模式下的结果样式垂直不居中的问题 （Regression: since v3.7.2）([#1409](https://github.com/sheinsight/shineout-next/pull/1409))
- 修复 `TreeSelect` 在大尺寸模式下的结果样式垂直不居中的问题 （Regression: since v3.7.2）([#1409](https://github.com/sheinsight/shineout-next/pull/1409))

## 3.8.5
<span class="time">2025-09-30</span>
### 🐞 BugFix
- 修复 `DatePicker` 的 `type` 为 week 时，`needConfirm` 属性不生效的问题 ([#1398](https://github.com/sheinsight/shineout-next/pull/1398))
- 修复 `Input` 的 `onEnterPress` 事件的第二参数 ts 类型错误问题 ([#1396](https://github.com/sheinsight/shineout-next/pull/1396))
- 修复 `Modal` 组件在多层嵌套使用且设置了 `destroy` 属性时，关闭后 body 滚动条不可见的问题 ([#1389](https://github.com/sheinsight/shineout-next/pull/1389))
- 修复 `Select` 设置 `focusSelected` 为 false 不生效的问题 ([#1392](https://github.com/sheinsight/shineout-next/pull/1392))
- 修复 `Tabs` 的 card 模式下 prev 和 next 按钮的样式问题 ([#1396](https://github.com/sheinsight/shineout-next/pull/1396))
- 修复 `Textarea` 的 `onEnterPress` 事件的第二参数 ts 类型错误问题 ([#1396](https://github.com/sheinsight/shineout-next/pull/1396))
- 修复 `Tooltip` 存在动态属性时报"Rendered fewer hooks than expected" 错误 (Regression: since 3.8.4) ([#1390](https://github.com/sheinsight/shineout-next/pull/1390))
- 修复 `TreeSelect` 设置 `focusSelected` 为 false 不生效的问题 ([#1392](https://github.com/sheinsight/shineout-next/pull/1392))

## 3.8.4
<span class="time">2025-09-26</span>
### 💎 Enhancement
- 优化 `Table` 在设置了 `virtual` 且样式中有 maxHeight 但无 height 时的渲染性能，避免表格内容变化引起的不必要重新渲染 ([#1379](https://github.com/sheinsight/shineout-next/pull/1379))
### 🐞 BugFix
- 修复 `Dropdown` 二级子菜单弹出层在极端边界场景下溢出窗口的问题 [#1385](https://github.com/sheinsight/shineout-next/pull/1385)）
- 修复 `Popover` 的 `position` 为水平方向时设置 `adjust` 属性后没有自动调整位置的问题 [#1385](https://github.com/sheinsight/shineout-next/pull/1385)）
- 修复 `Table` 在存在右固定列且浏览器滚动条宽度为 0（通常发生在 macOS 上）时，固定列和头部垂直不对齐的问题 ([#1380](https://github.com/sheinsight/shineout-next/pull/1380))
- 修复 `Tabs` 的 line 模式在微前端环境下初始化时可能出现下划线位置与 active 标题不对齐的问题 ([#1384](https://github.com/sheinsight/shineout-next/pull/1384))
- 修复 `Tabs` 的 card 模式下 `hideSplit` 属性失效的问题 ([#1383](https://github.com/sheinsight/shineout-next/pull/1383))
- 修复 `Textarea` 在 Safari 浏览器中使用 autosize 时，高度不正确的问题 (Regression: since v3.7.9) ([#1377](https://github.com/sheinsight/shineout-next/pull/1377))
- 修复 `Tooltip` 在 `persistent` 模式下 children 的 `onMouseEnter`、`onMouseLeave`、`onClick` 事件会触发两次的问题 ([#1386](https://github.com/sheinsight/shineout-next/pull/1386))
- 修复 `Upload.Button` 在限制上传数量为 1 时，上传一个文件后按钮消失不见的问题 ([#1387](https://github.com/sheinsight/shineout-next/pull/1387))
- 修复 `Upload` 上传结果的图标在 Safari 浏览器中不可见的问题 ([#1378](https://github.com/sheinsight/shineout-next/pull/1378))

## 3.8.3
<span class="time">2025-09-19</span>
### 💎 Enhancement
- 增强 `Empty` 通过 `setConfig` 设置的属性，使其能够响应式的更新 ([#1365](https://github.com/sheinsight/shineout-next/pull/1365))
- 增强 `Select` 的 `groupBy` 属性，支持返回 React 组件，用于自定义渲染分组标题 ([#1366](https://github.com/sheinsight/shineout-next/pull/1366))
### 🐞 BugFix
- 修复 `Input` 初始化时 value 为数字 0 的时候可清除按钮显示不正确的问题 （Regression: since v3.8.0） ([#1374](https://github.com/sheinsight/shineout-next/pull/1374))
- 修复 `Select` 的 `data` 传入树形数据且存在重复 id 数据时，渲染的结果可能不正确的问题 ([#1369](https://github.com/sheinsight/shineout-next/pull/1369))
- 修复 `Select` 同时处于 `disabled` 和校验失败状态下时背景颜色不正确的问题 ([#1368](https://github.com/sheinsight/shineout-next/pull/1368))
- 修复 `Table` 在定高且 `data` 数量不足以撑满高度时，底部总结栏的位置不正确的问题 ([#1372](https://github.com/sheinsight/shineout-next/pull/1372))
- 修复 `TreeSelect` 在 `onChange` 中删除原始引用值后，内部勾选情况未同步更新的问题 ([#1364](https://github.com/sheinsight/shineout-next/pull/1364))

## 3.8.2
<span class="time">2025-09-12</span>
### 💎 Enhancement
- 增强 `Table` 的 `showTopScrollbar` 属性设置，支持设置滚动容器 ([#1356](https://github.com/sheinsight/shineout-next/pull/1356))
### 🐞 BugFix
- 修复 `Cascader` 开启 `compressed` 时，在 `onFilter` 中重新设置 `data` 后可能报 RangeError 的问题 ([#1353](https://github.com/sheinsight/shineout-next/pull/1353))
- 修复 `Form.FieldSet` 的 children 函数用法的 value 参数是基本类型时渲染不正确的问题 (Regression: since v3.8.0) ([#1352](https://github.com/sheinsight/shineout-next/pull/1352))
- 修复 `Modal` 设置了 `fullScreen` 属性后 `footer` 可能被遮挡的样式问题 ([#1335](https://github.com/sheinsight/shineout-next/pull/1335))
- 修复 `Table` 不定设置固定高度的虚拟列表下，compressed 弹出层内部无法滚动的问题 （Regression: since v3.7.7） ([#1358](https://github.com/sheinsight/shineout-next/pull/1358))

## 3.8.1
<span class="time">2025-09-05</span>
### 🆕 Feature
- `Tooltip` 新增 `mouseLeaveDelay` 属性，用于设置鼠标移出后延迟隐藏组件，单位为毫秒 ([#1348](https://github.com/sheinsight/shineout-next/pull/1348))
### 🐞 BugFix
- 修复 `Cascader` 开启 `renderOptionList` 时，当数据为空时，`renderOptionList` 不渲染的问题 ([#1342](https://github.com/sheinsight/shineout-next/pull/1342))
- 修复 `Drawer` 设置了 `destroy` 属性后，html 元素的 overflow 样式无法正常销毁的问题 (Regression: since v3.8.0) ([#1336](https://github.com/sheinsight/shineout-next/pull/1336))
- 修复 `Form` 设置了 `name` 属性用法下的 TreeSelect 组件的 keygen 函数报错问题 (Regression: since v3.8.0) ([#1347](https://github.com/sheinsight/shineout-next/pull/1347))
- 修复 `Select` 开启 `renderOptionList` 后，当数据为空时，`renderOptionList` 不渲染的问题 ([#1337](https://github.com/sheinsight/shineout-next/pull/1337))
- 修复 `Table` 在可展开行内嵌套使用时，斑马纹样式不正确的问题 ([#1345](https://github.com/sheinsight/shineout-next/pull/1345))
### 💅 Style
- 优化 `Steps` 设置了 `labelPlacement` 属性后标题布局超出情况下的展示效果 ([#1346](https://github.com/sheinsight/shineout-next/pull/1346))
- 优化 `Steps` 垂直方向下 `description`的样式，支持换行 ([#1341](https://github.com/sheinsight/shineout-next/pull/1341))

## 3.8.0
<span class="time">2025-08-27</span>
### 🆕 Feature
- `Cascader` 新增 `onClear` 属性，支持监听清除事件 ([#1322](https://github.com/sheinsight/shineout-next/pull/1322))
- `Cascader` 新增 `showParent` 属性，支持显示父级节点 ([#1199](https://github.com/sheinsight/shineout-next/pull/1199))
- `Form` 的 `FormRef` 新增 `getFormSchema` 方法，用于获取表单结构的标准 JSON Schema ([#1281](https://github.com/sheinsight/shineout-next/pull/1281))
- `Form.Field` 新增 `clearToUndefined` 属性，当字段有 defaultValue 时，清空时可设置为 undefined ([#1238](https://github.com/sheinsight/shineout-next/pull/1238))
- `Input` 新增 `showClear` 属性，支持有值时，是否常驻显示清除按钮，优先级高于 `clearable` ([#1197](https://github.com/sheinsight/shineout-next/pull/1197))
- `List` 新增 `dynamicHeight` 属性，开启不定高虚拟列表功能，需要同时设置 `fixed` 为 true ([#1213](https://github.com/sheinsight/shineout-next/pull/1213))
- `Modal` 新增 `containerClassName`，设置挂载容器的 className ([#1318](https://github.com/sheinsight/shineout-next/pull/1318))
- `Pagination` 新增 `sizeListProps` 属性，兼容旧版本 ([#1316](https://github.com/sheinsight/shineout-next/pull/1316))
- `Select` 新增 `onClear` 属性，支持监听清除事件 ([#1322](https://github.com/sheinsight/shineout-next/pull/1322))
- `Select` 新增 `preventEnterSelect` 属性，开启 onCreate 时可阻止回车选中已有选项，仅创建选项 ([#1214](https://github.com/sheinsight/shineout-next/pull/1214))
- `Sticky` 新增 `stickyBoundary` 属性，当滚动到指定位置或与指定元素底部重合时，取消 sticky ([#1240](https://github.com/sheinsight/shineout-next/pull/1240))
- `Table` 新增 `cellSortable` 属性，支持点击单元格触发排序 ([#1188](https://github.com/sheinsight/shineout-next/pull/1188))
- `Tooltip` 新增 `popupGap` 属性，用于设置弹出层与目标元素的间距 ([#1162](https://github.com/sheinsight/shineout-next/pull/1162))
- `Transfer` 新增 `highlight` 属性，开启搜索关键字高亮功能 ([#1174](https://github.com/sheinsight/shineout-next/pull/1174))
- `TreeSelect` 新增 `onClear` 属性，支持监听清除事件 ([#1322](https://github.com/sheinsight/shineout-next/pull/1322))
### 💎 Enhancement
- 增加 `Radio` 和 `Checkbox` 的选中动画效果 ([#1230](https://github.com/sheinsight/shineout-next/pull/1230))
- 增强 `Empty` 的 `icon` 和 `description` 属性，支持通过 `setConfig` 进行全局配置 ([#1282](https://github.com/sheinsight/shineout-next/pull/1282))
- 增强 `Input` 的 `info` 属性，支持配置提示信息的位置和挂载点 ([#1189](https://github.com/sheinsight/shineout-next/pull/1189))
- 增加 `Popover` 的弹出动画效果 ([#1173](https://github.com/sheinsight/shineout-next/pull/1173))
- 优化 `Tooltip` 的弹出动画，增加缩放效果 ([#1173](https://github.com/sheinsight/shineout-next/pull/1173))
### 🐞 BugFix
- 修复 `Checkbox` 外层套 `<label>` 标签时双重触发导致无法正常勾选的问题 ([#1307](https://github.com/sheinsight/shineout-next/pull/1307))
- 修复 `utils` 导出名称错误的问题 ([#1187](https://github.com/sheinsight/shineout-next/pull/1187))
- 修复 `DatePicker` 的 `range`模式下且设置了 name 时，在 `onPickerChange` 中设置 undefined 后无法选中值的问题 ([#1326](https://github.com/sheinsight/shineout-next/pull/1326))
- 修复 `DatePicker` 的时间范围选择器设置的 `min` 、 `max`、`defaultTime` 属性不生效的问题 ([#1301](https://github.com/sheinsight/shineout-next/pull/1301))
- 修复 `Form.Field` 的 `name` 为数组时，错误信息重复渲染的问题 ([#1299](https://github.com/sheinsight/shineout-next/pull/1299))
- 修复 `Form.FieldSet` 的 children 函数用法的 value 参数在某些场景下获取不到最新值的问题 ([#1295](https://github.com/sheinsight/shineout-next/pull/1295))
- 修复 `Image` 的 `lazy` 属性在高度受限的容器中使用时，图片可能无法加载的问题 ([#1293](https://github.com/sheinsight/shineout-next/pull/1293))
- 修复 `Modal` 组件在多层嵌套使用时，重复两次打开关闭后出现的 body 滚动条不可见的问题 ([#1321](https://github.com/sheinsight/shineout-next/pull/1321))
- 修复 `Modal` 方法调用方式时，点击 OK 按钮后触发了 `onClose` 事件的问题 ([#1315](https://github.com/sheinsight/shineout-next/pull/1315))
- 修复 `Modal` 的 panel 面板的 margin 样式问题 ([#1298](https://github.com/sheinsight/shineout-next/pull/1298))
- 修复 `Modal` 关闭后，外部意外的移除了组件样式后，弹出层暴露出来的问题 ([#1289](https://github.com/sheinsight/shineout-next/pull/1289))
- 修复 `Popover` 关闭后，外部意外的移除了组件样式后，弹出层暴露出来的问题 ([#1289](https://github.com/sheinsight/shineout-next/pull/1289))
- 修复 `Radio.Group` 设置的函数式 `disabled` 导致的子 Radio 组件(非推荐用法)都被禁用的问题 ([#1314](https://github.com/sheinsight/shineout-next/pull/1314))
- 修复 `Select` 开启 `onCreate` 且开启 `renderUnmatched` 时，渲染结果与老版本不一致的问题 ([#1312](https://github.com/sheinsight/shineout-next/pull/1312))
- 修复 `Table` 设置了 `showBottomScrollbar` 属性后可能出现双滚动条的问题 ([#1320](https://github.com/sheinsight/shineout-next/pull/1320))
- 修复 `Tabs` 的 line 模式在微前端环境下初始化时可能出现下划线不可见的问题 ([#1310](https://github.com/sheinsight/shineout-next/pull/1310))
- 修复 `Tabs` 在外部容器设置了缩放后，下划线不居中对齐的问题 ([#1258](https://github.com/sheinsight/shineout-next/pull/1258))
- 修复 `Tooltip` 关闭后，外部意外的移除了组件样式后暴露出来的问题 ([#1323](https://github.com/sheinsight/shineout-next/pull/1323))
- 修复 `Upload` 自定义的 `request` 没有处理 onProgress 事件时，没有加载状态的问题 ([#1319](https://github.com/sheinsight/shineout-next/pull/1319))
### 💅 Style
- 优化 `normalize` 和 `jss` 样式的插入位置，默认插入到 `document.head` 最前面 ([#1231](https://github.com/sheinsight/shineout-next/pull/1231))

## 3.7.11
<span class="time">2025-08-28</span>
### 🐞 BugFix
- 修复 `Form` 的校验错误信息在列表数据更新后丢失的问题 ([#1327](https://github.com/sheinsight/shineout-next/pull/1327))
- 修复 `Input.Number` 的 `coin` 属性不生效，与 v1 v2 表现不一致的问题 ([#1324](https://github.com/sheinsight/shineout-next/pull/1324))
- 修复 `Message` 在 bottom-left 和 bottom-right 位置手动关闭弹窗时可能出现动画闪一下的问题 ([#1325](https://github.com/sheinsight/shineout-next/pull/1325))
- 修复 `Popover` 的 `defaultVisible` 属性不生效的问题 ([#1328](https://github.com/sheinsight/shineout-next/pull/1328))

## 3.7.10
<span class="time">2025-08-15</span>
### 🐞 BugFix
- 修复 `Cascader` 的 `renderCompressed` 在某些特殊交互后，自定义的 Popover 无法正常打开的问题 ([#1297](https://github.com/sheinsight/shineout-next/pull/1297))
- 优化 `Select` 开启 `columns` 后，列表上方的全选字样支持多语言配置 ([#1294](https://github.com/sheinsight/shineout-next/pull/1294))
- 修复 `TreeSelect` 开启 `virtual` 后，预设值在面板首次打开时节点未高亮的问题 ([#1309](https://github.com/sheinsight/shineout-next/pull/1309))
- 修复 `Tree` 在设置了 `defaultExpandAll` 后，组件初始化完再更改数据导致默认展开不生效的问题 ([#1261](https://github.com/sheinsight/shineout-next/pull/1261))

## 3.7.9
<span class="time">2025-08-06</span>
### 🐞 BugFix
- 修复 `Popover` 当 `children` 为函数时，在组件挂载时就执行，表现与老版本不一致的问题 ([#1288](https://github.com/sheinsight/shineout-next/pull/1288))
- 修复 `Radio.Group` 在嵌套使用时，内层 `Radio.Group` 的勾选状态不符合预期的问题 ([#1291](https://github.com/sheinsight/shineout-next/pull/1291))
- 修复 `Sticky` 在非 CSS 模式下用户传入的 `zIndex` 样式未应用到最外层容器的问题 ([#1279](https://github.com/sheinsight/shineout-next/pull/1279))
- 修复 `Table` 快速横滚时可能出现的固定列被瞬时遮挡一下的问题 ([#1287](https://github.com/sheinsight/shineout-next/pull/1287))([#1290](https://github.com/sheinsight/shineout-next/pull/1290))
- 修复 `Table` 虚拟列表模式下合并行 `checkbox` 状态丢失的问题 ([#1280](https://github.com/sheinsight/shineout-next/pull/1280))
- 修复 `Table` 在数据为空时，底部总结行依然会展示，表现与 v1 v2 不一致的问题 ([#1278](https://github.com/sheinsight/shineout-next/pull/1278))
- 修复 `Textarea` 启动 autosize 后输入内容后高度自动变高的问题 (Regression: since v3.7.6) ([#1229](https://github.com/sheinsight/shineout-next/pull/1229))

## 3.7.8
<span class="time">2025-07-29</span>
### 💎 Enhancement
- `DatePicker` 增强 `disabledTime` 在开启 `range` 且为函数模式下的返回参数 ([#1259](https://github.com/sheinsight/shineout-next/pull/1259))
### 🐞 BugFix
- 修复 `Cascader` 用 `renderOptionList` 做全选的场景下，输入框可能不能聚焦的问题 ([#1260](https://github.com/sheinsight/shineout-next/pull/1260))
- 修复 `Dropdown` 的 `trigger` 为 `hover` 且设置 `absolute` 时，鼠标移入下拉框后下拉框自动消失的问题 (Regression: since v3.7.5) [#1262](https://github.com/sheinsight/shineout-next/pull/1262)）
- 修复 `Form` 对 `onChange` 的返回值直接修改数据后再设置新 value 不生效的问题 ([#1272](https://github.com/sheinsight/shineout-next/pull/1272))([#1257](https://github.com/sheinsight/shineout-next/pull/1257))
- 修复 `Pagination` 的 `select` 下拉框在限制了高度的 html 或 body 滚动容器中第一次点击不出现的问题 ([#1270](https://github.com/sheinsight/shineout-next/pull/1270))
- 修复 `Select` 开启 `columns` 后，滚动容器的内边距不正确的样式问题 ([#1274](https://github.com/sheinsight/shineout-next/pull/1274))
- 修复 `Select` 过滤过程中受 `trim` 属性影响，表现与老版本（v1、v2）不一致的问题 ([#1267](https://github.com/sheinsight/shineout-next/pull/1267))
- 修复 `TreeSelect` 开启 `virtual` 后，滚动到底部后再搜索切换数据时，滚动条位置不正确的问题 ([#1266](https://github.com/sheinsight/shineout-next/pull/1266))
- 修复 `TreeSelect` 的 `compressed` 属性在某些场景下，仅展示了合并数量而不展示第一项结果的问题 ([#1265](https://github.com/sheinsight/shineout-next/pull/1265))
- 修复 `Tree` 动态数据时，存在 children 为 undefined 导致报错的问题 ([#1261](https://github.com/sheinsight/shineout-next/pull/1261))

## 3.7.7
<span class="time">2025-07-18</span>
### 🐞 BugFix
- 修复 `DatePicker` 设置了不包含时间相关的 `format` 格式后，时间面板依然可弹出但无选项的问题 ([#1243](https://github.com/sheinsight/shineout-next/pull/1243))
- 修复 `Form.FieldSet` 的 `onAppend` 和 `onInsert` 在非末尾的位置插入插入 undefined 时，children 的表单组件不渲染的问题 ([#1252](https://github.com/sheinsight/shineout-next/pull/1252))
- 修复 `Input` 的 `autoSelect` 属性在某些场景下无法自动选中所有文本的问题 ([#1245](https://github.com/sheinsight/shineout-next/pull/1245))
- 修复 `Popover` 嵌套使用时，父子的 position 不相同时，子元素的箭头位置不正确的问题 ([#1247](https://github.com/sheinsight/shineout-next/pull/1247))
- 修复 `Table` 的 `scrollToIndex` 方法滚动位置计算不准确的问题 （Regression: since v3.7.0） ([#1250](https://github.com/sheinsight/shineout-next/pull/1250))
- 修复 `Table` 的 thead 或 tfoot 存在动态高度时，虚拟列表的最后一条数据看不全的问题 （Regression: since v3.7.0） ([#1249](https://github.com/sheinsight/shineout-next/pull/1249))
- 修复 `Table` 在 `Popover` 中使用虚拟列表时，二次打开弹窗后虚拟列表失效，渲染了全量数据的问题 （Regression: since v3.7.0） ([#1248](https://github.com/sheinsight/shineout-next/pull/1248))
- 修复 `Upload` 的父容器点击事件触发两次的问题 ([#1253](https://github.com/sheinsight/shineout-next/pull/1253))
- 修复 `Upload.Image` 不限制 `accept` 时选择非图片格式文件内部校验不通过后，报错信息无内容的问题 ([#1242](https://github.com/sheinsight/shineout-next/pull/1242))

## 3.7.6
<span class="time">2025-07-10</span>
### 💎 Enhancement
- `Breadcrumb` 设置 `max` 属性后，新增 Popover 展示完整菜单路径 ([#1234](https://github.com/sheinsight/shineout-next/pull/1234))
### 🐞 BugFix
- 修复 `Select` 开启 `onLoadMore` 加载新数据时列表重置到第一条的问题(Regression: since v3.7.1) ([#1237](https://github.com/sheinsight/shineout-next/pull/1237))
- 修复 `Select` 开启 `highlight` 后在 renderItem 中渲染非单层 dom 结构功能失效的问题 ([#1232](https://github.com/sheinsight/shineout-next/pull/1232))
- 修复 `Textarea` 在 flex 容器中使用时，可能存在的内部 textarea 元素与外部容器高度不一致的问题 ([#1229](https://github.com/sheinsight/shineout-next/pull/1229))

## 3.7.5
<span class="time">2025-07-04</span>
### 🚀 Performance
- 优化 `Cascader` 的 `compressed` 在大数据场景下的性能表现 ([#1224](https://github.com/sheinsight/shineout-next/pull/1224))
- 优化 `Select` 的 `compressed` 在大数据场景下的性能表现 ([#1226](https://github.com/sheinsight/shineout-next/pull/1226))
- 优化 `TreeSelect` 的 `compressed` 在大数据场景下的性能表现 ([#1226](https://github.com/sheinsight/shineout-next/pull/1226))
### 🐞 BugFix
- 修复 `Alert` 传入空字符串 `title` 属性也能渲染结构的问题 ([#1225](https://github.com/sheinsight/shineout-next/pull/1225))
- 修复 `Cascader` 的 `expandTrigger` 为 `hover` 或 `hover-only` 时，多选模式下，勾选框点击失效的问题（Regression: since v3.7.3） ([#1224](https://github.com/sheinsight/shineout-next/pull/1224))
- 修复 `DatePicker` 的 `formatResult` 属性在 `type` 为 `month` 时，切换月份时展示结果不正确的问题 ([#1220](https://github.com/sheinsight/shineout-next/pull/1220))
- 修复 `Form` 卸载携带校验错误字段后，重新挂载该字段时会携带历史校验错误信息的问题 ([#1219](https://github.com/sheinsight/shineout-next/pull/1219))
- 修复 `Dropdown` 组件在开启 `hover` 模式时，鼠标移入非 dom 包含关系元素（如在 Dropdown 列表里打开一个 Modal）导致意外打开列表的问题 ([#1218](https://github.com/sheinsight/shineout-next/pull/1218))
- 修复 `Pagination` 受控模式下外部 value 和内部状态不同步的问题 (Regression: since v3.2.6) ([#1222](https://github.com/sheinsight/shineout-next/pull/1222))
- 修复 `Tooltip` 在 `Dropdown` 中使用时，'soui-dropdown-item' 的 className 被传递到 `Tooltip` 的问题 ([#1216](https://github.com/sheinsight/shineout-next/pull/1216))
- 修复 `Tree` 开启 `virtual` 后根节点样式缩进与非虚拟列表不一致的问题 ([#1223](https://github.com/sheinsight/shineout-next/pull/1223))
- 修复 `Tree` 在首次加载时 `defaultExpandAll` 可能不生效的问题 ([#1215](https://github.com/sheinsight/shineout-next/pull/1215))

## 3.7.4
<span class="time">2025-06-26</span>
### 💎 Enhancement
- `setToken` 新增忽略扩展样式开关 `ignoreExtra` 用于屏蔽兼容老版本组件的额外 cssvar ([#1196](https://github.com/sheinsight/shineout-next/pull/1196))
### 🚀 Performance
- 优化 `Popover` 初始化性能，移除 mount 时多余的 DOM 样式计算 ([#1200](https://github.com/sheinsight/shineout-next/pull/1200))
### 🐞 BugFix
- 修复 `DatePicker` 可输入模式下的快速选择，二次选值后不生效的问题（Regression: since v3.7.3） ([#1207](https://github.com/sheinsight/shineout-next/pull/1207))
- 修复 `Form.Item` 嵌套使用时，子级的 `required` 属性设置为 `false` 不生效的问题 ([#1210](https://github.com/sheinsight/shineout-next/pull/1210))
- 修复 `Form` 的 `useForm` 用非受控用法下，表单实例获取不正确的问题 ([#1208](https://github.com/sheinsight/shineout-next/pull/1208))
- 修复 `Pagination` 的分页器弹出层在滚动容器中的极限边界场景下可能出现的不可见问题 ([#1201](https://github.com/sheinsight/shineout-next/pull/1201))
- 修复 `Table` 的固定列在快速滚动时，sticky 样式的应用可能有迟滞的问题 ([#1209](https://github.com/sheinsight/shineout-next/pull/1209))
- 修复 `Table` 在有动态固定列时，固定列吸附的位置不正确的问题 ([#1203](https://github.com/sheinsight/shineout-next/pull/1203))

## 3.7.3
<span class="time">2025-06-20</span>
### 💎 Enhancement
- `DatePicker` 的可输入模式支持宽松的日期格式，例如"2025-06-16 18:00"和"2025-06-16 18" ([#1180](https://github.com/sheinsight/shineout-next/pull/1180))
### 🐞 BugFix
- 修复 `Cascader` 多选模式下，末级叶子节点的勾选框点击失效的问题（Regression: since v3.7.2） ([#1192](https://github.com/sheinsight/shineout-next/pull/1192))
- 修复 `DatePicker` 在开启 `allowSingle` 时可能引发表单死循环的问题 ([#1194](https://github.com/sheinsight/shineout-next/pull/1194))
- 修复 `DatePicker` 设置 `allowSingle` 后无法点击已选日期取消选中的问题 ([#1183](https://github.com/sheinsight/shineout-next/pull/1183))
- 修复 `Form` 的 `scrollToError` 偶现的无法滚动到错误字段位置的问题 ([#1181](https://github.com/sheinsight/shineout-next/pull/1181))
- 修复 `Input` 的 `onEnterPress` 事件在开启了 Form 的 scrollToError 后偶现的无法触发的问题 ([#1182](https://github.com/sheinsight/shineout-next/pull/1182))
- 修复 `Input` 设置了 `digits` 和 `autoFix` 属性时，偶现的精度丢失问题 ([#1178](https://github.com/sheinsight/shineout-next/pull/1178))
- 修复 `Skeleton` 的 动画效果在微前端下不生效的问题 ([#1186](https://github.com/sheinsight/shineout-next/pull/1186))

## 3.7.2
<span class="time">2025-06-16</span>
### 💎 Enhancement
- 优化 `Upload` 上传结果的样式，移除了成功和失败状态的图标 ([#1168](https://github.com/sheinsight/shineout-next/pull/1168))
### 🐞 BugFix
- 修复 `Cascader` 多选模式下，末级叶子节点没有高亮路径的问题 ([#1165](https://github.com/sheinsight/shineout-next/pull/1165))
- 修复 `Modal` 被外部通过 ReactDOM.unmountComponentAtNode 卸载后，无法重置 html 元素的样式的问题 ([#1170](https://github.com/sheinsight/shineout-next/pull/1170))
- 修复 `TreeSelect` 开启 `virtual` 后传入 undefined 数据导致死循环问题 ([#1172](https://github.com/sheinsight/shineout-next/pull/1172))
### 💅 Style
- 调整 Upload 在鼠标移入上传触发区域时的样式优先级 ([#1175](https://github.com/sheinsight/shineout-next/pull/1175))

## 3.7.1
<span class="time">2025-06-11</span>
### 💎 Enhancement
- `TreeSelect` 增强 `disabled` 属性，支持动态 disabled ([#1156](https://github.com/sheinsight/shineout-next/pull/1156))
### 🐞 BugFix
- 修复 `Form` 设置某字段值的同时设置了其他字段的值，此时其他字段上的错误状态未自动清除的问题 ([#1160](https://github.com/sheinsight/shineout-next/pull/1160))
- 修复 `Input` 的 `onBlur` 和 `onFocus` 事件的参数类型错误问题 ([#1161](https://github.com/sheinsight/shineout-next/pull/1161))
- 修复 `Input.Group` 的 `seperate` 在 hover 时层级高过了 Table 固定列的问题 ([#1158](https://github.com/sheinsight/shineout-next/pull/1158))
- 修复 `Input.Group` 的 `seperate` 属性名称拼写错误问题，修正为 `separate`，原 `seperate` 属性仍保留但标记为废弃 ([#1158](https://github.com/sheinsight/shineout-next/pull/1158))
- 修复 `Select` 在 `Drawer` 中使用并且开启了 compressed 属性后，点击 compressed 弹出层中的删除第二次无效的问题 ([#1164](https://github.com/sheinsight/shineout-next/pull/1164))
- 修复 `Select` 同时设置了 `absolute` 和 `optionWidth` 属性后，弹出层在右侧溢出时位置不自动调整的问题 ([#1159](https://github.com/sheinsight/shineout-next/pull/1159))
- 修复 `Select` 的下拉框是动态高度时，弹出层位置不自动调整的问题 ([#1157](https://github.com/sheinsight/shineout-next/pull/1157))
- 修复 `Select` 设置了 `absolute` 用法下，在某些位置打开下拉框时有多余的过渡动画问题 ([#1154](https://github.com/sheinsight/shineout-next/pull/1154))
- 修复 `Table` 单元格中使用的 Popover 设置的挂载容器在 td 元素内时的遮挡问题 ([#1155](https://github.com/sheinsight/shineout-next/pull/1155))
- 修复 `Textarea` 的 `onBlur` 和 `onFocus` 事件的参数类型错误问题 ([#1161](https://github.com/sheinsight/shineout-next/pull/1161))
### 💅 Style
- `TreeSelect` 新增禁用选项的背景色 token ([#1163](https://github.com/sheinsight/shineout-next/pull/1163))

## 3.7.0
<span class="time">2025-06-04</span>
### 🆕 Feature
- `Carousel` 新增 `itemClassName` 属性，支持设置轮播项 className ([#1136](https://github.com/sheinsight/shineout-next/pull/1136))
- `Carousel` 新增 `showIndicator` 属性，支持隐藏指示器 ([#1136](https://github.com/sheinsight/shineout-next/pull/1136))
- `Cascader` 新增 `highlight` 属性，开启搜索关键字高亮功能 ([#1126](https://github.com/sheinsight/shineout-next/pull/1126))
- 新增 `Skeleton` 骨架屏组件 ([#1100](https://github.com/sheinsight/shineout-next/pull/1100))
- `Form.Item` 新增 `keepErrorBelow` 属性，错误信息独占一行，不再覆盖提示信息 ([#1130](https://github.com/sheinsight/shineout-next/pull/1130))
- `List` 新增 `loadingPosition` 属性，设置为 bottom 后在列表底部显示加载图标 ([#1134](https://github.com/sheinsight/shineout-next/pull/1134))
- `Popover` 新增 `disabled` 属性，是否禁用 ([#1032](https://github.com/sheinsight/shineout-next/pull/1032))
- `Select` 新增 `highlight` 属性，开启搜索关键字高亮功能 ([#1126](https://github.com/sheinsight/shineout-next/pull/1126))
- `Select` 新增 `renderCompressed` 属性，支持自定义渲染合并内容 ([#1099](https://github.com/sheinsight/shineout-next/pull/1099))
- `Table` 的 columns 新增 `groupProps` 属性，支持设置 style 和 className ([#1112](https://github.com/sheinsight/shineout-next/pull/1112))
- `Table` 的 `virtual` 属性值新增 lazy，设置后可提高虚拟列表的垂直滚动性能 ([#1093](https://github.com/sheinsight/shineout-next/pull/1093))
- `Table` 新增 `showBottomScrollbar` 属性，启用后显示可吸附底部的横向滚动条 ([#1068](https://github.com/sheinsight/shineout-next/pull/1068))
- `Tabs` 新增 `renderTabsHeader` 属性，支持自定义渲染头部内容 ([#1075](https://github.com/sheinsight/shineout-next/pull/1075))
- `TreeSelect` 新增 `highlight` 属性，开启搜索关键字高亮功能 ([#1126](https://github.com/sheinsight/shineout-next/pull/1126))
- `TreeSelect` 新增 `renderCompressed` 属性，支持自定义渲染合并内容 ([#1099](https://github.com/sheinsight/shineout-next/pull/1099))
- `Tree` 新增 `leafIcon` 属性，可配置叶子结点的图标 ([#1124](https://github.com/sheinsight/shineout-next/pull/1124))
- `Tree` 新增 `size` 属性，可配置紧凑或稀疏的样式 ([#1121](https://github.com/sheinsight/shineout-next/pull/1121))
- `Upload` 新增 `beforeDrop` 属性，支持自行处理拖拽释放事件以及读取文件列表处理返回文件 ([#1104](https://github.com/sheinsight/shineout-next/pull/1104))
### 💎 Enhancement
- `DatePicker` 的时间选择器修改为默认展示，且直接选择时间后日期部分自动选择为当天，增加弹出动画 ([#1129](https://github.com/sheinsight/shineout-next/pull/1129))
- `TreeSelect` 增强 `size` 属性，下拉面板的列表尺寸跟随 size 联动 ([#1128](https://github.com/sheinsight/shineout-next/pull/1128))
### 🚀 Performance
- 优化 `Table` 合并行或列的 hover 渲染性能 ([#1050](https://github.com/sheinsight/shineout-next/pull/1050))
- 优化 `Table` 的虚拟列表横向滚动性能，调整了 thead 的 dom 位置 ([#1047](https://github.com/sheinsight/shineout-next/pull/1047))
### 🐞 BugFix
- 修复 `Alert` 只有 `title` 没有 `children` 的样式问题 ([#1133](https://github.com/sheinsight/shineout-next/pull/1133))
- 修复 `Button` 在 React 18 以下初始化时有过渡动画的问题 ([#1114](https://github.com/sheinsight/shineout-next/pull/1114))
- 修复 `Carousel` 自定义指示器时，轮播数量为 1 条时不渲染的问题 ([#1139](https://github.com/sheinsight/shineout-next/pull/1139))
- 修复 `Cascader` 外部受控打开的场景下，从外部修改 `value` 导致的面板勾选情况没有及时同步([#4e70d57](https://github.com/sheinsight/shineout-next/commit/4e70d57c6c01fc3d6f6031af3f8b590432e07a7a))
- 修复 `Cascader` 的 `beforeChange` 不生效的问题 ([#1120](https://github.com/sheinsight/shineout-next/pull/1120))
- 修复 `Form` 在同字段表单组件发生挂载卸载时 `defaultValue` 可能覆盖原值的问题(Regression: since v3.6.4-beta.5) ([#1144](https://github.com/sheinsight/shineout-next/pull/1144))
- 修复 `Grid` 在多个 shineout 版本的同时使用时出现的样式覆盖问题 ([#1143](https://github.com/sheinsight/shineout-next/pull/1143))
- 修复 `Modal` 组件初始化时样式延迟注入导致其他组件测绘不准确的问题 ([#1101](https://github.com/sheinsight/shineout-next/pull/1101))
- 修复 `Radio.Group` 在文案过长情况下小圆点选择器样式被挤压异常的问题 ([#1135](https://github.com/sheinsight/shineout-next/pull/1135))
- 修复 `Rule` 自定义校验函数无法获取组件上自定义 props 的问题 ([#1147](https://github.com/sheinsight/shineout-next/pull/1147))
- 修复 `Table` 自定义 `empty` 缺失一层内部结构导致 flex 布局异常的问题 ([#1148](https://github.com/sheinsight/shineout-next/pull/1148))
- 修复 `Table` 的 data 引用不变但数据变化后，组件不触发更新的问题 ([#1146](https://github.com/sheinsight/shineout-next/pull/1146))
- 修复 `Table` 前端过滤多选的勾选状态在重置后未清空的问题 ([#1140](https://github.com/sheinsight/shineout-next/pull/1140))
- 修复 `Table` 的不定高场景下依然开启了虚拟列表的数据渲染不全和抖动的问题 ([#1117](https://github.com/sheinsight/shineout-next/pull/1117))
- 修复 `Table` 的 columns 中 render 字段不传导致组件报错的问题 ([#1102](https://github.com/sheinsight/shineout-next/pull/1102))
- 修复 `Table` 的 colgroup 平均分配时产生的小数位像素在浏览器渲染时偶现的单元格垂直边框对不齐问题 ([#1050](https://github.com/sheinsight/shineout-next/pull/1050))
- 修复 `TreeSelect` 的 `beforeChange` 不生效的问题 ([#1120](https://github.com/sheinsight/shineout-next/pull/1120))

## 3.6.7
<span class="time">2025-05-27</span>
### 🐞 BugFix
- 修复 `DatePicker` 在设置了和 `format` 格式不相符的 `defaultValue` 后会触发多次 onChange 的问题 # ([#1125](https://github.com/sheinsight/shineout-next/pull/1125))
- 修复 `Form` 在相同 `name` 的组件切换渲染过程中，执行 `datum.set` 等改值行为失效的问题 ([#1127](https://github.com/sheinsight/shineout-next/pull/1127))
- 修复 `Form` 在设置动态 `name` 且为数组 name 的情况下导致字段可能被删除的问题 ([#1123](https://github.com/sheinsight/shineout-next/pull/1123))
- 修复 `Form` 在列表数据中使用时，列表数据更新导致校验状态丢失的问题 ([#1115](https://github.com/sheinsight/shineout-next/pull/1115))
- 修复 `Popover` 嵌套场景下关闭顺序不正确的问题 ([#1111](https://github.com/sheinsight/shineout-next/pull/1111))
- 修复 `Tree` 在开启虚拟列表后 data 为 undefined 时可能存在死循环的问题 ([#1119](https://github.com/sheinsight/shineout-next/pull/1119))
- 修复 `Tree` 在 data 发生变化后 `defaultExpanded` 不生效的问题 ([#1118](https://github.com/sheinsight/shineout-next/pull/1118))

## 3.6.6
<span class="time">2025-05-12</span>
### 💎 Enhancement
- `Cascader` 增强 `compressed` 属性，新增 `hide-popover` 模式隐藏合并后的选项，仅展示合并数量 ([#1098](https://github.com/sheinsight/shineout-next/pull/1098))
- `Select` 增强 `compressed` 属性，新增 `hide-popover` 模式隐藏合并后的选项，仅展示合并数量 ([#1098](https://github.com/sheinsight/shineout-next/pull/1098))
- `TreeSelect` 增强 `compressed` 属性，新增 `hide-popover` 模式隐藏合并后的选项，仅展示合并数量 ([#1098](https://github.com/sheinsight/shineout-next/pull/1098))
### 🐞 BugFix
- 修复 `Cascader`结果框高度不继承的问题 ([#1105](https://github.com/sheinsight/shineout-next/pull/1105))
- 修复 `DatePicker` 的 `open` 受控用法下，`onChange` 多了一次调用的问题 ([#1107](https://github.com/sheinsight/shineout-next/pull/1107))
- 修复 `Form` 的 formRef `set` 设置某对象字段下的部分子字段值，未设值子字段的表单组件值未清空的问题 ([#1106](https://github.com/sheinsight/shineout-next/pull/1106))
- 修复 `Modal` 开启 `destory` 属性关闭后多次执行渲染函数的问题 ([#1109](https://github.com/sheinsight/shineout-next/pull/1109))
- 修复 `Select`结果框高度不继承的问题 ([#1105](https://github.com/sheinsight/shineout-next/pull/1105))
- 修复 `Tabs.Panel` 设置 `background` 非预期的影响到 shape 为 button 和 fill 的样式（Regression: since v3.6.2） ([#1094](https://github.com/sheinsight/shineout-next/pull/1094))
- 修复 `TreeSelect`结果框高度不继承的问题 ([#1105](https://github.com/sheinsight/shineout-next/pull/1105))
- 修复 `Tree` 的 `onChange` 第二参数丢失和类型问题 ([#1095](https://github.com/sheinsight/shineout-next/pull/1095))

## 3.6.5
<span class="time">2025-04-29</span>
### 🆕 Feature
- `Upload` 新增 `functionalOnChange` 属性，开启后 onChange 的回调值将变为函数 ([#1084](https://github.com/sheinsight/shineout-next/pull/1084))
### 💎 Enhancement
- 优化 `Image` 的`fill`实现方式，改善大图片在 Chrome 浏览器下的性能 ([#1080](https://github.com/sheinsight/shineout-next/pull/1080))
### 🐞 BugFix
- 修复 `Cascader` 在 `Popover` 中使用并且开启了 compressed 属性后，点击 compressed 弹出层中的删除条目时会引起样式异常的问题 ([#1079](https://github.com/sheinsight/shineout-next/pull/1079))
- 修复 `Form.Flow` 内容更新不同步的问题 ([#1081](https://github.com/sheinsight/shineout-next/pull/1081))
- 修复 `Modal.Submit` 的 onClick 事件比 `onSubmit` 先执行的问题 ([#1090](https://github.com/sheinsight/shineout-next/pull/1090))
- 修复 `Select` 在 `Popover` 中使用并且开启了 compressed 属性后，点击 compressed 弹出层中的删除条目时会引起样式异常的问题 ([#1079](https://github.com/sheinsight/shineout-next/pull/1079))
- 修复 `Transfer` 自定义 children 时左右勾选互斥的问题，并修正 children 的 `onSelect` TS 类型 ([#1089](https://github.com/sheinsight/shineout-next/pull/1089))
- 修复 `TreeSelect` 在 `Popover` 中使用并且开启了 compressed 属性后，点击 compressed 弹出层中的删除条目时会引起样式异常的问题 ([#1079](https://github.com/sheinsight/shineout-next/pull/1079))
- 修复 `Upload` 同时上传多个文件时偶现的 99%进度不消失问题 ([#1084](https://github.com/sheinsight/shineout-next/pull/1084))

## 3.6.4
<span class="time">2025-04-22</span>
### 💎 Enhancement
- 优化 `Popover` 在窗口 resize 和父容器滚动后依然能跟随目标 ([#1069](https://github.com/sheinsight/shineout-next/pull/1069))
- 优化 `Tooltip` 在窗口 resize 和父容器滚动后依然能跟随目标 ([#1069](https://github.com/sheinsight/shineout-next/pull/1069))
### 🐞 BugFix
- 修复 `Cascader` 设置了 expandTrigger 为 hover 后切换高亮路径后但不选中值，二次打开面板时高亮路径与选中值不匹配的问题 ([#1070](https://github.com/sheinsight/shineout-next/pull/1070))
- 修复 `Form` 在表单组件的 key 变更后 `defaultValue` 无法设置成功的问题 ([#1068](https://github.com/sheinsight/shineout-next/pull/1068))
- 修复 `Form` 在 ReactDOM.render 模式下并发设置 value 后导致某些字段值丢失的问题 ([#1067](https://github.com/sheinsight/shineout-next/pull/1067))
- 修复 `Modal` 全屏模式下内容超出窗口高度时的滚动条样式异常问题 ([#1062](https://github.com/sheinsight/shineout-next/pull/1062))
- 修复 `Select` 开启过滤后打开面板快速再次聚焦时可能清空输入框文本内容的问题 ([#1064](https://github.com/sheinsight/shineout-next/pull/1064))
- 修复 `Select` 搜索内容后选项被遮挡的问题 ([#1066](https://github.com/sheinsight/shineout-next/pull/1066))
- 修复 `TreeSelect` 在页面边界搜索时，下拉弹出层的位置未实时更新导致偏离父元素的问题 ([#1076](https://github.com/sheinsight/shineout-next/pull/1076))
- 修复 `TreeSelect` 的 `onFilter` ts 类型和第二参数丢失的问题 ([#1073](https://github.com/sheinsight/shineout-next/pull/1073))
- 修复 `Tree` 传入 `rowsInView` 属性失效的问题 ([#1071](https://github.com/sheinsight/shineout-next/pull/1071))

## 3.6.3
<span class="time">2025-04-15</span>
### 🆕 Feature
- `TreeSelect` 新增 `contentClass` 属性，功能同 `Tree` 组件属性 ([#1055](https://github.com/sheinsight/shineout-next/pull/1055))
### 💎 Enhancement
- 优化 `Tree` 的节点鼠标手势，节点 content 区域的鼠标手势修改为 pointer ([#1058](https://github.com/sheinsight/shineout-next/pull/1058))
### 🐞 BugFix
- 修复 `Cascader` 最大高度限制失效的问题（默认 max-height 应为 80px） ([#1051](https://github.com/sheinsight/shineout-next/pull/1051))
- 修复 `Form` 在设置 `defaultValue` 时，默认值设置时机晚于外部 value 状态的问题 ([#1049](https://github.com/sheinsight/shineout-next/pull/1049))
- 修复 `Modal` 多层嵌套使用时，关闭子 Modal 但未关闭父 Modal 时 body 的滚动条出现的问题 ([#1054](https://github.com/sheinsight/shineout-next/pull/1054))
- 修复 `Sticky` 的 `onChange` 不触发的问题 ([#1048](https://github.com/sheinsight/shineout-next/pull/1048))
- 修复 `Table` 开启拖拽行之后偶现的拖拽不成功问题 ([#1052](https://github.com/sheinsight/shineout-next/pull/1052))
- 修复 `Table` 的 tfoot 没有在底部吸附的问题（Regression： since v3.5.0） ([#1045](https://github.com/sheinsight/shineout-next/pull/1045))
- 调整 `Tag` 默认样式层级，新增 `Brown` 色系 token，纠正 `Tag` 中 `Orange` 色系为 `Brown` ([#1060](https://github.com/sheinsight/shineout-next/pull/1060))
- 修复 `TreeSelect` 最大高度限制失效的问题（默认 max-height 应为 80px） ([#1051](https://github.com/sheinsight/shineout-next/pull/1051))

## 3.6.2
<span class="time">2025-04-07</span>
### 💎 Enhancement
- 优化 `Tree` 拖拽时原节点立即隐藏带来的性能问题和交互不友好问题，改为不立即隐藏原节点 ([#1039](https://github.com/sheinsight/shineout-next/pull/1039))
### 🐞 BugFix
- 修复 `DatePicker` 可输入模式下输入新的日期后，使用触控板的轻触关闭弹出层时获取不到最新值的问题 ([#1025](https://github.com/sheinsight/shineout-next/pull/1025))
- 修复 `DatePicker` 的`date` 类型在开启 `inputable` 和 `range`之后，开始日期输入了比结束日期更大值之后可以回车提交的问题 ([#1026](https://github.com/sheinsight/shineout-next/pull/1026))
- 修复 `Form.Field` 在 `name` 为数组情况下组件卸载时错误信息无法清空的问题 ([#1033](https://github.com/sheinsight/shineout-next/pull/1033))
- 修复 `Input.Group` 的 `seperate` 在一些组合场景下的样式问题 ([#1038](https://github.com/sheinsight/shineout-next/pull/1038))
- 修复 `Select` 最大高度限制失效的问题（默认 max-height 应为 80px） ([#1030](https://github.com/sheinsight/shineout-next/pull/1030))
- 修复 `Steps` 等待状态样式错误的问题 ([#1030](https://github.com/sheinsight/shineout-next/pull/1030))
- 修复 `Table` 点击 `Button` 等元素会触发单元格 click 事件的问题 ([#1040](https://github.com/sheinsight/shineout-next/pull/1040))
- 修复 `Tabs.Panel` 设置 `background` 属性失效的问题 ([#1028](https://github.com/sheinsight/shineout-next/pull/1028))
- 修复 `Transfer` 动态设置 `loading` 不生效的问题 ([#1035](https://github.com/sheinsight/shineout-next/pull/1035))

## 3.6.1
<span class="time">2025-03-28</span>
### 💎 Enhancement
- 优化 `CardGroup.Item` 在非滚动容器下也能支持懒加载 ([#1016](https://github.com/sheinsight/shineout-next/pull/1016), [#1017](https://github.com/sheinsight/shineout-next/pull/1017))
- 优化 `Popover` 的 `adjust` 属性，支持弹出层位置实时跟随父元素尺寸变化 ([#1018](https://github.com/sheinsight/shineout-next/pull/1018))
- 优化 `Tooltip` 的箭头，使其在内容动态修改后位置保持正确 ([#1019](https://github.com/sheinsight/shineout-next/pull/1019))
### 🐞 BugFix
- 修复 `Card.Header` 和 `Card.Footer` 在未开启 `moveable` 属性时不可选中文本的问题 ([#1022](https://github.com/sheinsight/shineout-next/pull/1022))
- 修复 `DatePicker` 弹出层的层级低于其他 absolute 元素的问题（Regression： since v3.6.0） ([#1015](https://github.com/sheinsight/shineout-next/pull/1015))
- 修复 `Form` 同时设置 value 和 names 为数组的 DatePicker 并发渲染时，value 未按照预期设置进去的问题 ([#1013](https://github.com/sheinsight/shineout-next/pull/1013))
- 修复 `Input.Number` 输入“0.0”这种格式时小数点丢失的问题 ([#1014](https://github.com/sheinsight/shineout-next/pull/1014))
- 修复 `Input.Group` 下面的 `Input` 的 `onBlur` 和 `onFocus` 回调函数的参数格式不正确的问题 ([#1014](https://github.com/sheinsight/shineout-next/pull/1014))
- 修复 `Pagination` 的 `simple` 模式输入框不展示当前页的问题（Regression： since v3.6.0） ([#1010](https://github.com/sheinsight/shineout-next/pull/1010))
- 修复 `Table` 的 columns 是动态值时，column.filter 的过滤功能意外的被重置的问题 ([#1012](https://github.com/sheinsight/shineout-next/pull/1012))
- 修复 `Tooltip` 的 `persistent` 配置优先级问题，使其优先于全局配置并符合就近原则 ([#1020](https://github.com/sheinsight/shineout-next/pull/1020))
- 修复 `Transfer` 设置了 `renderFilter` 之后可能导致左右面板高度不一致的问题 ([#1008](https://github.com/sheinsight/shineout-next/pull/1008))

## 3.6.0
<span class="time">2025-03-21</span>
### 🆕 Feature
- `Cascader` 新增 `emptyText` 属性，支持自定义空数据时的下拉列表内容 ([#971](https://github.com/sheinsight/shineout-next/pull/971))
- `Collapse` 新增 `animation` 属性，支持关闭折叠动画 ([#953](https://github.com/sheinsight/shineout-next/pull/953))
- `Dropdown` 新增 `shape`: 同 `Button` 的 shape ([#925](https://github.com/sheinsight/shineout-next/pull/925))
- `Form` 新增 `colon` 属性，用于控制 label 是否显示冒号 ([#875](https://github.com/sheinsight/shineout-next/pull/875))
- `Form.Flow` 新增 `strict` 属性，在此严格模式下，只有在配置的 names 字段值发生变化时才触发 Flow 的 children 渲染 ([#1003](https://github.com/sheinsight/shineout-next/pull/1003))
- `Image` 新增 `renderHoverMask` 属性，支持自定义渲染鼠标移入组件时的遮罩层内容 ([#993](https://github.com/sheinsight/shineout-next/pull/993))
- `Input.Group` 新增 `seperate`属性：组合到一起的组件有独立的边框 ([#992](https://github.com/sheinsight/shineout-next/pull/992))
- `Popover` 新增 `offset` 属性，设置弹出层宽度或高度的附加值，增加或减少宽度或高度 ([#965](https://github.com/sheinsight/shineout-next/pull/965))
- `Popover` 新增 `popupGap` 属性，设置弹出层与触发元素的间距 ([#965](https://github.com/sheinsight/shineout-next/pull/965))
- `Table` 新增筛选功能： 设置 `columns` 配置项的 `filter` 属性 ([#986](https://github.com/sheinsight/shineout-next/pull/986))
- `Table` 的 `TableRef` 新增 `sortByColumn` 方法，支持根据列 key 进行排序 ([#914](https://github.com/sheinsight/shineout-next/pull/914))
- `Textarea` 新增 `limit` 属性，支持限制输入字符长度 ([#998](https://github.com/sheinsight/shineout-next/pull/998))
- `Textarea` 新增 `clearable` 属性，支持一键清除内容 ([#998](https://github.com/sheinsight/shineout-next/pull/998))
- `Tooltip` 新增 `showArrow` 属性，用于控制是否显示箭头 ([#998](https://github.com/sheinsight/shineout-next/pull/998))
- `TreeSelect` 新增 `actionOnClick` 属性，配置点击节点时的行为：`expand` 展开/收起节点，`check` 勾选或取消勾选节点 ([#986](https://github.com/sheinsight/shineout-next/pull/986))
- `TreeSelect` 新增 `virtual` 属性支持虚拟列表 ([#948](https://github.com/sheinsight/shineout-next/pull/948))
- `Tree` 新增 `actionOnClick` 属性，配置点击节点时的行为：`expand` 展开/收起节点，`check` 勾选或取消勾选节点 ([#986](https://github.com/sheinsight/shineout-next/pull/986))
- `Tree` 新增 `virtual` 属性支持虚拟列表 ([#948](https://github.com/sheinsight/shineout-next/pull/948))
- `Upload` 新增 `hideHandler` 属性，支持隐藏默认触发器 ([#993](https://github.com/sheinsight/shineout-next/pull/993))
### 💎 Enhancement
- `Carousel` 的 `indicatorType` 新增一种类型：bar ([#975](https://github.com/sheinsight/shineout-next/pull/975))
- `DatePicker` 周选择器的结果末尾追加“周”字 ([#1002](https://github.com/sheinsight/shineout-next/pull/1002))
- `Form` 的 `scrollToField` 方法支持 `Form.Field` 和 `Form.FieldSet` 下的未设置 name 属性的表单组件 ([#875](https://github.com/sheinsight/shineout-next/pull/875))
- `Upload` 增强 `customResult` 返回内容，新增返回“触发器的 dom 实例”和“原文件（成功文件）实例” ([#995](https://github.com/sheinsight/shineout-next/pull/995), [#993](https://github.com/sheinsight/shineout-next/pull/993))
### 🚀 Performance
- 优化 `Collapse` 初始化动画，在组件首次挂载后不会触发动画效果，挂载结束后正常添加折叠动画 ([#953](https://github.com/sheinsight/shineout-next/pull/953))
- 优化 `Select` 大数据量下的树形数据搜索性能 ([#877](https://github.com/sheinsight/shineout-next/pull/877))
- 优化 `Select` 在大数据量下同时被渲染很多个时的页面初始化性能问题 ([#877](https://github.com/sheinsight/shineout-next/pull/877))
- 优化 `TreeSelect` 大数据量下的树形数据搜索性能 ([#877](https://github.com/sheinsight/shineout-next/pull/877))
- 优化 `TreeSelect` 在大数据量下同时被渲染很多个时的页面初始化性能问题 ([#877](https://github.com/sheinsight/shineout-next/pull/877))
### 🐞 BugFix
- 修复 `Cascader` mode=0 时，外部动态修改 data 后导致的选中结果与勾选的显示情况不一致的问题 ([#999](https://github.com/sheinsight/shineout-next/pull/999))
- 修复 `Checkbox` 在 Form 中使用且传了 name 时, Checkbox 的 onChange 会触发两次的问题（Regression: since v3.4.3）([#955](https://github.com/sheinsight/shineout-next/pull/955))
- 修复 `DatePicker` 的 `formatResult`函数格式的自定义结果展示不生效的问题 ([#1002](https://github.com/sheinsight/shineout-next/pull/1002))
- 修复 `DatePicker` 的 `open` 受控用法下，onCollapse 回调函数可能不触发而导致无法选择的问题 ([#1002](https://github.com/sheinsight/shineout-next/pull/1002))
- 修复 `DatePicker` 仅开启 `needConfirm` 属性情况下不展示今天按钮的问题 ([#983](https://github.com/sheinsight/shineout-next/pull/983))
- 修复 `DatePicker` 小尺寸模式下“今天按钮”不上下居中的问题 ([#983](https://github.com/sheinsight/shineout-next/pull/983))
- 修复 `Form` 的 `scrollToError` 无法生效的问题(Regression: since v3.5.4) ([#985](https://github.com/sheinsight/shineout-next/pull/985))
- 修复 `Form` 下的组件设置 name 为 json path 格式的数组时，组件上的 `defaultValue` 无法生效的问题 ([#980](https://github.com/sheinsight/shineout-next/pull/980))
- 修复 `Form` 中的带校验字段卸载后，执行手动校验方法 `validateFieldsWithValue` 依然能返回该字段校验不通过信息的问题 ([#975](https://github.com/sheinsight/shineout-next/pull/975))
- 修复 `Form` 的 `scrollToField` 在复杂布局中不生效的问题 ([#973](https://github.com/sheinsight/shineout-next/pull/973))
- 修复 `Image` 在容器为 'absolute' 定位情况下 `lazy` 属性可能失效的问题 ([#982](https://github.com/sheinsight/shineout-next/pull/982))
- 修复 `Input.Number` 在输入小数点情况下，退格至小数点前时会将小数点删除的问题（Regression: since v3.4.0） ([#989](https://github.com/sheinsight/shineout-next/pull/989))
- 修复 `Popover` 在滚动容器中的水平用法下，且不给定宽，在靠近窗口右侧时弹出层的宽度被非预期挤压，导致内容换行的问题 ([#997](https://github.com/sheinsight/shineout-next/pull/997))
- 修复 `Select` 的 `onLoadMore` 在加载第二页的时候重新打开面板滚动位置异常的问题(Regression: since v3.5.5) ([#1000](https://github.com/sheinsight/shineout-next/pull/1000))
- 修复 `Select` 的 `reFocus` 属性失效的问题 ([#971](https://github.com/sheinsight/shineout-next/pull/971))
- 修复 `Spin` 的 `className`重复设置到 content dom 节点上的问题 ([#970](https://github.com/sheinsight/shineout-next/pull/970))
- 修复 `Table` 的 column.width 设置为 0 时不生效的问题（Regression: since v3.4.5） ([#998](https://github.com/sheinsight/shineout-next/pull/998))
- 修复 `Table` 调用了 `scrollToIndex` 后，滚动条向上滚动时，滚动条位置往下跳跃的问题 ([#961](https://github.com/sheinsight/shineout-next/pull/961))
- 修复 `Tooltip` 在滚动容器中的水平用法下，且不给定宽，在靠近窗口右侧时弹出层的宽度被非预期挤压，导致内容换行的问题 ([#997](https://github.com/sheinsight/shineout-next/pull/997))
- 修复 `TreeSelect` 输入过滤内容并选中选项后，输入内容无法默认全选的问题 ([#971](https://github.com/sheinsight/shineout-next/pull/971))
- 修复 `TreeSelect` 开 `virtual` 和 `defaultExpandedAll` 后，过滤数据不展开的问题 ([#1001](https://github.com/sheinsight/shineout-next/pull/1001))
- 修复 `TreeSelect` 节点样式可能不对齐对问题 ([#1001](https://github.com/sheinsight/shineout-next/pull/1001))
- 修复 `Tree` 传入的非树形数据时, 一级节点有多余的缩进问题 ([#981](https://github.com/sheinsight/shineout-next/pull/981))
- 修复 `Upload.Dragger` 子组件缺失的问题 ([#996](https://github.com/sheinsight/shineout-next/pull/996))
- 修复 `Upload` 的 `webkitdirectory` 属性失效的问题 ([#978](https://github.com/sheinsight/shineout-next/pull/978))

## 3.5.8
<span class="time">2025-02-13</span>
### 💎 Enhancement
- `Cascader` 新增 `disabled` 配置模式，支持实时计算 disabled 状态 ([#936](https://github.com/sheinsight/shineout-next/pull/936))
- `Cascader` 支持非 hover 的多选模式下，末级节点整个节点区域点击选中 Checkbox ([#927](https://github.com/sheinsight/shineout-next/pull/927))
- 新增 `icons` 的导出: 所有组件内置的 svg 图标数据，可用于自定义图标 ([#931](https://github.com/sheinsight/shineout-next/pull/931))
### 🐞 BugFix
- 修复 `Cascader` 开启动态搜索后部分场景下父禁用子而可选的问题 ([#942](https://github.com/sheinsight/shineout-next/pull/942))
- 修复 `Cascader` 禁用状态下的箭头图标颜色不正确的问题 ([#930](https://github.com/sheinsight/shineout-next/pull/930))
- 修复 `Cascader` 多选模式下搜索时没有自动展开命中结果的问题（Regression: since v3.1.6） ([#926](https://github.com/sheinsight/shineout-next/pull/926))
- 修复 `Checkbox` 触发两次 `onChange` 的问题（Regression: since v3.5.6） ([#929](https://github.com/sheinsight/shineout-next/pull/929))
- 修复 `Form` 在异步设置 value 后，带有 defaultValue 的表单项视图更新异常的问题 ([#950](https://github.com/sheinsight/shineout-next/pull/950))
- 修复 `Form` 的 `FieldSet`嵌套使用后，子级的 insert value 触发了父级的校验的问题 ([#934](https://github.com/sheinsight/shineout-next/pull/934))
- 修复 `Form` 的 `FormRef.validateFields("friends[1]")` 这种用法不生效和 `FormRef.clearValidate(["friends[1]"])` 报错的问题 ([#928](https://github.com/sheinsight/shineout-next/pull/928))
- 修复 `Image` 在预览大图时的鼠标手势不正确问题 ([#938](https://github.com/sheinsight/shineout-next/pull/938))
- 修复 `Input` 开启 `digits` 是值为 0 的情况下依然可以输入小数的问题（Regression: since v3.5.7） ([#935](https://github.com/sheinsight/shineout-next/pull/935))
- 修复 `List` 设置 `size` 属性后选择行的 `Checkbox` 不跟随尺寸的问题 ([#929](https://github.com/sheinsight/shineout-next/pull/929))
- 修复 `Table` 在虚拟列表大数据下拖拽滚动条时和调用 `scrollToIndex` 的性能问题（Regression: since: v3.5.4） ([#937](https://github.com/sheinsight/shineout-next/pull/937))
- 调整 `Tabs` 首次挂载布局更新方式 ([#945](https://github.com/sheinsight/shineout-next/pull/945))
- 修复 `Transfer` 的 `renderFilter` 内部获取不到外部数据的问题 ([#932](https://github.com/sheinsight/shineout-next/pull/932))
- 修复 `Transfer` 的 `filterProps` 中 `isSrouce` 错别字为 `isSource` 的问题 ([#932](https://github.com/sheinsight/shineout-next/pull/932))
- 修复 `Tree` 组件一级的叶子结点缩进不正确的问题 ([#941](https://github.com/sheinsight/shineout-next/pull/941))

## 3.5.7
<span class="time">2025-01-14</span>
### 💎 Enhancement
- `Form.FieldSet` children 的 `onChange` 方法增加第二个参数 `options`，设置 options.validate 为 false 时，不立即校验该字段 ([#912](https://github.com/sheinsight/shineout-next/pull/912))
- 优化 `Input` 在 `type='number'` 开启 `coin` 下输入溢出内容时的交互逻辑 ([#919](https://github.com/sheinsight/shineout-next/pull/919))
- `Upload` 设置 customResult 时，增加回调方法的参数: `recoverValue` 和 `onValueRecover` ([#915](https://github.com/sheinsight/shineout-next/pull/915))
### 🐞 BugFix
- 修复 `Form` 在 `Modal` 组件中嵌套使用时，子 Form 卸载后父 Form 无法提交的问题 ([#914](https://github.com/sheinsight/shineout-next/pull/914))
- 修复 `Form` 的 FormRef.validateFields 方法校验数组类型字段不生效的问题 ([#909](https://github.com/sheinsight/shineout-next/pull/909))
- 修复 `Input` 开启 `coin` 情况下初始化数据不展示千分号的问题 ([#919](https://github.com/sheinsight/shineout-next/pull/919))
- 修复 `Input` 设置 `type='number'` 且开启 `coin` 属性后值为数字 0 时展示异常的问题 ([#916](https://github.com/sheinsight/shineout-next/pull/916))
- 修复 `Select` 单选模式下设置了 value 为数组类型，此时开启 `onFilter` 后组件渲染报错的问题 ([#910](https://github.com/sheinsight/shineout-next/pull/910))
- 修复 `Upload.Button` 不支持 mode=outline 的问题 ([#918](https://github.com/sheinsight/shineout-next/pull/918))

## 3.5.6
<span class="time">2025-01-06</span>
### 🐞 BugFix
- 修复 `Cascader` 在输入搜索过程中点击选项后 `onChange` 第二参数未返回的问题 ([#904](https://github.com/sheinsight/shineout-next/pull/904))
- 修复 `Cascader` 选择结果后箭头和关闭 icon 展示异常的问题 ([#903](https://github.com/sheinsight/shineout-next/pull/903))
- 修复 `Checkbox.Group` 在嵌套情况下影响内部选中状态的问题 ([#907](https://github.com/sheinsight/shineout-next/pull/907))
- 修复 `DatePicker` 在开启 `range` 和 `open` 属性后第一次点击无法选择日期的问题 ([#897](https://github.com/sheinsight/shineout-next/pull/897))
- 修复 `Form.Field` 下的 Input 使用 onChange 设置对象格式的值时，光标跳到末尾的问题(Regression: since v3.4.4) ([#901](https://github.com/sheinsight/shineout-next/pull/901))
- 修复 `Form.FieldSet` 在非结尾位置插入数据时，数组的渲染显示异常的问题(Regression: since v3.5.4) ([#889](https://github.com/sheinsight/shineout-next/pull/889))
- 修复 `Popover` 在 `position='left'` 模式下三角箭头和 trigger 元素之间的垫片元素不生效的问题 ([#906](https://github.com/sheinsight/shineout-next/pull/906))
- 修复 `Radio.Group` 传 data 属性用法下，设置 `size` 属性不生效的问题 ([#893](https://github.com/sheinsight/shineout-next/pull/893))
- 修复 `Select` 多选模式下，开启 `onFilter` 后且使用 `open` 做面板受控打开时，自动聚焦失效的问题 ([#891](https://github.com/sheinsight/shineout-next/pull/891))
- 修复 `Spin` 的 ring 样式在微前端框架下颜色不继承的问题 ([#898](https://github.com/sheinsight/shineout-next/pull/898))
- 修复 `Steps` 在 `size='large'` 情况下样式异常的问题 ([#900](https://github.com/sheinsight/shineout-next/pull/900))
- 修复 `Steps` 的 `type='arrow'` 模式下小尺寸样式异常的问题 ([#899](https://github.com/sheinsight/shineout-next/pull/899))

## 3.5.5
<span class="time">2024-12-24</span>
### 💎 Enhancement
- `Table` 空数据状态下，tbody 区域可展示横向滚动条 ([#872](https://github.com/sheinsight/shineout-next/pull/872))
### 🐞 BugFix
- 修复 `Form` 在按回车提交表单时表单中 `Input` 的 `trim` 功能失效的问题 ([#871](https://github.com/sheinsight/shineout-next/pull/871))
- 修复 `Popover` 受控为 true 但不在视口范围内时无法展示的问题 ([#880](https://github.com/sheinsight/shineout-next/pull/880))
- `Table` 空数据状态下，右侧有固定列时，横向滚动时右侧可能有内容露底显示问题 ([#872](https://github.com/sheinsight/shineout-next/pull/872))
- 修复 `Tabs.Panel` 设置动态属性后可能导致的 `Tabs.Header` 渲染顺序不正确的问题(Regression: since 3.5.3) ([#882](https://github.com/sheinsight/shineout-next/pull/882))
- 修复 `Tabs` 动态删除末尾的 Tab 时，TabsHeader 没有正确的删除(Regression: since 3.5.3) ([#870](https://github.com/sheinsight/shineout-next/pull/870))

## 3.5.4
<span class="time">2024-12-12</span>
### 🆕 Feature
- 新增 `scopeNormalizeStyle` 方法，用于在组件外部重置初始化样式的作用域 ([#857](https://github.com/sheinsight/shineout-next/pull/857))
- `Table` 新增 `expandIcon` 属性，支持自定义渲染可展开行的 icon 区域内容 ([#864](https://github.com/sheinsight/shineout-next/pull/864))
### 💎 Enhancement
- 优化 `Steps` 的 `disabled` 用法，`Steps` 支持传入 boolean 或 function 类型，`Step` 支持传入 boolean 类型且优先级大于 `Steps` ([#860](https://github.com/sheinsight/shineout-next/pull/860))
### 🚀 Performance
- 优化 `Table` 在大合并行数据下的性能 ([#850](https://github.com/sheinsight/shineout-next/pull/850))
### 🐞 BugFix
- 修复 `DatePicker` 开启 `quickSelect` 模式下选择快速选项后清空值的问题 ([#855](https://github.com/sheinsight/shineout-next/pull/855))
- 修复 `DatePicker` 开启 `inputable` 和 `range` 后无法输入合法日期的问题 ([#853](https://github.com/sheinsight/shineout-next/pull/853))
- 修复 `Form.FieldSet` 使用 set 方法设置后，输入文本后光标失焦的问题(Regression: since v3.5.3) ([#851](https://github.com/sheinsight/shineout-next/pull/851))
- 修复 `Form` 嵌套 `Form` 的提交和重置行为 ([#849](https://github.com/sheinsight/shineout-next/pull/849))
- 修复 `Image` 在 `fit` 属性为 fill 或 fit 时，图片可能无法加载的问题 ([#847](https://github.com/sheinsight/shineout-next/pull/847))
- 修复 `Steps.Step` 设置 `disabled` 属性后功能失效的问题 ([#854](https://github.com/sheinsight/shineout-next/pull/854))
- 修复 `Sticky` 设置负值 `top` 或 `bottom` 值时组件报错的问题 ([#848](https://github.com/sheinsight/shineout-next/pull/848))
- 修复 `Table` 合并行数据在虚拟列表下偶现的抖动问题 ([#861](https://github.com/sheinsight/shineout-next/pull/861))
- 修复 `Table` 同时设置了`defaultTreeExpandKeys`, `treeExpandKeys`, `onTreeExpand`后导致的组件渲染卡死问题 ([#852](https://github.com/sheinsight/shineout-next/pull/852))

## 3.5.3
<span class="time">2024-12-04</span>
### 🆕 Feature
- `Tabs` 新增 `allowNonPanel` 属性，开启后支持渲染非 `Tabs.Panel` 子组件，例如 `Form.FieldSet` ([#812](https://github.com/sheinsight/shineout-next/pull/812))
- `Tooltip` 新增 `persistent` 属性，鼠标悬停提示信息时将不会关闭 ([#813](https://github.com/sheinsight/shineout-next/pull/813))
### 💎 Enhancement
- 优化所有组件，加上统一格式的根 className，例如'soui-button'
- 增强 `Form` 的 `formRef`，增加 `validateFieldsWithValue` 方法，返回校验值 ([#812](https://github.com/sheinsight/shineout-next/pull/812))
- 增强 `Form` 的 `formRef`，增加 `scrollToField` 方法，支持根据 name 滚动至指定表单项 ([#812](https://github.com/sheinsight/shineout-next/pull/812))
- `Tooltip` 的 `persistent` 属性支持 `setConfig` 全局配置 ([#832](https://github.com/sheinsight/shineout-next/pull/832))
### 🐞 BugFix
- 调整 `Button` 加载状态下仅隐藏前置图标，不隐藏后置图标 ([#823](https://github.com/sheinsight/shineout-next/pull/823))
- 修复 `DatePicker` 在打开过日期选择面板后，然后切换多语言后显示的星期顺序不正确的问题 ([#846](https://github.com/sheinsight/shineout-next/pull/846))
- 修复 `DatePicker` 从 setLocale 获取到的 `startOfWeek` 不是 0 时，展示的星期顺序不正确的问题 ([#845](https://github.com/sheinsight/shineout-next/pull/845))
- 修复 `DatePicker` 在设置 `inputable` 和 `range` 后开始时间可以输入非法值的问题 ([#826](https://github.com/sheinsight/shineout-next/pull/826))
- 修复 `Form` 的 `onChange` 执行多次且数组嵌套字段模式下死循环的问题(Regression: since v3.4.4,v3.5.2) ([#842](https://github.com/sheinsight/shineout-next/pull/842))
- 修复 `Form` 的 `reserveAble` 属性在处理嵌套字段时，无法保留值的问题 ([#834](https://github.com/sheinsight/shineout-next/pull/834))
- 修复 `Form` 的 `formRef` 上的 set 方法，为某个字段手动设置相同长度的数组值时，无法更新值的问题 ([#835](https://github.com/sheinsight/shineout-next/pull/835))
- 修复 `Form` 校验字段为嵌套字段时，自定义校验方法第二参数结构错误的问题 ([#829](https://github.com/sheinsight/shineout-next/pull/829))
- 修复 `Table` 合并行数据的最大行数超过 rowsInView 时，导致垂直滚动时，这个合并单元格的内容闪烁的问题 ([#836](https://github.com/sheinsight/shineout-next/pull/836))
- 修复 `Table` 的 column type 为'checkbox'，且 column 的 render 为函数时，render 不生效的问题 ([#825](https://github.com/sheinsight/shineout-next/pull/825))

## 3.5.2
<span class="time">2024-11-28</span>
### 💎 Enhancement
- 优化 `Rate` 的点击动画效果，提升用户交互的流畅性和视觉体验 ([#811](https://github.com/sheinsight/shineout-next/pull/811))
### 🐞 BugFix
- 修复 `Badge` 间距 css var 丢失的问题 ([#814](https://github.com/sheinsight/shineout-next/pull/814))
- 修复初始化表单后 value 异步更新导致 defaultValue 无法再次同步的问题 ([#817](https://github.com/sheinsight/shineout-next/pull/817))
- 修复 `Form.FieldSet` 初始化默认值后更新内部值异常的问题 ([#816](https://github.com/sheinsight/shineout-next/pull/816))
- 修复 `Form.FieldSet` 设置默认值覆盖前者初始化值的问题 ([#808](https://github.com/sheinsight/shineout-next/pull/808))
- 修复 `Image` 组件开启 `lazy` 后在 fixed 定位容器下检查交叉异常的问题 ([#820](https://github.com/sheinsight/shineout-next/pull/820))
- 修复 `Select` 开启 `filterSameChange` 后单选模式下选择重复项无法关闭面板的问题 ([#819](https://github.com/sheinsight/shineout-next/pull/819))
- 修复 `Select` 默认事件引起的点击异常问题(Regression: since v3.4.4) ([#810](https://github.com/sheinsight/shineout-next/pull/810))
- 修复 `Select` 开启创建选项后无法选中创建内容的问题(Regression: since v3.4.4) ([#807](https://github.com/sheinsight/shineout-next/pull/807))
- 修复 `Select` 在开启 `absolute` 属性后，多选模式下选择内容换行后面板位置不更新的问题 ([#804](https://github.com/sheinsight/shineout-next/pull/804))
- 修复 `Table` 设置了`fixed`或`virtual`，但未设置表格高度时，动态添加表格行后横向滚动条出现抖动的问题 ([#821](https://github.com/sheinsight/shineout-next/pull/821))
- 修复 `Tree` 组件开启 `doubleClickExpand` 后，双击节点（非根节点）无法展开的问题 ([#818](https://github.com/sheinsight/shineout-next/pull/818))

## 3.5.1
<span class="time">2024-11-14</span>
### 🆕 Feature
- `Cascader` 单选模式下搜索结果列表支持虚拟列表 ([#798](https://github.com/sheinsight/shineout-next/pull/798))
### 🐞 BugFix
- 修复 `Cascader` 在开启 `unmatch` 情况下指定 renderItem 为 string 类型时渲染异常的问题(Regression: since v3.5.0) ([#800](https://github.com/sheinsight/shineout-next/pull/800))
- 修复 `Cascader` 非虚拟列表情况下搜索内容溢出列表的问题 ([#798](https://github.com/sheinsight/shineout-next/pull/798))
- 修复 `DatePicker` 的 `align` 属性失效的问题(Regression: since v3.4.1) ([#799](https://github.com/sheinsight/shineout-next/pull/799))
- 修复 `Form.FieldSet` 校验返参为 Error 数组时校验异常的问题 ([#796](https://github.com/sheinsight/shineout-next/pull/796))
- 修复 `Table` 的列设置为百分比宽度时，单元格内的自定义的 css ellipsis 效果不生效的问题(Regression: since v3.5.0) ([#795](https://github.com/sheinsight/shineout-next/pull/795))
- 修复 `Tabs` 折叠用法下，折叠面板后 Tabs.Panel 内容溢出展示的问题 ([#794](https://github.com/sheinsight/shineout-next/pull/794))

## 3.5.0
<span class="time">2024-11-11</span>
### 🆕 Feature
- `Cascader` 新增 `renderCompressed` 属性，自定义渲染折叠展示内容([#751](https://github.com/sheinsight/shineout-next/pull/751))
- `Cascader` 新增 `virtual` 属性，支持虚拟列表([#746](https://github.com/sheinsight/shineout-next/pull/746))
- `Form` 新增 `useForm` 用法，获取的 form 实例方法与 formRef 相同，但是可以在任何地方使用，不受组件渲染影响 ([#711](https://github.com/sheinsight/shineout-next/pull/711))
- `Form` 新增 `reserveAble` 属性，用于控制表单项是否保留值 ([#772](https://github.com/sheinsight/shineout-next/pull/772))
- `Table` 新增 `sortDirections` 属性，支持对全部列设置排序方向，同时`column` 新增 `sortDirections` 属性，支持对单列设置排序方向 ([#784](https://github.com/sheinsight/shineout-next/pull/784))
- `Table` 新增 `scrollColumnIntoView` 方法，支持根据列 key 跳转至指定列 ([#738](https://github.com/sheinsight/shineout-next/pull/738))
- `Table` 新增 `scrollColumnByLeft` 方法，支持自定义跳转至指定横向位置 ([#738](https://github.com/sheinsight/shineout-next/pull/738))
### 💎 Enhancement
- `Form.Item` 的 `label` 属性新增对象配置模式，支持在标签文本旁添加 tooltip 提示说明 ([#788](https://github.com/sheinsight/shineout-next/pull/788))
- 优化 `Select` 默认 `placeholder` 占位形式 ([#788](https://github.com/sheinsight/shineout-next/pull/788))
- 优化 `Table` 内的弹出层类元素跟随滚动的行为逻辑 ([#754](https://github.com/sheinsight/shineout-next/pull/754))
- `Table` 树形数据用法下，新增 `loader` 开启动态加载子节点数据 ([#747](https://github.com/sheinsight/shineout-next/pull/747))
- `Table` 树形数据用法下，新增 `treeExpandIcon` 自定义展开/折叠图标 ([#747](https://github.com/sheinsight/shineout-next/pull/747))
- 优化 `Table` 非虚拟列表场景下，横向纵向的滚动事件修改为原生滚动 ([#740](https://github.com/sheinsight/shineout-next/pull/740))
### 🐞 BugFix
- 修复 `Modal` 开启全屏和可拖拽时的交互异常问题 ([#739](https://github.com/sheinsight/shineout-next/pull/739))

## 3.4.7
<span class="time">2024-11-08</span>
### 🐞 BugFix
- 修复 `Select` 在 value 为空对象时 placeholder 失效的问题 ([#783](https://github.com/sheinsight/shineout-next/pull/783))
- 修复 `setConfig` 干涉部分组件内部 spin 固有样式的问题 ([#786](https://github.com/sheinsight/shineout-next/pull/786))

## 3.4.6
<span class="time">2024-11-05</span>
### 🐞 BugFix
- 修复 `DatePicker` 禁用后可聚焦的问题 ([#778](https://github.com/sheinsight/shineout-next/pull/778))
- `Input.Number` 输入框删完最后一个数字时不触发 onChange 的问题（此时返回 null 或 undefined） ([#780](https://github.com/sheinsight/shineout-next/pull/780))
- 修复 `Select` 禁用模式下 icon 样式异常的问题 ([#778](https://github.com/sheinsight/shineout-next/pull/778))
- 修复 `Table` 点击 checkbox 触发行展开的问题 ([#777](https://github.com/sheinsight/shineout-next/pull/777))

## 3.4.5
<span class="time">2024-10-31</span>
### 🆕 Feature
- `Image` 新增`inViewOnly`: 仅当图片在视口内时才加载图片，需配合 `lazy` 使用 ([#767](https://github.com/sheinsight/shineout-next/pull/767))
### 💎 Enhancement
- 优化 `CardGroup` 大数据量下的渲染性能 ([#756](https://github.com/sheinsight/shineout-next/pull/756))
### 🐞 BugFix
- 修复 `Cascader` 开启 `expandTrigger` 为 hover 或 hover-only 时点击 checkbox 勾选失效的问题 ([#770](https://github.com/sheinsight/shineout-next/pull/770))
- 修复 `Modal` 的 confirm 模式下确认按钮 loading 交互失效的问题 ([#774](https://github.com/sheinsight/shineout-next/pull/774))
- 修复 `Select` 动态的从单选切换为多选时，placeholder 内容显示不完整的问题 ([#769](https://github.com/sheinsight/shineout-next/pull/769))
- 修复 `Table` 的 `minWidth` 设置失效的问题 ([#774](https://github.com/sheinsight/shineout-next/pull/774))
- 修复 `Table` 中点击部分组件会触发行展开的问题 ([#761](https://github.com/sheinsight/shineout-next/pull/761))

## 3.4.4
<span class="time">2024-10-28</span>
### 🆕 Feature
- `Pagination` 新增 `select` 属性支持配置弹窗部分信息 ([#753](https://github.com/sheinsight/shineout-next/pull/753))
### 💎 Enhancement
- `DatePicker` 快速选择配置项新增 `immediate` 属性支持选择后立刻关闭面板 ([#745](https://github.com/sheinsight/shineout-next/pull/745))
- `Form` 的 formRef 的 set 方法支持嵌套对象值 ([#711](https://github.com/sheinsight/shineout-next/pull/711))
- 优化 `Table` 的 `Spin` 支持从全局配置读取相关设置 ([#727](https://github.com/sheinsight/shineout-next/pull/727))
- `Textarea` 的 `info` 重构为 Popover 实现，支持`popoverProps`设置 ([#735](https://github.com/sheinsight/shineout-next/pull/735))
### 🐞 BugFix
- 修复 `Cascader` 无法拖拽选中 dom 内容的问题 ([#729](https://github.com/sheinsight/shineout-next/pull/729))
- 修复 `Checkbox.Group` 在 React 18.3.0 以上版本中报 defaultProps 告警的问题 ([#725](https://github.com/sheinsight/shineout-next/pull/725))
- 修复 `DatePicker` 的 key 值书写问题，解决 React 18.3.0 以上版本 key 字段报错的问题 ([#726](https://github.com/sheinsight/shineout-next/pull/726))
- 修复 `Form.Field` 设置了 `defaultValue` 后在部分场景下失效的问题 ([#742](https://github.com/sheinsight/shineout-next/pull/742))
- 修复 `Form` 的 onSubmit 时间可能比 onChange 早的问题（例如扫码枪触发的表单提交） ([#731](https://github.com/sheinsight/shineout-next/pull/731))
- 修复 `Form.Field` 在设置默认值情况下 `value` 改变后可能失效的问题 ([#730](https://github.com/sheinsight/shineout-next/pull/730))
- 修复 `Image` 组件实际渲染的高度比设置的 height 高 2 像素的问题 ([#744](https://github.com/sheinsight/shineout-next/pull/744))
- 修复 `List` 配置分页信息后报错的问题 ([#743](https://github.com/sheinsight/shineout-next/pull/743))
- 修复 `List` 数据为空样式异常的问题 ([#743](https://github.com/sheinsight/shineout-next/pull/743))
- 修复 `Popover.Confirm` 的弹出容器的宽度在 Table 中有可能显示较窄的问题 ([#736](https://github.com/sheinsight/shineout-next/pull/736))
- 修复 `Popover` 在横滚的 Table 中有可能弹出位置不准确的问题 ([#741](https://github.com/sheinsight/shineout-next/pull/741))
- 修复 `Radio.Group` 在 React 18.3.0 以上版本中报 defaultProps 告警的问题 ([#725](https://github.com/sheinsight/shineout-next/pull/725))
- 修复 `Select` 动态的从单选切换为多选时，placeholder 内容显示不完整的问题 ([#769](https://github.com/sheinsight/shineout-next/pull/769))
- 修复 `Select` 选中值之后再次聚焦时的回显值显示不正确的问题 ([#748](https://github.com/sheinsight/shineout-next/pull/748))
- 修复 `Select` 单选场景下开启搜索后，焦点输入框时没有自动选中文本的问题 ([#737](https://github.com/sheinsight/shineout-next/pull/737))
- 修复 `Select` 组件无法拖拽选中 dom 内容的问题 ([#729](https://github.com/sheinsight/shineout-next/pull/729))
- 修复 `TreeSelect` 组件无法拖拽选中 dom 内容的问题 ([#729](https://github.com/sheinsight/shineout-next/pull/729))

## 3.4.3
<span class="time">2024-10-14</span>
### 💎 Enhancement
- 优化 `setConfig` 中 `spin` 的配置项，支持全局配置更多内容
- `Tree` 的 `setActive` 新增第二参当前选中节点数据数的返回 ([#699](https://github.com/sheinsight/shineout-next/pull/699))
- 新增 `Tree` 类型 `KeygenResult` 导出 ([#699](https://github.com/sheinsight/shineout-next/pull/699))
### 🐞 BugFix
- 修复`Checkbox`在 createPortal 中使用时，无法改变勾选状态的问题 ([#710](https://github.com/sheinsight/shineout-next/pull/710))
- 修复 `Checkbox.Group` 在未传递 `data` 情况下使用 Checkbox 时 disabled 属性失效的问题
([#697](https://github.com/sheinsight/shineout-next/pull/697))
- 修复 `Image` 组件动态 src 场景下组件状态异常的问题 ([#709](https://github.com/sheinsight/shineout-next/pull/709))
- 修复 `Image` 组件默认值错误的问题 ([#708](https://github.com/sheinsight/shineout-next/pull/708))
- `Input.Group` 同步支持 `onBlur` 事件 ([#701](https://github.com/sheinsight/shineout-next/pull/701))
- 修复 `Link` 的 `disabled` 状态下可以触发点击事件的问题 ([#698](https://github.com/sheinsight/shineout-next/pull/698))
- 修复 `Message` 样式生成异常的问题 ([#706](https://github.com/sheinsight/shineout-next/pull/706))
- 修复 `Popover` 在滚动容器中的极限边界场景下不可见的问题 ([#702](https://github.com/sheinsight/shineout-next/pull/702))
- 修复 `Select` 开启 absolute 和 multiple 之后，下拉框较长选项的文字与勾选图标重叠的问题 ([#703](https://github.com/sheinsight/shineout-next/pull/703))
- 修复 `Table` 的 width 和 ColumnItem 的 width 的类型问题 ([#717](https://github.com/sheinsight/shineout-next/pull/717))
- 修复 `Tabs` 页签内容异步变更后下划线长度异常的问题 ([#707](https://github.com/sheinsight/shineout-next/pull/707))
- 修复 `Tag` 在 `onClose` 时触发 onClick 的问题 ([#712](https://github.com/sheinsight/shineout-next/pull/712))
- 修复 `Tree` 组件在开启 `loader` 情况下设置 `defaultExpandAll` 展开状态异常的问题 ([#699](https://github.com/sheinsight/shineout-next/pull/699))
- 修复 `Tree` 的 `setActive` 会触发多次的问题 ([#699](https://github.com/sheinsight/shineout-next/pull/699))

## 3.4.2
<span class="time">2024-09-29</span>
### 🐞 BugFix
- 修复 `Form` 校验 name 为数组字段时依赖前后 draft 情况下校验可能不准确的问题 ([#684](https://github.com/sheinsight/shineout-next/pull/684))
- 修复表单组件 `name` 为数组类型且拥有 `defaultValue` 情况下重置多次触发 onChange 的问题 ([#684](https://github.com/sheinsight/shineout-next/pull/684))
- 修复`Input.Group`的 border 在微前端框架下的异常表现 ([#685](https://github.com/sheinsight/shineout-next/pull/685))
- 修复 `Select` 的 `columns` 只有 1 列情况下列表宽度不自动撑满的问题 ([#686](https://github.com/sheinsight/shineout-next/pull/686))
- 修复 `Table` 空数据状态下可能出现垂直滚动条的问题 ([#690](https://github.com/sheinsight/shineout-next/pull/690))
- 修复 `Table` 在 `data` 动态变化后滚动状态异常的问题 ([#687](https://github.com/sheinsight/shineout-next/pull/687))
- 修复 `Tabs` 在 `shape='line'` 嵌套使用时的高亮下划线在某些情况下不显示的问题 ([#692](https://github.com/sheinsight/shineout-next/pull/692))
- 修复 `Tag` 内部容器宽度继承异常的问题 ([#691](https://github.com/sheinsight/shineout-next/pull/691))
- 修复 `useTree` hooks 在重复 key 数据情况下后续节点无法正常注册的问题 ([#694](https://github.com/sheinsight/shineout-next/pull/694))

## 3.4.1
<span class="time">2024-09-20</span>
### 🐞 BugFix
- 优化 `DatePicker` 的结果展示区域，改为不换行展示 ([#680](https://github.com/sheinsight/shineout-next/pull/680))
- 修复 `Tabs` 的 card 模式下的边框样式 ([#681](https://github.com/sheinsight/shineout-next/pull/681))
- 修复 `Tree` 一级节点的缩进过大的问题 ([#682](https://github.com/sheinsight/shineout-next/pull/682))

## 3.4.0
<span class="time">2024-09-19</span>
### 🆕 Feature
- 新增 `Badge` 徽标组件
- 新增 `Link` 链接组件
- `DatePicker` 新增 needConfirm 属性: 是否开启手动确认按钮，开启后只有点击确认按钮才会提交选择的值。 ([#650](https://github.com/sheinsight/shineout-next/pull/650))
- `DatePicker` 新增 clearToUndefined，点击清除后返回 undefined ([#644](https://github.com/sheinsight/shineout-next/pull/644))
- `Dropdown` 新增 `zIndex` 属性 ([#660](https://github.com/sheinsight/shineout-next/pull/660))
- `Menu` 新增父节点激活状态下的文字颜色 token ([#659](https://github.com/sheinsight/shineout-next/pull/659))
- `Select` 组件支持动态虚拟列表行高([#646](https://github.com/sheinsight/shineout-next/pull/646))
- `Select` 组件新增 `onLoadMore` 属性，支持滚动加载 ([#610](https://github.com/sheinsight/shineout-next/pull/594))
- `Select` 组件新增 `threshold` 属性，支持设置滚动加载阈值 ([#610](https://github.com/sheinsight/shineout-next/pull/594))
- `Select` 组件新增 `trigger` 属性，支持更改展开下拉面板的触发方式 ([#610](https://github.com/sheinsight/shineout-next/pull/594))
- `Table` 新增属性 `showTopScrollbar`，开启顶部滚动条 ([#671](https://github.com/sheinsight/shineout-next/pull/671))
- `Table` 的 `onScroll` 事件新增 top 参数 ([#658](https://github.com/sheinsight/shineout-next/pull/658))
- `Table` 的 `Ref` 支持 `getRenderIndexByData` 方法，用于获取指定数据在渲染列表中的索引
- `Textarea` 的 `info` 属性新增配置模式，支持配置定位 ([#676](https://github.com/sheinsight/shineout-next/pull/676))
- `Tree` 组件新增`setActive`，与`active`组成高亮的受控功能 ([#665](https://github.com/sheinsight/shineout-next/pull/665))
### 💎 Enhancement
- 优化 `Select` 组件在同时使用 `emptyText` 和 `renderOptionList` 时的渲染顺序([#627](https://github.com/sheinsight/shineout-next/pull/627))
### 🐞 BugFix
- 修复 `Carousel` 点击箭头切换后，鼠标悬停时没有禁用切换的现象 ([#674](https://github.com/sheinsight/shineout-next/pull/674))
- 修复 `Modal` 方法调用方式时，点击确定或取消按钮没有关闭动画 ([#675](https://github.com/sheinsight/shineout-next/pull/675))
- 修复 `Modal` 下存在多个`Form`时，`Modal.Submit`提交无效的问题 ([#625](https://github.com/sheinsight/shineout-next/pull/625))
- 修复 `Rate` 在 Safari 浏览器下对齐样式异常的问题([#670](https://github.com/sheinsight/shineout-next/pull/670))
- 修复 TableRef 的`scrollToIndex`的回调方法不生效问题 ([#651](https://github.com/sheinsight/shineout-next/pull/651))
- 修复 `Tabs.Panel` 是异步的动态长度时，需要 resize 页面才会出现左右的滚动箭头 ([#668](https://github.com/sheinsight/shineout-next/pull/668))
- 修复 `TreeSelect` 的 `filterDelay` 属性失效的问题 ([#672](https://github.com/sheinsight/shineout-next/pull/672))

## 3.3.7
<span class="time">2024-09-14</span>
### 🐞 BugFix
- 修复 `Checkbox.Group` 的 children 中的 `Checkbox` 的 onChange 不触发的问题 ([#638](https://github.com/sheinsight/shineout-next/pull/638))
- 修复 `DatePicker` 的 defaultPickerValue 的第二位不生效的问题 ([#660](https://github.com/sheinsight/shineout-next/pull/660))
- 修复 `Form` 绑定的 name 重复时，表单的受控行为不准确的问题
- 修复`Input.Number` 输入过程中的字符串格式(例如 1.)触发 onChange 的问题 ([#655](https://github.com/sheinsight/shineout-next/pull/655))
- 修复 `Popover` 的 children 点击事件冒泡外层的问题 ([#654](https://github.com/sheinsight/shineout-next/pull/654))
- 修复 `Table` 在 `Tabs` 中切换时的滚动条抖动一下的问题 ([#667](https://github.com/sheinsight/shineout-next/pull/667))
- 修复 `Table` 虚拟滚动时，默认的 rowsInView 渲染结果不够撑满一屏导致的滚动空白问题 ([#628](https://github.com/sheinsight/shineout-next/pull/628))
- 修复 `Table` 虚拟滚动的内部元素被执行 scrollIntoView 导致的页面偏移的问题 ([#624](https://github.com/sheinsight/shineout-next/pull/624))
- 修复 `Tabs` 在 `shape='button'` 风格下 ref 属性透传警告的问题 ([#657](https://github.com/sheinsight/shineout-next/pull/657))
- 修复 `Transfer` 的 `onSelectChange` 第二参数丢失的问题 ([#652](https://github.com/sheinsight/shineout-next/pull/652))

## 3.3.6
<span class="time">2024-09-02</span>
### 🐞 BugFix
- 修复 `Cascader` 的 `onChange` 第二参数缺失的问题([#632](https://github.com/sheinsight/shineout-next/pull/632))
- 修复 `DatePicker` 快速选择固定值无法高亮的问题 ([#620](https://github.com/sheinsight/shineout-next/pull/620))
- 修复 `Tooltip` 默认 `auto` 不生效、边界场景被遮挡的问题 ([#623](https://github.com/sheinsight/shineout-next/pull/623))
- 修复 `Tooltip` 在 Chrome 128 版本下，document.body 设置了 zoom 时的定位问题 ([#622](https://github.com/sheinsight/shineout-next/pull/622))

## 3.3.5
<span class="time">2024-08-22</span>
### 🐞 BugFix
- 修复 `Tabs` 下渲染非 Tabs.Panel 子组件时报错的问题

## 3.3.4
<span class="time">2024-08-21</span>
### 🆕 Feature
- 支持 `Select` 的树形数据展开时，弹出层的位置自适应([#614](https://github.com/sheinsight/shineout-next/pull/614))
### 🐞 BugFix
- 修复 `Select` 的树形数据展开时，设置的 autoAdapt(下拉列表宽度根据内容自由展开)不生效的问题([#614](https://github.com/sheinsight/shineout-next/pull/614))

## 3.3.3
<span class="time">2024-08-15</span>
### 🆕 Feature
- 支持 `Cascader` 单选搜索时，展示非 string 类型的值(renderItem 返回的结果) ([#605](https://github.com/sheinsight/shineout-next/pull/605))
- 支持 `Select` 单选搜索时，展示非 string 类型的值(renderItem 返回的结果) ([#605](https://github.com/sheinsight/shineout-next/pull/605))
- 支持 `TreeSelect` 单选搜索时，展示非 string 类型的值(renderItem 返回的结果) ([#605](https://github.com/sheinsight/shineout-next/pull/605))
### 🐞 BugFix
- 修复 `DatePicker` 聚焦但不打开面板场景下无法回填原值的问题 ([#604](https://github.com/sheinsight/shineout-next/pull/604))
- 修复 `Dropdown` 的 `data` 的 content 传了 onClick 时，点击后弹出层不消失的问题 ([#603](https://github.com/sheinsight/shineout-next/pull/603))
- 修复 `Menu` 水平模式下高度 100%的问题
- 修复 `Select` 选中项最终为假值时渲染异常的问题 ([#594](https://github.com/sheinsight/shineout-next/pull/594))
- 修复 `Table` 空数据时,resize 后的固定列位置不对的问题 ([#606](https://github.com/sheinsight/shineout-next/pull/606))
- 修复 `Table` 有合并行数据时滚动到数据的底部时，依然能滚动一段距离的问题
- 修复 `Table` 有合并行数据时多次动态切换 data 时,表格重复渲染出多余的行的问题 ([#592](https://github.com/sheinsight/shineout-next/pull/592))
- 修复 `Table` 的虚拟列表场景下的合并行中内容闪烁的问题 ([#595](https://github.com/sheinsight/shineout-next/pull/595))
- 修复 `Table` 的列中有动态加载的内容导致 tbody 和 thead 不对齐的问题 ([#595](https://github.com/sheinsight/shineout-next/pull/595))
- 修复 `Tabs` 下的 a 标签在边缘区域无法点击的问题

## 3.3.2
<span class="time">2024-07-29</span>
### 🐞 BugFix
- 修复 `Dropdown` 不传 placeholder 时，图标不水平居中的问题 ([#591](https://github.com/sheinsight/shineout-next/pull/591))
- 修复`Input.Group` size 不往下传递的问题 ([#591](https://github.com/sheinsight/shineout-next/pull/591))
- 修复 `Modal` 的 onClick 事件冒泡至父节点的问题 ([#591](https://github.com/sheinsight/shineout-next/pull/591))
- 修复 `Modal` 的 maskCloseAble 和 hideClose 同时设置时, hideClose 不生效的问题 ([#591](https://github.com/sheinsight/shineout-next/pull/591))
- 修复 `Tabs` 的 line 模式下的 hr 线段位置不是从最左边开始绘制的问题 ([#591](https://github.com/sheinsight/shineout-next/pull/591))

## 3.3.0
<span class="time">2024-07-23</span>
### 🆕 Feature
- `Cascader` 支持下拉弹窗溢出自动调整位置([#564](https://github.com/sheinsight/shineout-next/pull/564))
- `Menu` 支持水平模式的暗系主题 ([#505](https://github.com/sheinsight/shineout-next/pull/505))
- `Table` 新增属性 `onCellClick` 支持单元格点击后的回调 ([#550](https://github.com/sheinsight/shineout-next/pull/550))
### 💎 Enhancement
- 优化 `Steps` 点击模式下的样式 ([#586](https://github.com/sheinsight/shineout-next/pull/586))
- 优化 `Steps` 标题布局超出情况下的展示效果 ([#586](https://github.com/sheinsight/shineout-next/pull/586))
### 🐞 BugFix
- 修复 `Checkbox.Group` 设置 `size` 属性不生效的问题 ([#582](https://github.com/sheinsight/shineout-next/pull/582))
- 修复 `DatePicker` 在 range 为 number 的情况下，开始时间可以大于结束时间的问题 ([#579](https://github.com/sheinsight/shineout-next/pull/579))
- 修复 `Menu.Search` 的 `collapse` 属性拼写错误的问题 ([#585](https://github.com/sheinsight/shineout-next/pull/585))
- 修复 `Spin` 样式穿透生效的问题 ([#583](https://github.com/sheinsight/shineout-next/pull/583))
- 修复 `Steps` 默认样式下点击热区异常的问题 ([#586](https://github.com/sheinsight/shineout-next/pull/586))
- 修复 `Table` 的 `height` 类型错误，支持 string 类型 ([#584](https://github.com/sheinsight/shineout-next/pull/584))
- 修复 `Table` 在低于 Chrome99 版本下的横向滚动条不可见的问题 ([#580](https://github.com/sheinsight/shineout-next/pull/580))
- 修复 `Table` 虚拟滚动在`Tabs`切换会导致滚动的问题 ([#580](https://github.com/sheinsight/shineout-next/pull/580))
- 修复 `Table` 在数据不断变化的场景下可能导致滚动偏移的位置计算错误 ([#553](https://github.com/sheinsight/shineout-next/pull/553))
- 修复 `Tooltip` delay 属性失效的问题 ([#575](https://github.com/sheinsight/shineout-next/pull/575))

## 3.2.6
<span class="time">2024-07-05</span>
### 🐞 BugFix
- 修复 `Table` 分页的 current 被重置后，不能点击上一个相同页码的问题 ([#569](https://github.com/sheinsight/shineout-next/pull/569))
- 修复 `Table` 在 bordered 模式下, 浏览器缩放引起的滚动条计算偏差问题 ([#562](https://github.com/sheinsight/shineout-next/pull/562))
- 修复 `Table` 在屏幕某些缩放比例下闪烁的问题 ([#562](https://github.com/sheinsight/shineout-next/pull/562))

## 3.2.5
<span class="time">2024-07-02</span>
### 🐞 BugFix
- 修复 `Alert` 在 Safari 下 icon 异常的问题 ([#555](https://github.com/sheinsight/shineout-next/pull/555))
- 修复 `Cascader` 当开启 absolute 属性且数据为空时下拉列表宽度超长的问题([#555](https://github.com/sheinsight/shineout-next/pull/555))
- 修复 `Cascader` height 属性失效导致无法滚动的问题([#555](https://github.com/sheinsight/shineout-next/pull/555))
- 修复 `Steps` 在 Safari 下 icon 异常的问题 ([#555](https://github.com/sheinsight/shineout-next/pull/555))

## 3.2.4
<span class="time">2024-06-26</span>
### 🐞 BugFix
- 修复 `Form` 受控状态 `value` 传入 `null` 会导致数据无法更新的问题 ([#548](https://github.com/sheinsight/shineout-next/pull/548))
### 🐞 Style
- 优化 `Select` 单选结果的样式 ([#549](https://github.com/sheinsight/shineout-next/pull/549))
- 优化 `TreeSelect` 单选结果的样式 ([#549](https://github.com/sheinsight/shineout-next/pull/549))

## 3.2.3
<span class="time">2024-06-25</span>
### 💎 Enhancement
- 优化 `Pagination` 数字按钮点击逻辑，当分页数不变的时候不触发 `onChange` ([#546](https://github.com/sheinsight/shineout-next/pull/546))
### 🐞 BugFix
- 修复 `DatePicker` 日期时间范围选择双击日期时的计算逻辑和 2.x 版本保持一致 ([#543](https://github.com/sheinsight/shineout-next/pull/543))
- 修复 `Modal` 组件在 method 使用方式下 mask 有延迟出现的问题 ([#541](https://github.com/sheinsight/shineout-next/pull/541))
- 修复 `Pagination` 属性 `onChange` 的参数 `sizeChange` 计算错误的问题 ([#546](https://github.com/sheinsight/shineout-next/pull/546))
- 修复 `TreeSelect` 点击高亮逻辑问题 ([#545](https://github.com/sheinsight/shineout-next/pull/545))
### 💅 Style
- 优化 `Input.Group` 聚焦状态的样式 ([#544](https://github.com/sheinsight/shineout-next/pull/544))

## 3.2.2
<span class="time">2024-06-21</span>
### 💎 Enhancement
- 优化 `Table` 虚拟列表高度计算逻辑 ([#530](https://github.com/sheinsight/shineout-next/pull/530))
### 🐞 BugFix
- 修复 `Form.FieldSet` 修改值在某些场景下无法更新的问题 ([#528](https://github.com/sheinsight/shineout-next/pull/528))
- 修复 `Input.Number` 属性 `hideArrow` 被透传到 input 元素的问题 ([#540](https://github.com/sheinsight/shineout-next/pull/540))
- 修复 `Menu` content 缺少了 `flex` 样式 ([#537](https://github.com/sheinsight/shineout-next/pull/537))
- 修复 `Menu` 当传入 `linkKey` 属性，如果数据取不到 `link` 控制台会报错的问题 ([#529](https://github.com/sheinsight/shineout-next/pull/529))
- 修复 `Modal` 组件在 React `StrictMode` 模式下不显示遮罩层的问题 ([#536](https://github.com/sheinsight/shineout-next/pull/536))
- 修复 `Popover` 中元素 `autoFocus` 会导致页面滚动的问题 ([#535](https://github.com/sheinsight/shineout-next/pull/535))
- 修复 `Table` 虚拟列表在缩放场景下可能导致滚动条跳动的问题 ([#539](https://github.com/sheinsight/shineout-next/pull/539))

## 3.2.1
<span class="time">2024-06-17</span>
### 🐞 BugFix
- 修复 `Menu` 引入组件路径错误的问题 ([#526](https://github.com/sheinsight/shineout-next/pull/526))

## 3.2.0
<span class="time">2024-06-14</span>
### 🆕 Feature
- `Cascader` 新增 adjust 属性，支持取消自动调整展开，强制指定方向
- `Datepicker` 新增 adjust 属性，支持取消自动调整展开，强制指定方向
- `Dropdown` 新增 adjust 属性，支持取消自动调整展开，强制指定方向
- `TreeSelect` 新增 adjust 属性，支持取消自动调整展开，强制指定方向
- `Menu` 新增 `Collapse` 属性支持折叠功能 ([#505](https://github.com/sheinsight/shineout-next/pull/505))
- `Menu` 支持 `renderIcon` 属性支持渲染图标 ([#505](https://github.com/sheinsight/shineout-next/pull/505))
- `Menu` 支持 `header` 属性渲染顶部内容 ([#505](https://github.com/sheinsight/shineout-next/pull/505))
### 💅 Style
- 修改 `Form.Item` 标签在顶部时的内边距 ([#436](https://github.com/sheinsight/shineout-next/pull/436))
- `Popover` 优化隐藏箭头后弹层距离触发器的高度 ([#502](https://github.com/sheinsight/shineout-next/pull/502))
### 🎨 Theme
- `Table` 新增不同尺寸下的文字、字重 token
- `Input` 新增 error 状态下的边框、背景 token
- `Datepicker` 组件触发器 token 同步 `Input`
- `Cascader` 组件触发器 token 同步 `Input`
- `TreeSelect` 组件触发器 token 同步 `Input`
- `Select` 组件触发器 token 同步 `Input`

## 3.1.31
<span class="time">2024-06-14</span>
### 🐞 BugFix
- 修复 `Table` 虚拟列表高度被撑高的问题 ([#523](https://github.com/sheinsight/shineout-next/pull/523))
### 💅 Style
- 优化 `Alert` 的样式 ([#523](https://github.com/sheinsight/shineout-next/pull/523))

## 3.1.30
<span class="time">2024-06-13</span>
### 🐞 BugFix
- 修复 `Gap` 属性 `itemStyle` 不生效的问题
- 修复 `Table` 在某些场景下无法滚动的问题 ([#519](https://github.com/sheinsight/shineout-next/pull/519))
- 优化 `Tag` 结构去掉不需要的 div ([#521](https://github.com/sheinsight/shineout-next/pull/521))
### 💅 Style
- 调整 `Button` 文本按钮的加载样式 ([#520](https://github.com/sheinsight/shineout-next/pull/520))

## 3.1.29
<span class="time">2024-06-11</span>
### 🐞 BugFix
- 修复主题 token 变量名错误的问题 ([#517](https://github.com/sheinsight/shineout-next/pull/517))

## 3.1.28
<span class="time">2024-06-07</span>
### 🐞 BugFix
- 修复 `Form.Item` 标签在顶部时标签宽度没有撑开的问题 ([#515](https://github.com/sheinsight/shineout-next/pull/515))
- 修复 `Message` 同时关闭多个消息的时展示错误问题 ([#514](https://github.com/sheinsight/shineout-next/pull/514))
- 修复 `Popover` 卸载后没有清理掉全局事件的问题([#513](https://github.com/sheinsight/shineout-next/pull/513))
- 修复 `Table` 虚拟列表在 Firefox 浏览器滚动条长度超长问题 ([#512](https://github.com/sheinsight/shineout-next/pull/512))

## 3.1.27
<span class="time">2024-06-06</span>
### 🐞 BugFix
- 修复 `DatePicker` 值为空时无法点击选择 0 的问题 ([#507](https://github.com/sheinsight/shineout-next/pull/507))
- 修复 `Form` 在某些场景下 value 更新存在延迟的问题 ([#506](https://github.com/sheinsight/shineout-next/pull/506))
- 修复 `Select` 禁用后筛选框仍然可以输入的问题 ([#509](https://github.com/sheinsight/shineout-next/pull/509))
- 修复 `Select` 合并选项个数计显示错误的问题 ([#508](https://github.com/sheinsight/shineout-next/pull/508))
- 修复 `Slider` 样式问题 ([#511](https://github.com/sheinsight/shineout-next/pull/511))

## 3.1.26
<span class="time">2024-06-05</span>
### 🐞 BugFix
- 修复 `Modal.Confirm` 点击取消和确认时不应该触发 `onClose` 的问题 ([#503](https://github.com/sheinsight/shineout-next/pull/503))
- 修复 `Select` 渲染的 `result` 为空可能会导致页面报错的问题 ([#503](https://github.com/sheinsight/shineout-next/pull/503))
- 修复 `Tooltip` 在边界情况下高频触发 hover 的问题 ([#503](https://github.com/sheinsight/shineout-next/pull/503))

## 3.1.25
<span class="time">2024-06-03</span>
### 🐞 BugFix
- 修复 `ModalMethod` 没有返回关闭方法的问题 ([#501](https://github.com/sheinsight/shineout-next/pull/501))

## 3.1.24
<span class="time">2024-06-03</span>
### 🐞 BugFix
- 修复 `Table` 右侧固定列在某些场景会出现偏移的问题 ([#499](https://github.com/sheinsight/shineout-next/pull/499))
- 修复 `TreeSelect` 异步加载数据时，选中结果没有更新的问题 ([#496](https://github.com/sheinsight/shineout-next/pull/496))

## 3.1.23
<span class="time">2024-06-01</span>
### 🐞 BugFix
- 修复 `Card` 嵌套使用下，外层 `split` 属性会透传影响下层的问题 ([#498](https://github.com/sheinsight/shineout-next/pull/498))

## 3.1.22
<span class="time">2024-05-31</span>
### 💎 Enhancement
- 优化 `Grid` 动态插入样式的逻辑来适配微前端场景 ([#494](https://github.com/sheinsight/shineout-next/pull/494))
### 🐞 BugFix
- 修复 `Tabs` 从可滚状态变为不可以滚动状态的时没有把偏移距离设置为 0 的问题 ([#493](https://github.com/sheinsight/shineout-next/pull/493))
- 修复 `Tree` 当 `disabeld` 为 bool 类型，并且值变化时组件没有更新的问题 ([#495](https://github.com/sheinsight/shineout-next/pull/495))

## 3.1.21
<span class="time">2024-05-31</span>
### 🐞 BugFix
- `setConfig` 设置 `delay: 0` 无效的问题 ([#491](https://github.com/sheinsight/shineout-next/pull/491))

## 3.1.20
<span class="time">2024-05-30</span>
### 🐞 BugFix
- `delay` 默认值设为 `200` 和 2.x 版本保持一致 ([#490](https://github.com/sheinsight/shineout-next/pull/490))
- 修复 `Rule` 参数 `message` 模版语法失效的问题 ([#488](https://github.com/sheinsight/shineout-next/pull/488))
- 修复 `Tag` 当 `children` 为 element 时不应该用 `span` 包裹的问题 ([#487](https://github.com/sheinsight/shineout-next/pull/487))
### 💅 Style
- 修复 `Table` 选择行场景下复选框和文本不对齐问题([#486](https://github.com/sheinsight/shineout-next/pull/486))
- 调整 `Tabs` 按钮和 tab 的间距 ([#489](https://github.com/sheinsight/shineout-next/pull/489))

## 3.1.19
<span class="time">2024-05-29</span>
### 🆕 Feature
- 新增 `equalPanelWidth` 属性，支持根据容器宽度均等分配面板宽度 ([#613](https://github.com/sheinsight/shineout-next/pull/613))
### 💎 Enhancement
- 优化勾选项的容器宽度，默认占满整行，超出后自动省略文案内容 ([#613](https://github.com/sheinsight/shineout-next/pull/613))
### 🐞 BugFix
- 修复 `Cascader` 当 `value` 变为 `undefined` 时下拉选择状态没有更新的问题 ([#483](https://github.com/sheinsight/shineout-next/pull/483))
- 修复 `Transfer` 自定义渲染参数 `selectKeys` 为空问题 ([#484](https://github.com/sheinsight/shineout-next/pull/484))
- 修复 `Transfer` 自定义渲染时 `listHeight` 和 `listClassName` 失效问题 ([#484](https://github.com/sheinsight/shineout-next/pull/484))

## 3.1.18
<span class="time">2024-05-27</span>
### 🐞 BugFix
- `Input` 兼容 `value = 0` 的场景 ([#480](https://github.com/sheinsight/shineout-next/pull/480))
- 修复 `Modal.Submit` 加载中样式问题 ([#501](https://github.com/sheinsight/shineout-next/pull/501))
- 修复 `Popover.Confirm` 当 `ok` 和 `onCancel` 返回 `Promise` 没有处理 `.catch` 问题([#479](https://github.com/sheinsight/shineout-next/pull/479))
### 💅 Style
- 优化 `Cascader` 合并选项的样式 ([#482](https://github.com/sheinsight/shineout-next/pull/482))
- 优化 `Select` 合并选项的样式 ([#481](https://github.com/sheinsight/shineout-next/pull/481))
- 优化 `TreeSelect` 合并选项的样式 ([#482](https://github.com/sheinsight/shineout-next/pull/482))

## 3.1.17
<span class="time">2024-05-24</span>
### 🐞 BugFix
- 修复 `Cascader` 属性 `compressed` 无效的问题 ([#477](https://github.com/sheinsight/shineout-next/pull/477))
- 修复 `Select` 属性 `compressed` 无效的问题 ([#477](https://github.com/sheinsight/shineout-next/pull/477))
- 修复 `TreeSelect` 属性 `compressed` 无效的问题 ([#477](https://github.com/sheinsight/shineout-next/pull/477))

## 3.1.16
<span class="time">2024-05-24</span>
### 💎 Enhancement
- 支持 `Upload` 在未指定滚动容器并且内滚的场景 ([#472](https://github.com/sheinsight/shineout-next/pull/472))
### 🐞 BugFix
- 修复 `Card.Header` 的 `simple` 模式下 `align` 不生效问题 ([#468](https://github.com/sheinsight/shineout-next/pull/468))
- 修复 `Input.Group` 缺失 `status` 属性 ([#475](https://github.com/sheinsight/shineout-next/pull/475))
- 修复 `Upload` 同时上传多个文件的时候会丢失上传结果 ([#474](https://github.com/sheinsight/shineout-next/pull/474))

## 3.1.15
<span class="time">2024-05-23</span>
### 🐞 BugFix
- 修复 `Select` 在某些场景下弹出层会被遮挡的问题 ([#467](https://github.com/sheinsight/shineout-next/pull/467))
- 修复 `Sticky` 在未指定滚动容器的场景下页面 resize 的时候位置无法更新的问题 ([#467](https://github.com/sheinsight/shineout-next/pull/467))
- 修复 `Table` 异步加载数据可能导致滚动条闪烁的问题 ([#466](https://github.com/sheinsight/shineout-next/pull/466))
- 修复 `Table` 只使用样式的用法单元格下边框样式问题 ([#469](https://github.com/sheinsight/shineout-next/pull/469))

## 3.1.14
<span class="time">2024-05-21</span>
### 💎 Enhancement
- 优化 `Tree` 换行场景下的连线样式 ([#463](https://github.com/sheinsight/shineout-next/pull/463))
### 🐞 BugFix
- 修复 `Tooltip` 在某些场景下的箭头样式问题 ([#460](https://github.com/sheinsight/shineout-next/pull/460))
- 修复 `Tree` 拖动子节点的时候无法触发拖拽事件回调函数的问题 ([#464](https://github.com/sheinsight/shineout-next/pull/464))
- 修复 `Tree` 禁用节点会导致 `onClick` 无法触发的问题 ([#461](https://github.com/sheinsight/shineout-next/pull/461))

## 3.1.13
<span class="time">2024-05-20</span>
### 🐞 BugFix
- 修复 SSR 场景下的一些报错 ([#459](https://github.com/sheinsight/shineout-next/pull/459))
- 修复 `Tree` 属性 `defaultExpandAll` 没有效果的问题 ([#457](https://github.com/sheinsight/shineout-next/pull/457))

## 3.1.12
<span class="time">2024-05-16</span>
### 🐞 BugFix
- 修复 `Form` 默认值传入 proxy 对象会导致修改表单报错 ([#456](https://github.com/sheinsight/shineout-next/pull/456))

## 3.1.11
<span class="time">2024-05-16</span>
### 🐞 BugFix
- 修复 `Input.Number` 的 tip 提示样式问题 ([#450](https://github.com/sheinsight/shineout-next/pull/450))
- 修复 `Input` 的 info 的样式问题 ([#450](https://github.com/sheinsight/shineout-next/pull/450))
- 修复 `Modal` 当 `visible = false` 时会创建容器的问题 ([#452](https://github.com/sheinsight/shineout-next/pull/452))
- 修复 `Modal` 当 `destroy = true` 时关闭弹窗没有卸载容器 ([#452](https://github.com/sheinsight/shineout-next/pull/452))
- 修复 `Tooltip` 设置`type = "light"` 的时候箭头样式问题([#454](https://github.com/sheinsight/shineout-next/pull/454))
### 💅 Style
- 调整 `Input` 的垂直对齐方式 ([#450](https://github.com/sheinsight/shineout-next/pull/450))
- 调整 `Modal` 的 `modal-wrapper` 增加 `overflow: 'auto'`([#452](https://github.com/sheinsight/shineout-next/pull/452))
- 调整 `Modal` 当 `title 为空` 时 `modal-header` 的样式 ([#453](https://github.com/sheinsight/shineout-next/pull/453))

## 3.1.10
<span class="time">2024-05-15</span>
### 🐞 BugFix
- 修复`Card`在没有`extra`和`collapse`时多出一层，导致传入的`classname`无法在 header 上生效 ([#445](https://github.com/sheinsight/shineout-next/pull/445))
- 修复 `FormDatum.set` 不支持 `set(name, value)` 用法 ([#444](https://github.com/sheinsight/shineout-next/pull/444))
- 修复 `Select` 选项文字过长没有截断并且出现滚动条的问题 ([#445](https://github.com/sheinsight/shineout-next/pull/445))
- 修复 `Switch` 的自定义文案功能在小尺寸和大尺寸的样式问题 ([#447](https://github.com/sheinsight/shineout-next/pull/447))
- 修复 `Textarea` 失去焦点的时候 info 没有隐藏的问题和 info 会被遮挡的问题 ([#448](https://github.com/sheinsight/shineout-next/pull/448))

## 3.1.9
<span class="time">2024-05-14</span>
### 🆎 Type
- 修复 `Tree` 属性 `leafClass` 类型错误 ([#437](https://github.com/sheinsight/shineout-next/pull/437))
### 🐞 BugFix
- 修复 `Table` 在缩放场景下可能导致 Table 高度一直变化的问题 ([#442](https://github.com/sheinsight/shineout-next/pull/442))
- 修复 `Table` 没有设置高度并且数据为空的场景下滚动条渲染异常的问题 ([#438](https://github.com/sheinsight/shineout-next/pull/438))
- 修复 `TreeSelect` 在单选的情况下会返回数组的问题 ([#440](https://github.com/sheinsight/shineout-next/pull/440))
- 修复 `TreeSelect` 单选后节点没有高亮的问题 ([#439](https://github.com/sheinsight/shineout-next/pull/439))

## 3.1.8
<span class="time">2024-05-13</span>
### 🐞 BugFix
- 修复 `Form` 属性 `onChange` 返回的 `value` 属性变成只读的问题 ([#434](https://github.com/sheinsight/shineout-next/pull/434))

## 3.1.7
<span class="time">2024-05-11</span>
### 🐞 BugFix
- `Table` 在 React17 版本下右侧固定列在首次渲染的时候发生偏移的问题 ([#431](https://github.com/sheinsight/shineout-next/pull/431))
- 修复 `TreeSelect` 单选后节点没有高亮的问题 ([#439](https://github.com/sheinsight/shineout-next/pull/439))

## 3.1.6
<span class="time">2024-05-11</span>
### 🐞 BugFix
- `Table` 表头分组场景下可能导致列宽计算错误的问题 ([#428](https://github.com/sheinsight/shineout-next/pull/428))
- `Table` 属性 `onColumnResize` 参数返回错误的问题 ([#427](https://github.com/sheinsight/shineout-next/pull/427))
- 修复 `TreeSelect` 本地筛选的时候防抖没有生效导致频繁渲染的问题 ([#428](https://github.com/sheinsight/shineout-next/pull/428))
### 💅 Style
- `Form.Item` 在行内模式下给标签增加 `width: auto` 样式 ([#430](https://github.com/sheinsight/shineout-next/pull/430))

## 3.1.5
<span class="time">2024-05-10</span>
### 🐞 BugFix
- `Table` 在没有设置 `width` 的情况下表头可能错位的问题 ([#426](https://github.com/sheinsight/shineout-next/pull/426))

## 3.1.4
<span class="time">2024-05-10</span>
### 🐞 BugFix
- 修复 `Spin` 某些类型缺失 `margin: auto` 样式 ([#424](https://github.com/sheinsight/shineout-next/pull/424))

## 3.1.2
<span class="time">2024-05-10</span>
### 💎 Enhancement
- 调整组件默认的 Spin 类型为 `ring` ([#422](https://github.com/sheinsight/shineout-next/pull/422))
### 🐞 BugFix
- 调整 `Button` 加载状态下没有隐藏 ShineoutIcon 的问题 ([#422](https://github.com/sheinsight/shineout-next/pull/422))
### 💅 Style
- `Table` 容器增加 `min-width: 0` 样式 ([#422](https://github.com/sheinsight/shineout-next/pull/422))

## 3.1.0
<span class="time">2024-05-09</span>
### 🆕 Feature
- 所有组件支持 `rtl` 模式
- `TreeSelect` 属性 `loader` 支持返回 Promise 来关闭加载状态 ([#417](https://github.com/sheinsight/shineout-next/pull/417))
- `Tree` 属性 `loader` 支持返回 Promise 来关闭加载状态 ([#417](https://github.com/sheinsight/shineout-next/pull/417))
### 💎 Enhancement
- 优化 `Table` 固定表头的样式
### 🐞 BugFix
- 修复 `Table` 虚拟列表拖动到底部可能展示不全的问题
- 修复 `List` 在缩放场景下滚动加载可能失效的问题 ([#414](https://github.com/sheinsight/shineout-next/pull/414))
- 修复 `Rule` 自定义函数校验的用法参数 `props` 中漏传 `args` 属性 ([#413](https://github.com/sheinsight/shineout-next/pull/413))
- 修复 `Table` 属性 `onRowClick` 漏传参数 `fireAttr` ([#418](https://github.com/sheinsight/shineout-next/pull/418))
- 修复 `Table` 选择行合并的场景下会出现部分选中的列没有高亮的问题 ([#415](https://github.com/sheinsight/shineout-next/pull/415))
### 💅 Style
- 优化 `Alert` `Form.Item` `Modal` `Popover` `Tooltip` `Upload` 单词换行样式 ([#375](https://github.com/sheinsight/shineout-next/pull/375))
- `Form.Item` 增加 `min-width: 0` 样式 ([#419](https://github.com/sheinsight/shineout-next/pull/419))
- `Spin` 容器增加 `margin: auto` ([#419](https://github.com/sheinsight/shineout-next/pull/419))
### 🎨 Theme
- 移除 `regular` 和 `medium` token，替换为 `font` 系列 token 并替换组件中所有引用
- 移除 `padding` 和 `margin` token，替换为 `spacing` 系列 token 并替换组件中所有引用
- 调整 `Button` 组件 `spacing` `radius` `weight` 类型 token 引用
- 调整 `setToken` 支持更新组件 token

## 3.0.11
<span class="time">2024-05-08</span>
### 🐞 BugFix
- 修复 `Cascader` 组件在渲染未匹配数据时可能出现的数据重复和无法删除的问题 ([#412](https://github.com/sheinsight/shineout-next/pull/412))
- 修复 `Select` 组件在渲染未匹配数据时可能出现的数据重复和无法删除的问题 ([#412](https://github.com/sheinsight/shineout-next/pull/412))
- 修复 `TreeSelect` 在多选模式下，进行过滤后选择新项会导致原有选择项被覆盖的问题 ([#411](https://github.com/sheinsight/shineout-next/pull/411))
- 修复 `TreeSelect` 组件在渲染未匹配数据时可能出现的数据重复和无法删除的问题 ([#412](https://github.com/sheinsight/shineout-next/pull/412))

## 3.0.10
<span class="time">2024-05-06</span>
### 🐞 BugFix
- 修复 `Select` 选项禁用后仍然可以点击取消的问题 ([#408](https://github.com/sheinsight/shineout-next/pull/408))
- 修复 `Select` 创建选项功能，当输入框失去焦点的时候没有创建的问题 ([#408](https://github.com/sheinsight/shineout-next/pull/408))
- 修复 `Table` 在 safari 中 `columns width` 没有效果([#409](https://github.com/sheinsight/shineout-next/pull/409))
- 修复 `Textarea` 设置 `autosize` 当容器默认`dispaly: none`时高度没有了 ([#404](https://github.com/sheinsight/shineout-next/pull/404))
- 修复 `Tree` value 变化时节点渲染更新异常的问题 ([#405](https://github.com/sheinsight/shineout-next/pull/405))
### 💅 Style
- `DatePicker` 高度支持被内容撑开 ([#410](https://github.com/sheinsight/shineout-next/pull/410))

## 3.0.9
<span class="time">2024-04-26</span>
### 🐞 BugFix
- 修复 `Cascader` 合并选项功能当数据动态变化或者宽度变化时没有动态更新的问题 ([#402](https://github.com/sheinsight/shineout-next/pull/402))
- 修复 `Form` 内部表单项 `name` 变化时没有清除之前错误信息问题 ([#401](https://github.com/sheinsight/shineout-next/pull/401))
- 修复 `Form` 的 `value` 和内部表单项 `name` 同时变化时对应的 value 无法更新的问题 ([#401](https://github.com/sheinsight/shineout-next/pull/401))
- 修复 `Select` 设置 `onCreate = true` 无法输入的问题 ([#402](https://github.com/sheinsight/shineout-next/pull/402))
- 修复 `Select` 合并选项功能当数据动态变化或者宽度变化时没有动态更新的问题 ([#402](https://github.com/sheinsight/shineout-next/pull/402))
- 修复 `TreeSelect` 合并选项功能当数据动态变化或者宽度变化时没有动态更新的问题 ([#402](https://github.com/sheinsight/shineout-next/pull/402))

## 3.0.8
<span class="time">2024-04-26</span>
### 🐞 BugFix
- 修复 `DatePicker` 范围选择双击可以选中禁用日期的问题 ([#400](https://github.com/sheinsight/shineout-next/pull/400))
- 修复 `Select` noCache 属性无效的问题 ([#398](https://github.com/sheinsight/shineout-next/pull/398))
- 修复 `TreeSelect` noCache 属性无效的问题 ([#398](https://github.com/sheinsight/shineout-next/pull/398))

## 3.0.7
<span class="time">2024-04-25</span>
### 🐞 BugFix
- 修复 `Cascader` 在多选场景下点击下拉输入框无法自动聚焦的问题 ([#397](https://github.com/sheinsight/shineout-next/pull/397))

## 3.0.6
<span class="time">2024-04-15</span>
### 🐞 BugFix
- 修复 `Input.Nummber` 内嵌标题当 `value` 有值时没有打开的问题 ([#395](https://github.com/sheinsight/shineout-next/pull/395))

## 3.0.5
<span class="time">2024-04-24</span>
### 🐞 BugFix
- 修复 `Cascader` 当清空输入框文本时会展示上次筛选内容的问题 ([#391](https://github.com/sheinsight/shineout-next/pull/391))
- 修复 `DatePicker` 回退箭头方向反了的问题 ([#392](https://github.com/sheinsight/shineout-next/pull/392))
- 修复 `Drawer` 没有默认支持内滚的问题 ([#393](https://github.com/sheinsight/shineout-next/pull/393))
- 修复 `Select` 当清空输入框文本时会展示上次筛选内容的问题 ([#391](https://github.com/sheinsight/shineout-next/pull/391))
- 修复 `TreeSelect` 当清空输入框文本时会展示上次筛选内容的问题 ([#391](https://github.com/sheinsight/shineout-next/pull/391))

## 3.0.4
<span class="time">2024-04-24</span>
### 🐞 BugFix
- 修复 `Cascader` 设置 `height` 后内容溢出无法内滚 ([#386](https://github.com/sheinsight/shineout-next/pull/386))
- 修复 `Cascader` 设置 `childrenKey` 后选中结果展示错误 ([#386](https://github.com/sheinsight/shineout-next/pull/386))
- 修复 `Cascader` 设置 `mode = 4` 时禁用节点无法点击展开 ([#386](https://github.com/sheinsight/shineout-next/pull/386))

## 3.0.3
<span class="time">2024-04-22</span>
### 🐞 BugFix
- 修复 `Cascader` 在多选场景下点击下拉输入框无法自动聚焦的问题 ([#381](https://github.com/sheinsight/shineout-next/pull/381))
- 修复 `Cascader` 在失去焦点时筛选文本清空存在延迟的问题 ([#381](https://github.com/sheinsight/shineout-next/pull/381))
- 修复 `Cascader` 当 `renderItem` 返回 ReactElement 时，输入框可能会展示 `[object Object]` 的问题 ([#379](https://github.com/sheinsight/shineout-next/pull/379))
- 修复 `Select` 在多选场景下点击下拉输入框无法自动聚焦的问题 ([#379](https://github.com/sheinsight/shineout-next/pull/379))
- 修复 `Select` 在失去焦点时筛选文本清空存在延迟的问题 ([#379](https://github.com/sheinsight/shineout-next/pull/379))
- 修复 `Select` 当 `renderItem` 返回 ReactElement 时，输入框可能会展示 `[object Object]` 的问题 ([#379](https://github.com/sheinsight/shineout-next/pull/379))
- 修复 `Table` 当页面缩放的时候固定列可能出现偏移的问题 ([#384](https://github.com/sheinsight/shineout-next/pull/384))
- 修复 `TreeSelect` 在多选场景下点击下拉输入框无法自动聚焦的问题 ([#380](https://github.com/sheinsight/shineout-next/pull/380))
- 修复 `TreeSelect` 在失去焦点时筛选文本清空存在延迟的问题 ([#380](https://github.com/sheinsight/shineout-next/pull/380))
- 修复 `TreeSelect` 当 `renderItem` 返回 ReactElement 时，输入框可能会展示 `[object Object]` 的问题 ([#379](https://github.com/sheinsight/shineout-next/pull/379))

## 3.0.2
<span class="time">2024-04-18</span>
### 💎 Enhancement
- 优化 `Table` 当没有传入 `summary` 时，不渲染总结栏区域([#377](https://github.com/sheinsight/shineout-next/pull/377))
### 🐞 BugFix
- 修复 `Table` 开启虚拟列表后 `height` 默认值与 2.x 版本不一致的问题 ([#370](https://github.com/sheinsight/shineout-next/pull/370))
- 优化 `Tabs` 初始隐藏后面再展示会无法出现滚动条的问题 ([#374](https://github.com/sheinsight/shineout-next/pull/374))
- 修复 `Tabs` 动态加载数据，当 `children = []` 时仍然会触发 `loader` 的问题 ([#366](https://github.com/sheinsight/shineout-next/pull/366))
### 💅 Style
- 调整 `Button` 的 `shape='square'` 和 `shape='circle'` 两种风格下的样式，去除内边距 ([#367](https://github.com/sheinsight/shineout-next/pull/367))
- 优化 `Table` 拖拽列样式 ([#377](https://github.com/sheinsight/shineout-next/pull/377))

## 3.0.1
<span class="time">2024-04-16</span>
### 🐞 BugFix
- 修复 `Input.Nummber` 的 `min = 0` 不生效的问题 ([#364](https://github.com/sheinsight/shineout-next/pull/364))
- 修复 `Input.Nummber` 缺失 `hideArrow` 属性的问题 ([#362](https://github.com/sheinsight/shineout-next/pull/362))
- 修复 `Tabs` 内容超出后被隐藏的问题 ([#363](https://github.com/sheinsight/shineout-next/pull/363))

## 3.0.0
<span class="time">2024-04-16</span>

### 主要更新
- 使用全新的设计语言，更注重细节交互，更加符合现代审美
- 新增了 Description、Step、Collapse、Empty 四个组件
- 支持 React 18
- 支持 SSR 场景
- 使用 css-in-jss 对于微前端更友好
- 使用 React Hook 重写了绝大多数的组件，同时对冗余、低效的代码逻辑进行优化提升组件性能和稳定性
- 对 VirtualList 和 Sticky 进行了完全重构，性能更好，体验几乎和原生一致
- 移除了 2.x 版本中不合理的属性设计，精简使用逻辑，新增部分组件用法，覆盖更多的业务使用场景


### 设计变化
- 统一了色系 、字体、间距、阴影、圆角等设计规范。
- 优化了一些交互细节，提升了用户体验，比如 DatePicker 的选择，Table 的合并行选择等
- 增加了设计指南提供了更多的使用示例和最佳实践
- 文字行高更改为字号 + 8px

### 不兼容改动
- 表单组件
  - beforeChange 的参数 datum 被移除，可以使用 formRef 替代
- 样式
  - 重构后结构 dom 有所变化，className和原来不同，会影响到一些自定义样式
- Button
  - 布局改为 inline-flex 内部的多个空格会被合并为一个
- Datepicker
  - 周选择器默认格式化结果不再为 `RRRR II`，调整为 `gggg-ww`，如有需要配合 `format` 属性还原


### 废弃的特性
废弃属性目前还可以使用，未来会移除
- Alert
  - 废弃 `hideClose` 属性，使用 `closable` 代替
- Button
  - 废弃 `outline` 属性，使用 `mode="outline"` 代替
  - 废弃 `text` 属性，使用 `mode="text"` 代替
- Checkbox
  - 废弃 `inputable` 属性，使用 Checkbox + Input 代替
- Dropdown
  - 废弃 `outline` 属性，使用 `mode="outline"` 代替
- DatePicker
  - 废弃 `defaultRangeMonth` 属性，使用 `defaultPickerValue` 代替
- List
  - 废弃 List.BaseItem 组件
- Modal
  - 废弃 `maskOpacity` 属性，使用 `maskBackground` 代替
- Tabs
  - 废弃 `border` 属性，使用 `splitColor` 代替
  - 废弃 `tabBarExtraContent` 属性，使用 `extra` 代替
  - 废弃 `align` 属性，使用 `position` 代替
  - 废弃 `background` 属性，使用 `activeBackGround` 代替
- Progress
  - 废弃 `popup` 属性，使用 `shape = 'line-pop'` 代替
- Sticky
  - 废弃 `target` 属性，使用 `scrollContainer` 代替
- Table
  - 废弃 `fixed` 属性，使用 `virtual` 代替
- Tag
  - 废弃 `type` 属性，使用 `color` 代替
- Popover
  - 废弃 `Popover.Content` 组件，使用boolean属性 `useTextStyle` 代替


### 功能改进

- Table
  - 支持非虚拟列表的 Table 单独开启固定列
  - 重构了虚拟列表
    - 列表滚动更丝滑（原生滚动条的体验）
    - 解决了内部元素无法滚动问题
    - 解决了滚动到边界无法触发外部滚动问题
    - 解决了在 mac 系统浏览器中使用触控板左右滚动可能导致页面跳转的问题
  - 优化合并行的高亮效果
- Sticky
  - 新增 `parent` 指定 sticky 的父元素，当父元素离开视口时，sticky 元素也会消失
  - 重构了 sticky 的实现，支持更多的场景，性能更好
- Button
  - 新增 `renderLoading` 属性，支持自定义 loading 的渲染
- Card
  - Card 新增 `split` 属性，用于展示和隐藏分割线
  - Card.Header 新增 `extra` 属性，支持在头部右侧添加额外内容
- Carousel
  - `indicatorPosition` 属性新增 "outer" 选项，支持指示器在轮播图外部显示
  - `indicatorType` 属性新增 "number" 选项，支持指示器显示数字
- Image
  - Image.Group 新增 `showCount` 属性，支持显示图片数量
- List
  - 增加 `striped` 属性，支持斑马纹
- Tooltop
  - 重构代码, 逻辑与 popover 保持一致
  - 支持自定义弹出位置
- Tag
  - 新增 `color` 属性，内置多套颜色
  - 新增 `size` 属性，支持设置标签大小
  - 新增 `mode` 属性，支持亮色、填充、线框、亮色线框四种模式
  - 新增 `shape` 属性，支持圆角标签
- Tabs
  - 支持 Tbas 头部可以滑动
- Tooltip
  - 新增 `trigger = "focus"` 属性，支持聚焦触发
  - 新增 `type` 属性，支持多种主题色
  - 新增 `zIndex`属性，支持设置层级
- Tree
  - 新增 `inlineNode` 属性，支持节点是否内联
  - 新增 `highlight` 属性，点击节点高亮
- Cascader
  - 新增 `compressedClassName` 属性，设置多选合并展示弹出框的类名
  - 新增 `focusSelected` 属性，onFilter 在多选情况下点击选项后是否选中过滤文本
  - 新增 `hideTag` 属性, 隐藏标签样式，默认情况下展示结果以标签模式分割，隐藏标签样式后可通过自定义 renderResult 渲染分割结果
  - 新增 `resultClassName` 属性, 选中内容容器的className
- Checkbox
  - 新增 `size` 属性，支持多个尺寸
  - 新增 `defaultChecked` 属性，用于设置默认选中状态
- DatePicker
  - 优化快速选择每次点击都可以获取最新的时间
  - 新增 `showTime` 属性，支持选择时间
  - 新增 `showSelNow` 属性，支持快捷选择当前时间
  - 新增交互鼠标悬浮选项显示日期时间结果
  - 选择周模式下第一列显示周数
  - 选择时间面板重新设计，选取时间更加便捷
  - disabled 支持传数组，支持分别设置开始和结束时间的禁用
  - 优化范围选择面板的高亮和禁用样式。
  - 修复了之前版本 value 不变仍然可以修改的问题
- Form
  - FormRef 新增 set 方法用于设置表单字段值
- Input
  - 新增 `clearIcon` 属性，支持清空按钮
  - 新增 `prefix` 和 `suffix` 属性，支持前缀和后缀
- Radio
  - 新增 `size` 属性，支持多个尺寸
- Rate
  - 增加鼠标悬浮的交互动画
- Select
  - 新增 `footer` 属性，支持底部插槽
- Slider
  - 完全重构了代码逻辑，优化交互
  - 支持双滑快可以交叉滑动
  - 修复背景色重叠的问题
  - 新增 `tipType = 'hover'` 属性，鼠标悬浮时显示当前值
- Textarea
  - 新增 `textareaRef` 属性，支持获取 textarea dom
- Transfer
  - 新增 `searchPlaceholder` 属性，设置搜索框占位
  - 新增 `simple` 属性，支持简单模式
  - 新增 `size` 属性，支持多个尺寸
- TreeSelect
  - 新增 `compressedClassName` 属性，设置搜索框占位
  - 新增 `trim` 属性，支持失去焦点时会自动删除空白字符
  - 新增 `resultClassName` 属性，选中结果内容容器的className
  - 新增 `emptyText` 属性，自定义 empty 文案
  - 新增 `showArrow` 属性，是否展示箭头
  - 新增 `focusSelected` 属性，onFilter 在多选情况下点击选项后是否选中过滤文本
- Upload
  - Upload 新增 `listType` 属性，用于切换列表类型
- Alert
  - 新增 `bordered` 属性，是否显示边框
  - 新增 `closable` 属性，配置是否可以关闭
  - 新增 `title` 属性，配置标题
- Drawer
  - 新增 `resize` 属性，支持拖拽改变抽屉大小
- Message
  - 优化交互，当鼠标悬浮在消息上时，消息不会自动关闭
- Progress
  - 新增 `icon` 属性，支持展示图标
  - 新增 `iconSize` 属性，支持设置图标大小
- Breadcrumb
  - 新增 `max` 属性，设置最大显示个数，超过最大显示个数时，会显示省略号
  - 新增 `maxHeight` 属性，设置下拉菜单最大高度
  - 优化下拉菜单交互
- Dropdown
  - 新增 `mode` 属性，设置按钮样式
  - 新增 `hideArrow` 属性，隐藏下拉箭头
  - 新增分组菜单
  - 新增带分割线下拉菜单
- Pagination
  - 新增 `mode` 属性，设置按钮样式
