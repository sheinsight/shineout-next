import { defineCase } from '../../../core/define';

export default defineCase({
  title: '栅格 间隔',
  description: '来自 shineout 示例 gird/04-gutter，8 等分，间隔 8，只测挂载',
  notes: [
    'Shineout 的 Grid 默认 responsive=md：width / offset 只在视口宽度 ≥768px 时生效，更窄时每个格子独占一行；antd 的 Col 没有这个限制。并排布局下每个 frame 只有约 330px，2.x/3.x 会竖排，对比时请切到「上下排列」或把 frame 宽度设为 1280',
    'gutter ↔ antd Row 的 gutter；width=1/8 ↔ span=3',
    'antd 的 gutter 是通过负外边距加列内边距实现的，与 Shineout 的实现方式可能不同，视觉宽度可能略有差异',
  ],
});
