### 主要更新
- 使用全新的设计语言，更注重细节交互，更加符合现代审美
- 新增了 Description、Step、Collpase、Empty 四个组件
- 支持 React18
- 支持 SSR 场景
- 使用 css-in-jss 对于微前端更友好
- 使用 React Hook 重写了绝大多数的组件，同时对冗余、低效的代码逻辑进行优化提升组件性能和稳定性
- 对 VirtualList 和 Sticky 进行了完全重构，性能更好，体验几乎和原生一致
- 移除了 2.x 版本中不合理的属性设计，精简使用逻辑，新增部分组件用法，覆盖更多的业务使用场景


### 设计变化
- 统一了色系 、字体、间距、阴影、圆角等设计规范。
- 优化了一些交互细节，提升了用户体验 比如 DatePicker 的选择，Table 的合并行选择等
- 增加了设计指南提供了更多的使用示例和最佳实践
- 文字行高更改为字号 + 8px

### 不兼容改动

### 废弃的特性
- Tabs
  - 移除 `border` 属性，使用 `splitColor` 代替
  - 移除 `tabBarExtraContent` 属性，使用 `extra` 代替
  - 移除 `align` 属性，使用 `position` 代替
  - 移除 `background` 属性，使用 `activeBackGround` 代替


### 功能改进

- Table
  - 支持非虚拟列表的 Table 单独开启固定列
  - 重构了虚拟列表 
    - 列表滚动更丝滑（原生滚动条的体验）
    - 解决了内部元素无法滚动问题
    - 解决滚动到边界无法触发外部滚动问题
    - 解决在 mac 下滚动可能导致浏览器跳转页面的问题
  - 优化合并行的高效果
- Sticky
  - 新增 `parent` 指定 sticky 的父元素当，父元素离开视口时，sticky 元素也会消失
  - 重构了 sticky 的实现，支持更多的场景，性能更好。
- Button
  - 新增 `renderLoading` 属性，支持自定义 loading 的渲染
- Card
  - Card 新增 `Split` 属性，支持展示和隐藏分割线
  - Card.Header 新增 `Extra` 属性，支持在头部右侧添加额外内容
- Carousel
  - `indicatorPosition` 属性新增 "outer" 选项，支持指示器在轮播图外部显示
  - `indicatorType` 属性新增 "number" 选项，支持指示器显示数字
- Image
  - Image.Group 新增 `showCount` 属性，支持显示图片数量
- List
  - 增加 `striped` 属性，支持斑马纹
- Tag
  - 新增多个内置颜色 `color` 属性
  - 新增 `size` 属性，支持设置标签大小
  - 新增 `mode` 属性，支持亮色、填充、线框、亮色线框四种模式
  - 新增 `shape` 属性，支持圆角标签
- Tooltip
  - 新增 `trigger = "focus"` 属性，支持聚焦触发
  - 新增 `type` 属性，支持多种主题色
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
  
