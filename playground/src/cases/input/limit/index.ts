import { defineCase } from '../../../core/define';

export default defineCase({
  title: '输入框 限制',
  description: '来自 shineout 示例 input/14-limit，min / max / maxLength，只测挂载',
  notes: [
    'Input.Number ↔ antd 的 InputNumber；Input.Group + <b> ↔ Space.Compact + Space.Addon',
    'Input.Number 在 Shineout 里箭头常驻显示，antd 的 InputNumber 箭头悬停才显示，结构类似但外观不同',
  ],
});
