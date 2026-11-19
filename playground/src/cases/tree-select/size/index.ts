import { defineCase } from '../../../core/define';

export default defineCase({
  title: '树选择 尺寸',
  description: '来自 shineout 示例 tree-select/09-size，small / default / large 三种尺寸',
  notes: [
    '只测挂载，没有交互场景（打开下拉的场景只放在 base、multiple、virtual 里）',
    'antd 的 size：small / middle / large，Shineout 的 default 对应 antd 的 middle（不传）。三个选择器共用一个 value，同原示例',
    'Shineout 的 data + keygen=\'id\' + renderItem（node xxx）↔ antd 的 treeData（{ value, title, children }，title 里已经拼好 node 前缀）；clearable ↔ allowClear；width={300} ↔ style.width',
  ],
});
