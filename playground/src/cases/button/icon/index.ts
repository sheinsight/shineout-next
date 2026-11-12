import { defineCase } from '../../../core/define';

export default defineCase({
  title: '按钮 图标按钮',
  description: '来自 shineout 示例 button/s-002-icon，按钮里嵌入图标，只测挂载',
  notes: [
    'antd 5 没有 shape="square"，第三个按钮不带 shape，2.x 同理',
    '图标不用各库自带的，四个库共用同一份内联 svg（_shared/icons.tsx）',
  ],
});
