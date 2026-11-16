import { defineCase } from '../../../core/define';

export default defineCase({
  title: '菜单 禁用',
  description: '来自 shineout 示例 menu/05-disabled，Option 1 和 Navigation Four 禁用，只测挂载',
  notes: [
    'disabled={(d) => !!d.disabled} ↔ items 里每项的 disabled 字段（数据层面，不是函数）',
  ],
});
