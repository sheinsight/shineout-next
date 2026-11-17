import { defineCase } from '../../../core/define';

export default defineCase({
  title: '单选框 按项禁用',
  description: '来自 shineout 示例 radio/008-disabled-func，disabled 为函数，只禁用 yellow，只测挂载',
  notes: [
    'disabled={(d) => d === "yellow"} ↔ antd 的 options 里给 yellow 设 disabled: true（antd 的 Group disabled 只能是布尔值，没有函数形式）',
    'Shineout 的 Radio.Group 用 data + keygen（+ renderItem）渲染，antd 用 options；Shineout 的 Radio 用 htmlValue，antd 用 value',
  ],
});
