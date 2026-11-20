import { defineCase } from '../../../core/define';

export default defineCase({
  title: '评分 可清除',
  description: '来自 shineout 示例 rate/10-clear，clearable（再次点击已选中的星取消选择），只测挂载',
  notes: [
    'Shineout 的 Rate 是工厂函数：Rate(背景图标, 前景图标) 返回一个组件，图标写在工厂里；antd 的 Rate 是普通组件，图标用 character 属性。示例里的星星 SVG 只有 viewBox 没有宽高：Shineout 的样式会撑开它，antd 不会（实测 antd 下是 0×0），所以 antd 用的图标统一补了 width/height=1em（_shared/icons.tsx 的 sized）',
    'clearable ↔ antd 的 allowClear；antd 的 allowClear 默认是 true（读 rc-rate 源码 allowClear = true），Shineout 的 clearable 默认是 false（rate.tsx 里 clearable = false），这个用例显式开了两边；所以其它用例里 antd 点已选中的星会取消选择，Shineout 不会，base 的点击场景因为每次点不同的星，不受影响',
    '只测挂载，没有点击场景；点击场景见 rate/base',
  ],
});
