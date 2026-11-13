import { defineCase } from '../../../core/define';

export default defineCase({
  title: '描述列表 响应式',
  description: '来自 shineout 示例 descriptions/07-responsive，按屏幕宽度改变列数，只测挂载',
  notes: [
    '2.x 没有 Descriptions 组件，不参与',
    '列数由 iframe 的宽度决定，横评页的「frame 宽度」设置会影响结果；只在默认的窄 frame（约 300px）下核对过，三个库都是单列；更宽的断点下两边的列数是否一致没有验证，要对比时需要固定同一个宽度并截图确认',
  ],
});
