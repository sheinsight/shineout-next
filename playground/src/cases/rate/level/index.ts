import { defineCase } from '../../../core/define';

export default defineCase({
  title: '评分 表情等级',
  description: '来自 shineout 示例 rate/06-level，用表情图标表示等级：选中的星都显示当前等级对应的表情，其余显示灰色背景表情，六个值 5…0 各一行，只测挂载',
  notes: [
    'Shineout 的 Rate 是工厂函数：Rate(背景图标, 前景图标) 返回一个组件，图标写在工厂里；antd 的 Rate 是普通组件，图标用 character 属性。示例里的星星 SVG 只有 viewBox 没有宽高：Shineout 的样式会撑开它，antd 不会（实测 antd 下是 0×0），所以 antd 用的图标统一补了 width/height=1em（_shared/icons.tsx 的 sized）；原示例的 front 是图标数组，Shineout 按「当前值 - 1」选图标（repeat 默认 true）',
    'antd 没有 front / background 两套图标，这里用 character 函数按同样规则返回图标：index < ceil(value) 时返回 front[ceil(value) - 1]，否则返回背景图标。antd 的每颗星里图标渲染两份（first / second），所以图标数量是 Shineout 的两倍',
    'antd 对未选中的星还会再叠一层自己的灰色（starBg），颜色是否与 Shineout 完全一致没有逐项核对',
  ],
});
