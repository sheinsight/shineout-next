import { defineCase } from '../../../core/define';

export default defineCase({
  title: '表单 行内布局',
  description: '来自 shineout 示例 form/004-inline，所有字段排成一行，只测挂载',
  notes: [
    'inline ↔ antd 的 layout="inline"',
    'antd 的行内布局没有 labelWidth，标签宽度由内容撑开',
  ],
});
