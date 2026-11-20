import { defineCase } from '../../../core/define';

export default defineCase({
  title: '单选框 选中与禁用',
  description: '来自 shineout 示例 radio/001-base-1，四个固定状态的 Radio（未选 / 选中 / 禁用未选 / 禁用选中），只测挂载',
  notes: [
    '四个库写法相同',
    '原示例没有 onChange，选中状态是写死的；antd 在 checked 没有 onChange 时会在控制台报只读警告，不影响渲染',
  ],
});
