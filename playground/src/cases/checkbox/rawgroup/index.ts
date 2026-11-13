import { defineCase } from '../../../core/define';

export default defineCase({
  title: '复选框 组（children 写法）',
  description: '来自 shineout 示例 checkbox/004-rawgroup，Checkbox.Group 里手写 Checkbox 子元素，只测挂载',
  notes: [
    '选中值：Shineout 的子项用 htmlValue，antd 用 value，默认值都是 [3, 5]',
  ],
});
