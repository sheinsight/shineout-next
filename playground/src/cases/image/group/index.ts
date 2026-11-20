import { defineCase } from '../../../core/define';

export default defineCase({
  title: '图片组 平铺',
  description: '来自 shineout 示例 image/s-007-group-2，5 张图平铺，点击后在弹层里切换，只测挂载',
  notes: [
    '原示例的图片是 raw.githubusercontent.com 上的外链，横评里改用内联 SVG（data URI，400x300），避免网络抖动进入测量；代价是没有真实的网络加载阶段',
    'Image.Group ↔ antd 的 Image.PreviewGroup。Shineout 的 Group 是一个带 gallery 的容器 div，antd 的 PreviewGroup 本身不渲染 DOM，所以这里手动包了一层 div 来承接 fontSize: 0',
    '2.x 的 Image.Group 没有 fit 属性（类型里没有），所以 2.x 把 fit=fill 写在每个 Image 上，3.x 与原示例一致写在 Group 上',
    '原示例 s-007-group-1（pile 堆叠、showCount 角标）antd 没有对应功能，没有迁移',
  ],
});
