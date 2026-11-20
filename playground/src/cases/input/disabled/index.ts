import { defineCase } from '../../../core/define';

export default defineCase({
  title: '输入框 禁用',
  description: '来自 shineout 示例 input/07-disabled，禁用的输入框组和单个禁用输入框，只测挂载',
  notes: [
    'Input.Group disabled ↔ antd 没有对应，用 Space.Compact 并给每个 Input 设 disabled，属于模拟',
    '原示例两个输入框之间的「-」文字没有保留',
  ],
});
