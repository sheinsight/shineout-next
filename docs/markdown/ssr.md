## 在 Nextjs 中的样式处理

#### 为什么 Nextjs 中使用 shineout 组件会出现闪屏问题

因为 shineout 组件使用 CSS-in-JS 技术处理样式，在 Next.js 中使用 CSS-in-JS 技术时，由于 Next.js 的服务器端渲染机制和客户端渲染机制的不同，可能会导致 CSS 样式在客户端和服务器端加载的时间不同，从而导致页面在客户端渲染完成之前没有样式，出现短暂的“闪屏”现象。它的发生原因是浏览器在下载 HTML 文件时不会等待 CSS 文件的下载和渲染，而是会立即开始渲染 HTML 文件，如果 CSS 文件还没有下载完成，浏览器就会先显示未经样式处理的 HTML 内容，直到 CSS 文件下载完成并被应用于页面。

#### 为什么使用 CSS-in-JS 技术

代码组织更清晰：使用 CSS-in-JS 技术可以将组件的样式定义在组件内部，使得每个组件的样式只在该组件中生效，避免了全局 CSS 的命名冲突和影响。同时，CSS-in-JS 技术可以将样式和组件代码耦合在一起，使得代码组织更加清晰和易于维护。

样式更加灵活和动态：使用 CSS-in-JS 技术可以动态生成样式，通过 JavaScript 可以根据组件的状态和属性来动态生成样式，从而实现更灵活和动态的页面效果。这对于一些需要根据不同状态或条件来调整样式的应用场景非常有用。

更好的性能和用户体验：使用 CSS-in-JS 技术可以实现服务端渲染样式，从而提高页面的加载速度和性能。因为服务端渲染可以在页面初次加载时直接将渲染结果返回给浏览器，减少了网络请求和页面加载时间。同时，CSS-in-JS 技术可以减少样式文件的大小和数量，从而提高页面的性能和用户体验。

可以使用 CSS 的全部特性：CSS-in-JS 技术可以支持 CSS 的全部特性，可以使用任何 CSS 语法和规则。同时，还可以在 JavaScript 中使用函数、变量、逻辑和循环等语法来动态生成样式。

#### 如何解决闪屏问题

可以使用 Next.js 提供的 getInitialProps 方法，在服务器端生成 CSS 样式，并在客户端和服务器端同时加载 CSS 样式，从而避免页面在客户端渲染完成之前没有样式的问题。

```js
// _document
import Document, { DocumentContext } from 'next/document';
import { SheetsRegistry, JssProvider } from 'shineout';

export default class JssDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const registry = new SheetsRegistry();
    const originalRenderPage = ctx.renderPage;
    // eslint-disable-next-line no-param-reassign
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          (
            <JssProvider registry={registry}>
              <App {...props} />
            </JssProvider>
          ),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id='server-side-styles'>{registry.toString()}</style>
        </>
      ),
    };
  }
}
```

客户端删除服务端生成的样式标签以避免副作用

```js
// _app
useEffect(() => {
  const style = document.getElementById('server-side-styles')

  if (style && style.parentNode) {
    style.parentNode.removeChild(style)
  }
}, [])
```
