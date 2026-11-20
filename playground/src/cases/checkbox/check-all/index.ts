import { defineCase } from '../../../core/define';

export default defineCase({
  title: '复选框 全选与半选',
  description: '来自 shineout 示例 checkbox/002-checked-2，全选框 + 一组复选框，只测挂载',
  notes: [
    '全选框：Shineout 用 checked 三态值，antd 拆成 checked 与 indeterminate 两个属性',
    'Group：Shineout 用 data + keygen，antd 用 options（字符串数组）',
    '只测挂载，不含勾选全选后的重渲染，需要的话要另加 scenarios',
  ],
});
