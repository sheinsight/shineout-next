import { defineCase } from '../../../core/define';

export default defineCase({
  title: '复选框 尺寸',
  description: '来自 shineout 示例 checkbox/001-size，small / default / large，只测挂载',
  notes: [
    'antd 的 Checkbox 没有 size 属性，不参与',
    '结果只有 2.x 与 3.x 可比',
  ],
});
