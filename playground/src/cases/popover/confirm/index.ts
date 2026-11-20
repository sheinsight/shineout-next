import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '气泡 确认框',
  description: '来自 shineout 示例 popover/09-confirm，Popover.Confirm ↔ antd 的 Popconfirm',
  scenarios: openScenarios,
  notes: [
    '「打开」场景：用例自己的 <button data-bench=\'open\'> 同步 setOpen(true)，气泡走受控的 visible（Shineout）/ open（antd），自动测试时打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时不会自动关闭',
    'Popover.Confirm ↔ Popconfirm。原示例的 onOk 返回一个 2 秒的 Promise（按钮 loading），这里 onOk / onCancel 直接关闭，没有测 loading 路径',
    '2.x 的 Popover.Confirm 类型里没有 title，所以 2.x 没传 title；3.x 传了 title=Tips，antd 的 title 必填，并把正文放进 description。所以三种标题结构不同，内容节点数不等价',
    '内置图标和按钮：2.x 的 Confirm 源码里默认 icon=true、okType=danger；antd 的 Popconfirm 默认有图标、确定按钮是 primary。3.x 的默认值没有逐项核对，截图时再看视觉差异',
    '结构差异：Shineout 的 Popover 是放在 Button 里面的子元素，自己找父元素当触发器；antd 的 Popover 要把 Button 包在里面，内容写在 content 属性里。Popconfirm 没有 mouseEnter 类触发，默认点击触发；这里受控打开',
  ],
});
