import { defineCase } from '../../../core/define';

export default defineCase({
  title: '日期选择 语义化样式',
  description: '来自 shineout 示例 date-picker/22-semantic，只有 3.x 与 antd 6 参与',
  notes: [
    '2.x、antd 5 没有 styles / classNames，不参与',
    '节点对应：root ↔ root；header ↔ input；popup ↔ popup.root；popupHeader ↔ popup.header；cell ↔ popup.item；popupFooter ↔ popup.footer',
    '弹层没有展开，popup 相关的样式在挂载阶段不会生效，只有 root 与输入区能看到',
  ],
});
