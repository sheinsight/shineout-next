import { defineCase } from '../../../core/define';

export default defineCase({
  title: '栅格 基础用法',
  description: '来自 shineout 示例 gird/01-base，5 行，第 i 行占宽 i/5，只测挂载',
  notes: [
    'Shineout 的 Grid 默认 responsive=md：width / offset 只在视口宽度 ≥768px 时生效，更窄时每个格子独占一行；antd 的 Col 没有这个限制。并排布局下每个 frame 只有约 330px，2.x/3.x 会竖排，对比时请切到「上下排列」或把 frame 宽度设为 1280',
    'Shineout 的 Grid 用 width 表示占宽比例，antd 的 Col 是 24 栅格（span），5 等分换算后不是整数，所以 antd 这里用 flex 的百分比宽度，没有用 span，对应关系不是同一个 API',
    '原示例用 Slider 选行数（默认 5），Slider 还没迁移，这里固定成 5 行',
  ],
});
