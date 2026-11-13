import { defineCase } from '../../../core/define';

export default defineCase({
  title: '卡片 手风琴',
  description: '来自 shineout 示例 card/08-accordion，Card.Accordion 同一时间只展开一个，只测挂载',
  notes: [
    'antd 的 Card 没有手风琴，需要用 Collapse accordion（是不同的组件），没有实现',
    'Body 背景：原示例用 3.x 的主题变量，2.x 里没有，两个库统一用固定值',
  ],
});
