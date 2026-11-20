import { defineCase } from '../../../core/define';

export default defineCase({
  title: '输入框 数字',
  description: '来自 shineout 示例 input/03-number-0，各种 digits / numType / autoFix 配置的数字输入，只测挂载',
  notes: [
    'Shineout 的数字输入是 Input type=number（和 Input.Number）；antd 里对应的是 InputNumber，是另一个组件（带步进按钮的 spinner，箭头只在悬停时显示），DOM 比 Shineout 的 Input 多（antd 85 / 78 个节点，Shineout 2.x/3.x 23 / 29 个），不是同一类结构。Shineout 的 type=number 输入框没有箭头，只有最后一项 Input.Number 有常驻箭头',
    'digits ↔ precision：digits 只限制小数位数，precision 会改写显示值（四舍五入并补零），语义有差异；autoFix（失焦补零）≈ precision',
    'numType=non-negative ↔ min={0}；原示例的 integerLimit、numType=positive 两项 antd 没有对应属性，没有迁移',
    '最后一项 Input.Number ↔ 同样用 antd 的 InputNumber，两边都没有额外配置',
  ],
});
