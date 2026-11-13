import { defineCase } from '../../../core/define';

export default defineCase({
  title: '日期选择 快捷选择',
  description: '来自 shineout 示例 date-picker/09-quick，三个快捷项，只测挂载',
  notes: [
    'quickSelect（name / value）↔ antd 的 presets（label / value）',
    '2.x 的 value 必须是具体值，不能是函数，所以 2.x 在模块加载时算好；3.x 和 antd 用函数，选中时才计算，对挂载没有影响',
    '快捷项只在展开面板后才渲染，挂载阶段没有差别，要测需要另加 scenarios',
  ],
});
