import { defineCase } from '../../../core/define';

export default defineCase({
  title: '栅格 偏移',
  description: '来自 shineout 示例 gird/02-offset，宽度 1/3、偏移 1/3，只测挂载',
  notes: [
    'Shineout 的 Grid 默认 responsive=md：width / offset 只在视口宽度 ≥768px 时生效，更窄时每个格子独占一行；antd 的 Col 没有这个限制。并排布局下每个 frame 只有约 330px，2.x/3.x 会竖排，对比时请切到「上下排列」或把 frame 宽度设为 1280',
    'width=1/3 offset=1/3 ↔ antd 的 span=8 offset=8（24 栅格的 1/3 = 8）',
  ],
});
