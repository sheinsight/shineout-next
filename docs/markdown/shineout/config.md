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

使用 `direction: 'rtl' | 'ltr'` 用于配置组件是否启用 RTL 模式，RTL 模式下，组件会从右到左排列,默认为 `ltr`

```js
// 开启 RTL 模式
setConfig({
  direction: "rtl",
})
```

### 输入防抖延迟
使用 `delay: number` 用于配置输入组件的 onChange 防抖的延迟时间，单位为毫秒，默认为 `400`

```js
// 设置延迟时间为 0ms
setConfig({
  delay: 0,
})
```

### 去除输入内容两端空格

使用 `trim: boolean` 用于配置输入组件是否去除输入内容两端空格，默认为 `false`

```js
// 去除输入内容两端空格
setConfig({
  trim: true
})

```

### Spin 默认类型
配置 `spin: string` 用于配置组件默认的 Spin 类型，默认为 `ring`


```js
// 设置默认的 Spin 类型为 circle
setConfig({
  spin: 'circle'
})
```

### 弹出层容器
配置 `popupContainer: ()=> HTMLElement | null | (() => HTMLElement | null)` 用于配置组件弹出层的容器，默认为 `document.body`

```js
// 设置弹出层容器为 #app
setConfig({
  popupContainer: () => document.querySelector('#app')
})
```



