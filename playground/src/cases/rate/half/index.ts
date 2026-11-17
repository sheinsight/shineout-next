import { defineCase } from '../../../core/define';

export default defineCase({
  title: '评分 半星',
  description: '来自 shineout 示例 rate/02-half，allowHalf + defaultValue=3.5，只测挂载',
  notes: [
    'Shineout 的 Rate 是工厂函数：Rate(背景图标, 前景图标) 返回一个组件，图标写在工厂里；antd 的 Rate 是普通组件，图标用 character 属性。示例里的星星 SVG 只有 viewBox 没有宽高：Shineout 的样式会撑开它，antd 不会（实测 antd 下是 0×0），所以 antd 用的图标统一补了 width/height=1em（_shared/icons.tsx 的 sized）',
    'allowHalf ↔ antd 的 allowHalf；每颗星里 antd 渲染两层（first / second 各一份图标），Shineout 开启 allowHalf 也多一层 half，DOM 节点数各不相同',
  ],
});
