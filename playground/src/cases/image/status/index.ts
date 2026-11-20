import { defineCase } from '../../../core/define';

export default defineCase({
  title: '图片 不同状态',
  description: '来自 shineout 示例 image/s-002-status，一张正常图片和一张加载失败的图片，只测挂载',
  notes: [
    '原示例的图片是 raw.githubusercontent.com 上的外链，横评里改用内联 SVG（data URI，400x300），避免网络抖动进入测量；代价是没有真实的网络加载阶段',
    '加载失败的图片：Shineout 渲染内置的 error 占位（带图标），antd 没有设置 fallback 时直接显示浏览器的破图，两边的失败态 DOM 和样式不同，不是等价对比',
    '原示例正常图片的 src 带 ?v=key 用于重新请求，这里用 key 重新挂载整个容器，不再请求网络',
  ],
});
