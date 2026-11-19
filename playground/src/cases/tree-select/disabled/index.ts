import { defineCase } from '../../../core/define';

export default defineCase({
  title: '树选择 禁用',
  description: '来自 shineout 示例 tree-select/06-disabled，整体禁用 + 部分节点禁用',
  notes: [
    '只测挂载，没有交互场景（打开下拉的场景只放在 base、multiple、virtual 里）',
    '第二个选择器是「部分节点禁用」：Shineout 用 disabled={(d) => d.title.startsWith(\'2-\')}，antd 在 treeData 里给对应节点加 disabled: true；节点是否禁用只有展开下拉才看得到，挂载时不展开',
    '原示例第一个有 style={{ width: 250 }} 又有 width={300}，这里统一用 width=300（Shineout）/ style.width=300（antd），没有逐项核对原示例里 style 覆盖 width 的实际渲染宽度',
    'Shineout 的 data + keygen=\'id\' + renderItem（node xxx）↔ antd 的 treeData（{ value, title, children }，title 里已经拼好 node 前缀）；clearable ↔ allowClear；width={300} ↔ style.width',
  ],
});
