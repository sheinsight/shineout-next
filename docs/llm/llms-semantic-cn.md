# Shineout 语义化 DOM API

Shineout 通过 `classNames` 和 `styles` props 支持语义化 DOM 定制。
每个组件暴露命名的 DOM 插槽（semantic key），可单独定制样式。

## 用法

```tsx
import { Button } from 'shineout'

// 按实例定制
<Button
  classNames={{ root: 'my-btn', loading: 'my-spinner' }}
  styles={{ root: { borderRadius: 8 } }}
/>
```

## 全局配置

```tsx
import { setConfig } from 'shineout'

setConfig({
  button: { classNames: { root: 'global-btn' } },
  modal: { styles: { mask: { background: 'rgba(0,0,0,0.8)' } } },
})
```

---

## 组件列表

### Button

| Key | 说明 |
|-----|------|
| root | 按钮元素（button 或 a 标签） |
| loading | 加载指示器容器 |

### Link

| Key | 说明 |
|-----|------|
| root | 链接元素（a 标签） |
| icon | 图标容器 |

### Divider

| Key | 说明 |
|-----|------|
| root | 分割线容器 |
| content | 文字内容区域 |

### Gap

| Key | 说明 |
|-----|------|
| root | 外层 flex 容器 |
| item | 子元素包裹层 |

### Grid

| Key | 说明 |
|-----|------|
| root | 栅格容器 |

### Breadcrumb

| Key | 说明 |
|-----|------|
| root | Breadcrumb 最外层容器 |
| item | 每个面包屑项的容器 |
| separator | 分隔符节点 |
| content | 文本/链接内容节点 |
| dropdown | 下拉面板（data 项为数组时展开的弹出层） |
| dropdownItem | 下拉面板内每一项 |

### Dropdown

| Key | 说明 |
|-----|------|
| root | Dropdown 最外层容器 |
| button | 触发按钮 |
| caret | 箭头图标 |
| list | 下拉菜单面板 |
| item | 菜单项 |
| group | 分组标题 |

### Menu

| Key | 说明 |
|-----|------|
| root | Menu 最外层容器 |
| header | 菜单头部区域（仅 inline 模式） |
| list | 菜单列表容器（ul 元素） |
| item | 菜单项（li 元素） |
| itemContent | 菜单项内容区 |
| title | 菜单项标题/链接 |
| icon | 菜单项图标 |
| expand | 展开/折叠箭头 |

### Pagination

| Key | 说明 |
|-----|------|
| root | Pagination 最外层容器 |
| item | 页码按钮（含  |
| prev | 上一页按钮 |
| next | 下一页按钮 |
| jumper | 跳转输入区域 |
| sizeList | 每页条数选择区域 |

### Steps

| Key | 说明 |
|-----|------|
| root | Steps 最外层容器 |
| step | 单个步骤的外层容器 |
| tail | 步骤之间的连接线（default / dot 类型） |
| icon | 图标/数字区域（default / dot 类型） |
| title | 标题文字 |
| description | 描述文字 |
| content | 内容容器（包裹 title + description） |

### Avatar

| Key | 说明 |
|-----|------|
| group | Avatar.Group 容器元素 |
| root | Avatar 最外层容器（可从 Avatar.Group 向子 Avatar 传递） |

### Badge

| Key | 说明 |
|-----|------|
| root | Badge 最外层容器 |
| badge | 右上角徽标元素（数字/圆点） |

### Card

| Key | 说明 |
|-----|------|
| root | Card 最外层容器 |
| header | 头部区域容器 |
| headerContent | 头部标题内容区 |
| headerExtra | 头部额外内容区 |
| body | 主内容区 |
| footer | 底部区域 |

### Carousel

| Key | 说明 |
|-----|------|
| root | Carousel 最外层容器 |
| slider | 滑动区域容器 |
| item | 每个轮播项 |
| indicator | 指示器容器 |
| indicatorItem | 每个指示器元素（支持函数式 classNames 接收 { active } 状态） |
| arrow | 箭头按钮 |

