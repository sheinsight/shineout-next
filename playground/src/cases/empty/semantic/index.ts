import { defineCase } from '../../../core/define';

export default defineCase({
  title: '空状态 语义化样式',
  description: '来自 shineout 示例 empty/005-semantic，只有 3.x、antd5、antd6 参与',
  notes: [
    '2.x 没有 Empty 组件，不参与',
    '节点对应：root、description 同名，Shineout 的 icon ↔ antd 的 image；antd 还有 footer 节点，Shineout 没有，没用到',
    'antd5 的 Empty 也支持 styles，所以 antd5 参与',
  ],
});
