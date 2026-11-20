import { defineCase } from '../../../core/define';

export default defineCase({
  title: '列表 无边框',
  description: '来自 shineout 示例 list/01-03-border，外层自己加边框、列表本身 bordered=false，只测挂载',
  notes: [
    'itemStyle ↔ 给每个 List.Item 设 style；2.x 没有 itemStyle，所以 2.x 保留了默认的左右内边距，视觉上和另外三个略有不同',
  ],
});
