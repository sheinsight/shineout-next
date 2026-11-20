import { defineCase } from '../../../core/define';

export default defineCase({
  title: '级联选择 语义化样式',
  description: '来自 shineout 示例 cascader/semantic，只有 3.x 和 antd 6 参与',
  notes: [
    '2.x、antd 5 没有语义化 styles / classNames（antd 5 只有 root），不参与',
    '节点对应：Shineout 的 popup / list / option ↔ antd 6 的 popup.root / popup.list / popup.listItem；Shineout 的 header 没有 antd 对应，省略',
  ],
});
