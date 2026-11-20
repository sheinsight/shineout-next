import { defineCase } from '../../../core/define';

export default defineCase({
  title: '描述列表 尺寸',
  description: '来自 shineout 示例 descriptions/06-size，单选切换尺寸 + 普通与带边框各一个，默认 default，只测挂载',
  notes: [
    '2.x 没有 Descriptions 组件，不参与',
    'size：Shineout 的 default ↔ antd 的 middle。antd5 的类型只有 middle / small / default，没有 large，选 large 时 antd5 会忽略，但用例默认就是 default，不影响挂载',
    '单选组用各库自己的 Radio，是挂载开销的一部分',
  ],
});
