import { defineCase } from '../../../core/define';

export default defineCase({
  title: '输入框 下划线',
  description: '来自 shineout 示例 input/10-underline，只有下边框的输入框，只测挂载',
  notes: [
    'underline ↔ antd 的 variant="underlined"（antd 5.24+ 才有该取值，已用 tsc 验证类型）',
  ],
});
