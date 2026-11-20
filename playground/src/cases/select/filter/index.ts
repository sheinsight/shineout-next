import { defineCase } from '../../../core/define';

export default defineCase({
  title: '选择器 过滤',
  description: '来自 shineout 示例 select/10-01-filter，onFilter 过滤，单选 + 多选，只测挂载',
  notes: [
    '关闭状态下只渲染选择框，只测挂载；过滤需要打开并输入，这里没有写场景',
    'Shineout 的 data + keygen（+ renderItem）↔ antd 的 options（{ value, label }）；clearable ↔ allowClear；width={300} ↔ style.width；onFilter ↔ antd 的 showSearch（默认按 label 的 includes 过滤，行为等价）',
    '原示例里还有 highlight（高亮关键字）开关，Switch / Form.Item 还没迁移，也没有 antd 对应，所以去掉了；高亮见 notes 之外的其它用例',
  ],
});
