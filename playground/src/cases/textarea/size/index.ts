import { defineCase } from '../../../core/define';

export default defineCase({
  title: '多行输入 尺寸',
  description: '来自 shineout 示例 textarea/02-size，small / default / large，只测挂载',
  notes: [
    '2.x 的 Textarea 没有 size 属性（读类型确认），没有实现；antd 的 Input.TextArea 有 size（small / middle / large），对应 small / default / large',
    'antd 的多行输入是 Input.TextArea（不是单独的 Textarea 组件）',
    '实测（宽 120，rows=3）：3.x small / default / large 高度 62 / 74 / 86，字号 12 / 14 / 16；antd small / middle / large 高度 68 / 76 / 91，字号 14 / 14 / 16（5 和 6 相同）。antd 的 small 字号没变小，3.x 的会变小，各库自己的设计',
  ],
});
