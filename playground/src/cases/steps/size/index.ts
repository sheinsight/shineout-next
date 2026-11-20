import { defineCase } from '../../../core/define';

export default defineCase({
  title: '步骤条 尺寸',
  description: '来自 shineout 示例 steps/02-size，small / default / large 三种，只测挂载',
  notes: [
    '2.x 没有 Steps 组件，没有实现',
    'Shineout 的 Steps 用 <Steps.Step> 子元素，antd 用 items 数组；antd 6 的 description 改名 content（antd 5 还是 description）',
    '节点和尺寸是各库自己的（实测，宽 500）：3.x 整体高 60、图标 28px，标题在图标下方；antd 5/6 整体高 32、图标 32px，标题在图标右侧同一行。带描述时 3.x 高 86、antd 5 高 54、antd 6 高 76。这是各库默认排布不同（Shineout 默认 vertical label，antd 默认 horizontal label），不是用例写法造成的',
    'antd 没有 large（antd 5 只有 small / default，antd 6 只有 small / medium），所以 antd 这边只渲染 small 和 default 两个，3.x 渲染三个（small / default / large），Steps 数量不同，DOM 节点数少一组（实测 3.x 73 个节点，antd 5/6 为 51/53）；高度实测 3.x 54 / 60 / 66，antd small 24、default 32',
  ],
});
