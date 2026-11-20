import { defineCase } from '../../../core/define';

export default defineCase({
  title: '文字提示 隐藏箭头',
  description: '来自 shineout 示例 tooltip/example-08-hide-arrow，不显示箭头（原示例同时设了 persistent），只测挂载',
  notes: [
    '只测挂载，没有「悬停打开」的交互场景：Shineout 的 Tooltip 没有受控的显示属性（仓库源码 packages/base 的 tooltip.type.ts 里 visible 是被注释掉的），不能像 popover 那样用 data-bench 按钮直接打开；走真实的悬停路径时，合成 mouseover 后气泡实测约 2.x 15ms / 3.x 13ms / antd 118ms（antd 默认 mouseEnterDelay 100ms）才出现，都晚于场景的测量窗口（一帧），测到的只会是事件派发本身，不是气泡渲染，所以不做；挂载数据测的是每个触发元素上 Tooltip 的初始化开销（气泡本身要悬停才渲染）',
    '只有 3.x 和 antd 参与：2.x 的 Tooltip 没有 showArrow 属性（读类型确认）',
    'Shineout 的 showArrow={false} 对应 antd 的 arrow={false}（antd 5.x 起支持）；原示例的 persistent（气泡可悬停保持，不会立刻消失）antd 没有同名属性（antd 的气泡本身可悬停保持，这里没有逐个核对），没迁 persistent',
  ],
});
