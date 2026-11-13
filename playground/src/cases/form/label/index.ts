import { defineCase } from '../../../core/define';

export default defineCase({
  title: '表单 标签对齐',
  description: '来自 shineout 示例 form/003-label-1，单选切换标签对齐（left / top / right），默认 right，只测挂载',
  notes: [
    'labelAlign=top（标签在输入框上方）对应 antd 的 layout="vertical"；left / right 对应 antd 的 labelAlign + labelCol（antd6 用 start / end，antd5 用 left / right）',
    '原示例里的 Input type=password 在 antd 里用 Input.Password',
    '单选组用各库自己的 Radio，是挂载开销的一部分；原示例 003-label-2（垂直对齐）和 003-label-3（冒号开关）用到 Switch 等组件，没有迁移',
  ],
});