### Collapse

| Key | 说明 |
|-----|------|
| root | Collapse 最外层容器 |
| header | 面板头部区域 |
| title | 标题内容 |
| extra | 额外内容区 |
| content | 面板展开内容区 |
| icon | 展开/折叠图标 |

### Descriptions

| Key | 说明 |
|-----|------|
| root | Descriptions 最外层容器 |
| header | 标题区域容器 |
| title | 标题 |
| extra | 额外内容 |
| table | 表格元素 |
| label | 描述项标签 |
| value | 描述项值 |

### Empty

| Key | 说明 |
|-----|------|
| root | Empty 最外层容器 |
| icon | 图标/图片容器 |
| description | 描述文字 |

### Image

| Key | 说明 |
|-----|------|
| root | Image 最外层容器 |
| img | 图片内容（img 元素或 backgroundImage 容器） |
| placeholder | 加载中占位区域 |
| error | 加载失败区域 |

### List

| Key | 说明 |
|-----|------|
| root | List 最外层容器 |
| item | 每个列表项 |
| footer | 底部内容区域 |

### Popover

| Key | 说明 |
|-----|------|
| root | 最外层弹层容器（与 className 等价） |
| arrow | 指向触发元素的小箭头 |
| content | 弹层内容承载区 |

### Skeleton

| Key | 说明 |
|-----|------|
| root | Skeleton 最外层容器 |
| image | 图片/头像占位区 |
| text | 文本行区域 |
| button | 按钮占位区 |

### Spin

| Key | 说明 |
|-----|------|
| root | 最外层容器 |
| section | 加载遮罩层（容器模式下覆盖子元素的区域） |
| indicator | 动画指示器 |
| description | 提示文案 |

### Table

| Key | 说明 |
|-----|------|
| root | Table 最外层容器 |
| header | 表头容器（仅 sticky/virtual 模式下生效） |
| headerRow | 表头行 tr |
| headerCell | 表头单元格 th |
| bodyRow | 表体行 tr |
| bodyCell | 表体单元格 td |
| footer | 表脚容器（仅 sticky/virtual 模式下生效） |
| footerCell | 表脚单元格 td |
| pagination | 分页组件容器 |

### Tabs

| Key | 说明 |
|-----|------|
| root | Tabs 最外层容器 |
| header | 标签栏区域 |
| tab | 每个标签项 |
| panel | 内容面板区域 |
| extra | 额外内容区 |
| ink | 指示条（line/dash 形态） |
| prev | 前滚动按钮 |
| next | 后滚动按钮 |
| collapsible | 折叠按钮 |

### Tag

| Key | 说明 |
|-----|------|
| root | Tag 最外层容器 |
| wrapper | 内容包装区域 |
| closeIcon | 关闭按钮 |

### Tooltip

| Key | 说明 |
|-----|------|
| root | 最外层弹层容器（与 className 等价） |
| arrow | 指向触发元素的小箭头 |
| content | 弹层内容承载区 |

### Tree

| Key | 说明 |
|-----|------|
| root | Tree 最外层容器 |
| node | 每个树节点容器 |
| content | 节点内容区域（含 checkbox 和文本） |
| icon | 展开/折叠图标 |

### Cascader

| Key | 说明 |
|-----|------|
| root | Cascader 最外层容器 |
| header | 结果区域（显示已选值 / placeholder） |
| popup | 下拉面板 |
| list | 每列列表容器 |
| option | 列表项 |

### Checkbox

| Key | 说明 |
|-----|------|
| root | Checkbox 最外层容器 |
| indicator | 勾选框指示器区域（含方块图标） |
| label | 文字标签区域 |
| group | Checkbox.Group 容器 |

### DatePicker

| Key | 说明 |
|-----|------|
| root | DatePicker 最外层容器 |
| header | 结果区域（显示已选值 / placeholder） |
| popup | 下拉面板 |
| popupHeader | 面板头部导航区域（年月切换箭头） |
| cell | 日期/时间单元格 |
| popupFooter | 面板底部区域（确认按钮等） |

