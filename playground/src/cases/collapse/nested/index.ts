import { defineCase } from '../../../core/define';

export default defineCase({
  title: '折叠面板 嵌套',
  description: '来自 shineout 示例 collapse/03-nestedPanels，第一个面板里嵌套一个 Collapse，只测挂载',
  notes: [
    '2.x 没有 Collapse 组件，不参与',
    '默认展开第 1 个面板，其中展开内层第 1 个，所以挂载时两层内容都会渲染',
  ],
});
