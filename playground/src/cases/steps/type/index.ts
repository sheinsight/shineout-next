import { defineCase } from '../../../core/define';

export default defineCase({
  title: '步骤条 点状',
  description: '来自 shineout 示例 steps/06-type 的 dot 类型，不带/带描述两种，只测挂载',
  notes: [
    '2.x 没有 Steps 组件，没有实现',
    'Shineout 的 Steps 用 <Steps.Step> 子元素，antd 用 items 数组；antd 6 的 description 改名 content（antd 5 还是 description）',
    '节点和尺寸是各库自己的，点状样式的圆点大小、间距没有逐项核对',
    '原示例还有 type=arrow（箭头形），antd 没有对应（navigation / panel 外观不同），没迁',
    'Shineout 的 type=dot 对应 antd 5 的 progressDot、antd 6 的 type=dot（antd 6 已弃用 progressDot）',
  ],
});