### Form

| Key | 说明 |
|-----|------|
| root | Form 最外层容器（<form> 元素） |
| item | Form.Item 最外层容器 |
| label | 标签区域 |
| control | 控件区域（包含表单元素、错误和提示） |
| error | 错误提示区域 |
| tip | 提示信息区域 |

### Input

| Key | 说明 |
|-----|------|
| root | Input 最外层容器 |
| input | 内部 <input> 元素 |

### Radio

| Key | 说明 |
|-----|------|
| root | Radio 最外层容器 |
| indicator | 单选框指示器区域（含圆形图标） |
| label | 文字标签区域 |
| group | Radio.Group 容器 |

### Rate

| Key | 说明 |
|-----|------|
| root | Rate 最外层容器 |
| star | 每个评分项（星形图标） |
| text | 附加文字区域 |

### Select

| Key | 说明 |
|-----|------|
| root | Select 最外层容器 |
| header | 结果区域（显示已选值 / placeholder） |
| popup | 下拉面板 |
| list | 选项列表容器 |
| option | 选项节点 |
| optionInner | 选项内容区域 |

### Slider

| Key | 说明 |
|-----|------|
| root | Slider 最外层容器 |
| track | 滑轨区域 |
| indicator | 滑块指示器（拖动手柄） |
| scale | 刻度区域 |

### Switch

| Key | 说明 |
|-----|------|
| root | Switch 最外层容器（button 元素） |
| indicator | 滑块指示器（圆形按钮） |
| content | 文字内容区域 |

### Textarea

| Key | 说明 |
|-----|------|
| root | Textarea 最外层容器 |
| textarea | 内部 textarea 元素 |

### Transfer

| Key | 说明 |
|-----|------|
| root | Transfer 最外层容器 |
| header | 面板头部区域（含全选 + 标题） |
| list | 列表容器 |
| item | 单个列表项 |
| operations | 中间操作按钮区 |

### TreeSelect

| Key | 说明 |
|-----|------|
| root | TreeSelect 最外层容器 |
| header | 结果区域（显示已选值 / placeholder） |
| popup | 下拉面板 |
| list | 树列表容器 |
| option | 树节点选项 |

### Upload

| Key | 说明 |
|-----|------|
| root | Upload 最外层容器 |
| handler | 上传触发器区域（按钮 / 图片添加框） |
| item | 已上传文件结果项 |

### Alert

| Key | 说明 |
|-----|------|
| root | 最外层容器（与 className 等价） |
| icon | 图标区域 |
| title | 标题 |
| content | 内容文本区 |
| close | 关闭按钮 |

### Drawer

| Key | 说明 |
|-----|------|
| root | 最外层容器（wrapper，控制动画和显示） |
| mask | 遮罩层 |
| container | 内容面板 |
| header | 标题栏 |
| body | 内容区 |
| footer | 底部操作区 |
| close | 关闭按钮 |

### Message

| Key | 说明 |
|-----|------|
| root | 最外层容器（按位置定位的消息管理器） |
| item | 单条消息容器（动画控制层） |
| message | 消息内容区（Alert 包装层） |

### Modal

| Key | 说明 |
|-----|------|
| root | 最外层容器（wrapper，控制动画和显示） |
| mask | 遮罩层 |
| container | 内容面板 |
| header | 标题栏（包含标题文字和关闭按钮） |
| body | 内容区 |
| footer | 底部操作区 |
| close | 关闭按钮 |

### Progress

| Key | 说明 |
|-----|------|
| root | 最外层容器 |
| track | 背景轨道（line 模式为背景条；circle 模式为背景圆环） |
| indicator | 进度前景条（line 模式为前景填充条；circle 模式为前景圆弧） |
| content | 文字/自定义内容区域（children 渲染处） |
| icon | 状态图标区域 |
