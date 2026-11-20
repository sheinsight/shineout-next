import { defineCase } from '../../../core/define';
import { clickScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '滑块 基本用法',
  description: '来自 shineout 示例 slider/01-base，单滑块，值 50',
  scenarios: clickScenarios((v) => (v === 80 ? 0.2 : 0.8)),
  notes: [
    '原示例是不受控（defaultValue），为了能校验点击有没有生效，这里改成受控并上报当前值，初值不变',
    '「点击轨道改变值」场景：往轨道上派发带坐标的 mousedown / mouseup / click（2.x 监听 .so-slider-inner 的 click，3.x 监听 .soui-slider-track 的 click，antd 监听根节点的 mousedown，三者各取所需），位置在不同的两点间交替，保证每次都会改值；校验上报的值确实变了。测的是点击到下一帧绘制完成的主线程占用，不包含拖拽',
    'Shineout 的 Slider 默认带两端刻度和当前值标签（滑块上方的数字），antd 默认没有刻度标签，hover 才出 tooltip，所以 Shineout 的 DOM 节点比 antd 多（实测 Shineout 轨道区域高 58px、antd 12px）',
  ],
});
