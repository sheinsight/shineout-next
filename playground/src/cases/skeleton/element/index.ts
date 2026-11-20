import { defineCase } from '../../../core/define';

export default defineCase({
  title: '骨架屏 不同元素',
  description: '来自 shineout 示例 skeleton/03-element，文本、段落、头像、方形图片、按钮五种骨架，只测挂载',
  notes: [
    '2.x 没有 Skeleton 组件，没有实现',
    '尺寸（实测）：Shineout 头像/图片 large 是 64×64（默认 48），按钮默认 80×32；antd 头像用数字 size 对齐（这里用 64 / 48），按钮没有对齐，用各库默认：antd 默认 64×32（large 是 80×40），比 Shineout 窄 16px',
    '5 种骨架里，文本/段落对应 antd 的 title=false + paragraph；头像、方形图片都对应 antd 的 avatar（shape=circle / square，antd 的 Skeleton.Image 是带图标的灰块，视觉上不是同一个东西，不用）；按钮对应单独的 Skeleton.Button，不是 Skeleton 的属性',
    'antd 的 avatar-only 要同时关掉 title 和 paragraph，否则会多出标题和段落；antd 单行/最后一行默认宽 61%，文本那一项显式设了 width=100% 对齐 Shineout（截图确认默认是 61%）',
    'antd 的 section 外框比 Shineout 高：文本一项实测 antd 44px、Shineout 16px，段落 3 行 antd 108、Shineout 72（antd 行间距 16、Shineout 12；段落元素本身高度和 Shineout 一样（文本 16），多出来的高度在 section 里，来源没有进一步查）',
  ],
});
