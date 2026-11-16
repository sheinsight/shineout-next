import { defineCase } from '../../../core/define';

export default defineCase({
  title: '链接 基本用法',
  description: '来自 shineout 示例 link/01-base，一个链接，只测挂载',
  notes: [
    '2.x 没有 Link 组件（shineout-v2 的导出里没有），所以只有 3.x 和 antd 参与',
    'Link ↔ antd 的 Typography.Link；antd 的 Link 没有 Shineout 那样的 wrapper，节点数更少',
  ],
});
