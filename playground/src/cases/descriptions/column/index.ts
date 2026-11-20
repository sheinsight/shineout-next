import { defineCase } from '../../../core/define';

export default defineCase({
  title: '描述列表 列数',
  description: '来自 shineout 示例 descriptions/02-colums，单列，标签左对齐与右对齐各一个，只测挂载',
  notes: [
    '2.x 没有 Descriptions 组件，不参与',
    'labelStyle ↔ antd 的 styles.label（antd6 里 labelStyle 已弃用）',
  ],
});
