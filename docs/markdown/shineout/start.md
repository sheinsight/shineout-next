`````
开发指南

# 快速上手

跟随以下的步骤，快速上手组件库的使用。
`````

## 安装

**需要同时安装 react >= 16.8 和 react-dom >= 16.8**

**非 umd 的产物引入前需要安装 core-js >=3.0.0**

```js
// npm
npm i shineout

// yarn
yarn add shineout
```

### 通过 CDN 使用

除了可以通过 npm 安装之外，你也可以直接使用 CDN 资源，我们提供了 umd 格式的代码产物。

- 开发环境: https://unpkg.com/shineout@latest-3/dist/shineout.js
- 生产环境: https://unpkg.com/shineout@latest-3/dist/shineout.min.js

不过，我们不建议通过 CDN 使用，因为 CDN 会引入全量的组件代码，这样会影响页面加载速度。

## 基础使用

以 Button 组件为例。

```js
import { createRoot } from 'react-dom/client';
import { Button } from 'shineout';

createRoot(document.getElementById('root')).render(
  <div style={{ padding: 20 }}>
    <Button type='primary'>Hello Shineout3.0</Button>
  </div>,
);
```

## 按需加载

`shineout` 的组件默认支持 `tree shaking`, 使用 `import { Button } from 'shineout';` 方式引入即可按需加载。

## 浏览器兼容性

| [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/08095282566ac4e0fd98f89aed934b65.png~tplv-uwbnlip3yd-png.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/40ad73571879dd8d9fd3fd524e0e45a4.png~tplv-uwbnlip3yd-png.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4f59d35f6d6837b042c8badd95871b1d.png~tplv-uwbnlip3yd-png.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/eee2667f837a9c2ed531805850bf43ec.png~tplv-uwbnlip3yd-png.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3240334d3967dd263c8f4cdd2d93c525.png~tplv-uwbnlip3yd-png.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f2454685df95a1a557a61861c5bec256.png~tplv-uwbnlip3yd-png.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Edge 16| 83| 49 | 31 | 36 | last 2 versions |s
