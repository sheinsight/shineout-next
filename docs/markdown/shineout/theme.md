`````
开发指南

# 主题配置

自定义组件的主题风格
`````

## 设计介绍

Shineout 3.0 引入了 Design Token 的概念，将组件的颜色、字体、边框、圆角、间距、阴影、尺寸原子化为一个最小颗粒度的 css var 变量，并称之为 token。在此基础上形成了两个维度： **全局 token** 和 **组件 token**。每一个 token 都有一个唯一的 **token key** 和它的映射值 **token value**。

### 全局 token
用于定义不同样式的最小单位，其中包括：颜色、字体、边框、圆角、间距、阴影、尺寸。如：

| token key   | token value | 最终生成的 css var |   说明   |
|-------------|-------------|---------|---------|
| Brand-6 | #197AFA | --soui-brand-6: #197AFA |主色|
| Font-14 | 14px | --soui-font-14: 14px |14px 字号（默认字号）|
| Spacing-4 | 4px | --soui-spacing-4: 4px |4px 间距，一般用作定义 margin 或 padding|
| Border-1 | 1px | --soui-border-1: 1px |1px 边框粗细（默认边框粗细）|
| Radius-default | 4px | --soui-radius-default: 4px |4px 圆角大小（默认圆角值）|
| ... | ... | ... |...|


### 组件 token
用于定义每个组件中具体结构具体样式的最小单位，如：

| token key   | token value | 最终生成的 css var |   说明   |
|-------------|-------------|---------|---------|
| buttonFontSize | Font-14 | var(--soui-button-font-size,var(--soui-font-14,14px))| 默认尺寸按钮的字号 |
| buttonPaddingY | Spacing-4 | var(--soui-button-padding-y,var(--soui-spacing-4,4px)) | 默认尺寸按钮的垂直内边距 |
| buttonBorderRadius | Radius-default | var(--soui-button-border-radius,var(--soui-radius-default,4px)) | 默认尺寸按钮的圆角值 |
| buttonPrimaryBackgroundColor | Brand-6 | var(--soui-button-primary-background-color,var(--soui-brand-6,#197AFA))| primary 按钮的背景色 |
| ... | ... | ...| ... |

### 引用关系 & 作用域

- **全局 token** 的作用域是 **当前范围**<sup>*</sup> 下的所有组件

- **组件 token** 的作用域是 **当前范围**<sup>*</sup> 下的具体某个组件

- **组件 token** 引用 **全局 token**，并以 **全局 token** 的默认值作为自己的默认值

- **全局 token** 和 **组件 token** 可以使用 `setToken（见下）` 进行重新定义

<i> 当前范围 </i> 是指 `setToken` 中 `selector` 所指定的范围

## 基本用法

组件提供了 `setToken` 方法，用于设置 Shineout 的主题 token 信息

默认不传递任何配置参数执行，会将所有的全局 token （如: --soui-success-6）注入一个带有缓存标识的 style 标签上，并挂载至默认挂载点 document.head 上

```js
import { setToken } from 'shineout'

setToken({
  // 配置项
  // ...
})
```

## 配置项

### 自定义挂载点

用于自定义设置承载 token 标签的挂载点，默认插入至 document.head

属性： `target`

类型： `string | HTMLElement`

默认值： `document.head`

```js
setToken({
  target: document.head
})
```


### 设置主题名称

用于自定义设置承载 token 标签的名称标识，将作为自定义属性插入标签，一般用作对当前设置的主题命名，便于查看识别

属性： `tokenName`

类型： `string`

默认值： `'shineout-token'`

```js
// 为当前设置的主题命名为 system-dark
setToken({
  tokenName: 'system-dark',
  selector: '#app',
  token: {
    'Brand-6': '#9419fa'
  }
})

// html
<div id='app'>
  App
</div>

// style
<style data-token='system-dark' data-token-selector="#app">
  #app {
    --soui-brand-6: #9419fa;
  }
</style>

```


### 自定义生效作用域

用于自定义当前设置的 token 所生效的范围，默认为 body，语法为 css 选择器

属性： `selector`

类型： `string`

默认值： `'body'`

```js
// 不设置 selector 时，默认将 body 下的全局 token Brand-6 设置为 #9419fa（紫色），所有引用该全局 token 的地方都会发生变更
setToken({
  // selector: 'body'
  token: {
    'Brand-6': '#9419fa',
  }
})
```

```js
// 设置 selector 但不设置 token 参数时，默认注入全量的全局 token

// 为 #app1 和 #app2 注入全量的全局 token
setToken({
  selector: '#app1,#app2'
})

// html
<div id='app1'>
  App 1
</div>

<div id='app2'>
  App 2
</div>

// style
<style data-token-selector="#app1,#app2">
  #app1,#app2 {
    --soui-brand-1: #E9F5FE;
    --soui-brand-2: #BDE2FF;
    --soui-brand-3: #94CDFF;
    --soui-brand-4: #6BB5FF;
    --soui-brand-5: #429AFF;
    --soui-brand-6: #197AFA;
    ...
    ...
  }
</style>

```

```jsx
// 将 .custom-header 类下的 主要按钮背景色 更改为 #9419fa（紫色）
setToken({
  selector: '.custom-header'
  token: {
    buttonPrimaryBackgroundColor: '#9419fa',
  }
})

// html
<div className='custom-header'>
  <Button type='primary'>Primary 按钮</Button>
</div>

// style
<style data-token-selector=".custom-header">
  .custom-header {
    --soui-button-primary-background-color: #9419fa;
  }
</style>

```


### token 参数

用于设置组件中 **全局 token** 或 **组件 token** 的值

需要传入一个 json 类型的数据，其中键 为 **全局 token** 或 **组件 token** 的 token key ,值为 `string` 类型的 token value

token key 可以通过审查组件来获取，如：--soui-button-primary-background-color 对应的 token key 为 buttonPrimaryBackgroundColor，也可在在 setToken 的 token 配置项中通过 ts 类型提示辅助查询某个组件的 token key

如果不设置 `token` 参数将会注入全量 token 信息至 selector 作用域

属性： `token`

类型： `Partial<Tokens> & { [customTokenKey: string]: string }`

默认值： `-`

```js
// 将全局的主色修改为 #9419fa（紫色），警告按钮的背景色设置为 #dc5c0（深橘黄色）
setToken({
  token: {
    'Brand-6': '#9419fa',
    'buttonWarningBackgroundColor': '#dc5c00',
  }
})
```


### 更新方式

用于设置此次 setToken 的更新模式

当 `update` 为 true 时会根据 `selector` 去检查是否存在已有内容，并将 `token` 内容以更新的方式去替换老值

当 `update` 为 false 或不设置时会直接以 `token` 的内容覆盖原有内容

属性： `update`

类型： `boolean`

默认值： `-`

```js
// 将 body 上的的主色更新为 #9419fa（紫色），警告按钮的背景色更新为 #dc5c0（深橘黄色）
setToken({
  selector: 'body',
  update: true,
  token: {
    'Brand-6': '#9419fa',
    'buttonWarningBackgroundColor': '#dc5c00',
  }
})


// 将 token 设置到 body 上，并覆盖原有的 token
setToken({
  selector: 'body',
  token: {
    'Brand-6': '#9419fa',
    'buttonWarningBackgroundColor': '#dc5c00',
  }
})
```