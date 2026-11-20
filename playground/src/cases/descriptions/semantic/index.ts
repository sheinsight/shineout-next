import { defineCase } from '../../../core/define';

export default defineCase({
  title: '描述列表 语义化样式',
  description: '来自 shineout 示例 descriptions/08-semantic，只有 3.x、antd5、antd6 参与',
  notes: [
    '2.x 没有 Descriptions 组件，不参与',
    '节点对应：root / header / title / extra / label 相同，Shineout 的 value ↔ antd 的 content；Shineout 的 table 在 antd 里没有节点，省略',
    'antd5 的 Descriptions 也支持 styles（6 个节点），所以 antd5 在这个用例里参与','原示例固定 column={3}，frame 很窄时每个单元格会被挤成竖条（3.x 和 antd 都一样），看样式效果时建议把「frame 宽度」调大',
  ],
});
