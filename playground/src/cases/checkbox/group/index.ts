import { defineCase } from '../../../core/define';

export default defineCase({
  title: '复选框 组（data 写法）',
  description: '来自 shineout 示例 checkbox/005-group，用数据渲染一组并自定义每项，只测挂载',
  notes: [
    'Shineout 用 data + keygen + renderItem，antd 用 options，渲染内容写在 label 里',
  ],
});
