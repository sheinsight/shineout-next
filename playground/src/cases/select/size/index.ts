import { defineCase } from '../../../core/define';

export default defineCase({
  title: '选择器 尺寸',
  description: '来自 shineout 示例 select/05-size，small / default / large 三个，只测挂载',
  notes: [
    '关闭状态下只渲染选择框，只测挂载',
    'Shineout 的 data + keygen（+ renderItem）↔ antd 的 options（{ value, label }）；clearable ↔ allowClear；width={300} ↔ style.width；size default ↔ antd 的 middle',
  ],
});
