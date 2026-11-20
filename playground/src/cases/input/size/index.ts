import { defineCase } from '../../../core/define';

export default defineCase({
  title: '输入框 尺寸',
  description: '来自 shineout 示例 input/02-size，small / default / large 三种尺寸，只测挂载',
  notes: [
    'size default ↔ antd 的 middle（不传即可）；small / large 同名',
    '两边各尺寸的实际高度不同（Shineout default 32，antd middle 32，small / large 视觉上略有差异），不是同高对比',
  ],
});
