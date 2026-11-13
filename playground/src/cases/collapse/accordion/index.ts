import { defineCase } from '../../../core/define';

export default defineCase({
  title: '折叠面板 手风琴',
  description: '来自 shineout 示例 collapse/02-accordion，只测挂载',
  notes: [
    '2.x 没有 Collapse 组件，不参与',
    '只测挂载，不含展开/收起切换的耗时，需要的话要另加 scenarios',
  ],
});
