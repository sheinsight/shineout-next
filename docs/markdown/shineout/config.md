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
}`  

默认值： `ring`


```js
// 设置默认的 Spin 类型为 circle
setConfig({
  spin: 'circle'
})
```

```js
// 设置全局 Spin 的默认类型、提示内容、颜色
setConfig({
  spin: {
    name: 'wave',
    color: '#000000',
    tip: 'loading...'
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



