import { defineCase } from '../../../core/define';

export default defineCase({
  title: '间距 语义化样式',
  description: '来自 shineout 示例 gap/05-semantic，只有 3.x 与 antd 6 参与',
  notes: [
    '2.x 没有 styles / classNames；antd5 的 Space 只有 item 节点，没有 root，不参与',
    '节点对应：root、item 同名；antd 还有 separator 节点，Shineout 没有，没用到',
  ],
});
