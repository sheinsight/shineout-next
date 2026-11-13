import { defineCase } from '../../../core/define';

export default defineCase({
  title: '卡片 阴影',
  description: '来自 shineout 示例 card/02-shadow，从不 / 悬浮 / 常驻 三种阴影，只测挂载',
  notes: [
    'antd 只有 hoverable（悬浮显示阴影），没有「常驻阴影」，所以 antd 只渲染前两张，卡片数量比 Shineout 少一张',
  ],
});
