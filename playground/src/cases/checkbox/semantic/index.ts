import { defineCase } from '../../../core/define';

export default defineCase({
  title: '复选框 语义化样式',
  description: '来自 shineout 示例 checkbox/011-semantic，只有 3.x 与 antd 6 参与',
  notes: [
    '2.x、antd 5 的 Checkbox 没有 styles / classNames，不参与',
    '单个 Checkbox：root / indicator / label ↔ antd 的 root / icon / label',
    'Checkbox.Group：Shineout 的 group ↔ antd Group 的 root；Shineout 里的 root / indicator 作用在每一项上，对应 antd 的 item / itemIcon',
  ],
});
