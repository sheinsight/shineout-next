import { defineCase } from '../../../core/define';

export default defineCase({
  title: '评分 只读',
  description: '来自 shineout 示例 rate/05-disable，value=3.6 + disabled，只测挂载',
  notes: [
    'Shineout 的 Rate 是工厂函数：Rate(背景图标, 前景图标) 返回一个组件，图标写在工厂里；antd 的 Rate 是普通组件，图标用 character 属性。示例里的星星 SVG 只有 viewBox 没有宽高：Shineout 的样式会撑开它，antd 不会（实测 antd 下是 0×0），所以 antd 用的图标统一补了 width/height=1em（_shared/icons.tsx 的 sized）',
    '小数显示不等价：Shineout 的 disabled 会把第 4 颗星按 60% 的宽度填充（读 base/rate.tsx 的 halfStyle）；antd 没有这种按比例的填充，只支持整颗或半颗，所以这里加了 allowHalf，3.6 在 antd 里按半星显示（截图确认：3.x 是 3 颗半多一点，antd 是 3 颗半）',
  ],
});
