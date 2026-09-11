`````
开发指南

# 全局配置

组件内部的一些公共配置，可以通过全局配置进行修改
`````

## 基本用法

组件暴露了 `setConfig` 方法，可以设置全局配置

```js
import { setConfig } from 'shineout'
setConfig({
  // 全局配置
})
```

### RTL模式

用于配置组件是否启用 RTL 模式，RTL 模式下，组件会从右到左排列  

类型： `direction: 'rtl' | 'ltr'`   

默认值： `ltr`

```js
// 开启 RTL 模式
setConfig({
  direction: "rtl",
})
```

### 输入防抖延迟

用于配置输入组件的 onChange 防抖的延迟时间，单位为毫秒  

类型： `delay: number`   

默认值： `400`

```js
// 设置延迟时间为 0ms
setConfig({
  delay: 0,
})
```

### 去除输入内容两端空格

用于配置输入组件是否去除输入内容两端空格   

类型： `trim: boolean`  

默认值： `false`

```js
// 去除输入内容两端空格
setConfig({
  trim: true
})

```

### Spin 默认类型

用于配置组件默认的 Spin 类型  

类型： `spin: string | {
  name: string;
  color?: string;
  tip?: React.ReactNode;
  mode?: 'vertical' | 'horizontal';
  size?: number;
}`  

默认值： `ring`


```js
// 设置默认的 Spin 类型为 circle
setConfig({
  spin: 'circle'
})
```

```js
// 设置全局 Spin 的默认类型、颜色、提示内容、动画尺寸以及布局模式
setConfig({
  spin: {
    name: 'wave',
    color: '#000000',
    tip: 'loading...',
    size: 14,
    mode: 'horizontal'
  }
})
```

### 弹出层容器

配置 Modal Popover 等组件的弹出层容器   

类型： `popupContainer: ()=> HTMLElement | null | (() => HTMLElement | null)` 
  
默认值： `document.body`

```js
// 设置弹出层容器为 #app
setConfig({
  popupContainer: () => document.querySelector('#app')
})
```

### 国际化

用于配置组件的国际化语言

类型： `locale: 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR' | 'ar-SA' | 'pt-BR' | 'nl-NL' | 'de-DE' | 'zh-TW'`

默认值： `en-US`

```js
// 设置为中文
setConfig({
  locale: 'zh-CN',
})
```

### ESC 关闭弹出层

用于配置弹出层组件（Popover.Confirm、Dropdown、DatePicker、Select、Cascader、TreeSelect 等）是否支持 ESC 键关闭。仅在 trigger 为 'click' 时生效

类型： `popupEsc: boolean`

默认值： `true`

```js
// 禁用 ESC 关闭弹出层
setConfig({
  popupEsc: false,
})
```

### Empty 默认图标和描述

配置 Empty 组件的全局默认图标和描述

类型： `empty: {
  icon: () => React.ReactNode;
  description: React.ReactNode | boolean;
}`

```js
// 设置 Empty 组件的全局默认图标
setConfig({
  empty: {
    icon: () => <CustomIcon />,
    description: 'Custom description',
  }
})
```

### Tooltip 持久化

配置 Tooltip 是否在鼠标移到提示内容上时保持显示

类型： `tooltip: { persistent: boolean }`

```js
// 鼠标可以移入 Tooltip 内容区域
setConfig({
  tooltip: {
    persistent: true,
  }
})
```

### Popover 动画

配置 Popover 组件是否开启动画

类型： `popover: { animation: boolean }`

```js
// 关闭 Popover 动画
setConfig({
  popover: {
    animation: false,
  }
})
```

### Modal 遮罩

配置 Modal 组件的全局默认遮罩设置

类型： `modal: { mask: boolean | { blur: boolean } }`

```js
// 隐藏 Modal 遮罩
setConfig({
  modal: {
    mask: false,
  }
})

// 开启模糊遮罩
setConfig({
  modal: {
    mask: { blur: true },
  }
})
```

### 组件全局 Semantic DOM

支持通过全局配置为各个组件设置 Semantic DOM 的 `classNames` 和 `styles`，优先级低于组件 prop 上的 `classNames` / `styles`。

支持的组件：`alert`、`avatar`、`badge`、`breadcrumb`、`button`、`card`、`carousel`、`cascader`、`checkbox`、`collapse`、`datePicker`、`descriptions`、`divider`、`drawer`、`dropdown`、`empty`、`form`、`formItem`、`gap`、`grid`、`image`、`input`、`link`、`list`、`menu`、`message`、`modal`、`pagination`、`popover`、`progress`、`radio`、`rate`、`select`、`skeleton`、`slider`、`spin`、`steps`、`switch`、`table`、`tabs`、`tag`、`textarea`、`tooltip`、`transfer`、`tree`、`treeSelect`、`upload`

```js
// 示例：全局设置 Button 的 Semantic DOM
setConfig({
  button: {
    classNames: {
      root: 'my-custom-button',
      loading: 'my-custom-loading',
    },
    styles: {
      root: { borderRadius: 8 },
    },
  }
})
```

各组件支持的 Semantic DOM key 请参考对应组件文档的 Semantic DOM 章节。

