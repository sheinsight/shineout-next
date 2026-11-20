import { defineCase } from '../../../core/define';

export default defineCase({
  title: '图片 填充方式',
  description: '来自 shineout 示例 image/s-005-fit，fill / center / fit / stretch 四种填充，只测挂载',
  notes: [
    '原示例的图片是 raw.githubusercontent.com 上的外链，横评里改用内联 SVG（data URI，400x300），避免网络抖动进入测量；代价是没有真实的网络加载阶段',
    'fit 的对应关系是按浏览器里实测的渲染结果定的：fill ↔ cover；center ↔ contain（Shineout 的 img 128x96，等比缩进容器）；fit ↔ none（Shineout 用 div 背景图，原尺寸居中裁切）；stretch ↔ fill。Shineout 3.x 的 center 和 stretch 容器背景多了灰底，antd 没有',
    'Shineout 的 fit=fit 用 div 的 background 渲染，其余用 img；antd 全部用 img 的 object-fit，DOM 不同',
  ],
});
