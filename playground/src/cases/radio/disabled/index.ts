import { defineCase } from '../../../core/define';

export default defineCase({
  title: '单选框 整组禁用',
  description: '来自 shineout 示例 radio/007-disabled，disabled 的 Radio.Group，只测挂载',
  notes: [
    'Shineout 的 Radio.Group 用 data + keygen（+ renderItem）渲染，antd 用 options；Shineout 的 Radio 用 htmlValue，antd 用 value',
  ],
});
