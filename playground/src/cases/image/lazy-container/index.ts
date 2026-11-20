import { defineCase } from '../../../core/define';

export default defineCase({
  title: '图片 指定懒加载容器',
  description: '来自 shineout 示例 image/s-008-lazy-2，在 300px 高的滚动容器里放 4 张图，container 指定容器，只测挂载',
  notes: [
    '原示例的图片是 raw.githubusercontent.com 上的外链，横评里改用内联 SVG（data URI，400x300），避免网络抖动进入测量；代价是没有真实的网络加载阶段',
    'antd 没有 container 属性，用原生 loading="lazy"，浏览器会自己按滚动容器判断，没有可配置项，不是同一个 API',
    'height 为 100%：在 Shineout 里是相对图片宽度的比例（见 2.x 的 height 说明），在 antd 里是相对父容器高度，两边每张图的高度可能不同，需看截图确认',
  ],
});
