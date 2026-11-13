import { defineCase } from '../../../core/define';

export default defineCase({
  title: '折叠面板 语义化样式',
  description: '来自 shineout 示例 collapse/08-semantic，只有 3.x 与 antd 6 参与',
  notes: [
    '2.x、antd 5 的 Collapse 没有 styles / classNames（antd5 只有面板级别），不参与',
    '节点对应：root / header / title / icon 相同，Shineout 的 content ↔ antd 的 body；extra 在 antd 里没有节点，省略',
    'Shineout 的 extraPosition 没有 antd 对应，第二组只保留图标靠右（expandIconPosition="right" ↔ expandIconPlacement="end"）',
  ],
});
