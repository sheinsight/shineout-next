import { defineCase } from '../../../core/define';

export default defineCase({
  title: '滑块 禁用',
  description: '来自 shineout 示例 slider/08-disabled，禁用的范围滑块 [25, 75]，只测挂载',
  notes: [
    'Shineout 的 Slider 默认带两端刻度和当前值标签（滑块上方的数字），antd 默认没有刻度标签，hover 才出 tooltip，所以 Shineout 的 DOM 节点比 antd 多（实测 Shineout 轨道区域高 58px、antd 12px）',
  ],
});
