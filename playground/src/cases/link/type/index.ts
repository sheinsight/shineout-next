import { defineCase } from '../../../core/define';

export default defineCase({
  title: '链接 类型',
  description: '来自 shineout 示例 link/02-type，primary / secondary / danger / warning / success 五种类型，只测挂载',
  notes: [
    '2.x 没有 Link 组件（shineout-v2 的导出里没有），所以只有 3.x 和 antd 参与',
    'primary ↔ antd 不传 type（默认就是主色）；其余四种同名',
    'Gap column={24} ↔ Space size={24}；两边都包了子元素',
  ],
});
