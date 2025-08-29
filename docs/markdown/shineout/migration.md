`````
开发指南

# 迁移指南

指导 shineout 从 1.x 或 2.x 升级到 3.x 版本
`````


## 升级准备
升级到 3.x 最新版本，按照控制台 warning 信息移除/修改相关的组件 API 代码。

## 3.x 概览
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
  - 周选择器默认格式化结果不再为 RRRR II，调整为 gggg-ww，如有需要配合 format 属性还原

### 废弃的特性
废弃属性目前暂时还可以使用，未来会移除。
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
    - 废弃 `popup` 属性，使用 shape = 'line-pop' 代替
  - Sticky
    - 废弃 `target` 属性，使用 `scrollContainer` 代替
  - Table
    - 废弃 `fixed` 属性，使用 `virtual` 代替
  - Tag
    - 废弃 `type` 属性，使用 `color` 代替
  - Popover
    - 废弃 `Popover.Content` 组件，使用 boolean 属性 `useTextStyle` 代替

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
  - 新增 `split` 属性，用于展示和隐藏分割线
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
  - 支持 Tabs 头部可以滑动
- Tooltip
  - 新增 `trigger = "focus"` 属性，支持聚焦触发
  - 新增 `type` 属性，支持多种主题色
  - 新增 `zIndex` 属性，支持设置层级
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
  - 新增 `needConfirm` 属性，支持确定按钮提交结果
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
  - 新增 `listType` 属性，用于切换列表类型
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


## 兼容性调整
不再支持 IE 浏览器。


## 样式变更
- 如果没有覆盖 shineout 的样式，则不需要调整。
- 如果覆盖了 shineout 的样式，则需要调整样式选择器，将 className 前缀从 `so-` 调整为 `soui-`；部分组件内部样式结构有所调整，需要同步调整。
