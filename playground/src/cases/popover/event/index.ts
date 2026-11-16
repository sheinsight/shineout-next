import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '气泡 事件',
  description: '来自 shineout 示例 popover/11-event，onOpen / onClose',
  scenarios: openScenarios,
  notes: [
    '「打开」场景：用例自己的 <button data-bench=\'open\'> 同步 setOpen(true)，气泡走受控的 visible（Shineout）/ open（antd），自动测试时打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时不会自动关闭',
    'onOpen / onClose ↔ antd 的 afterOpenChange / onOpenChange 不是同一个语义（Shineout 的是打开 / 关闭时触发，antd 的 afterOpenChange 是动画结束后触发）；这里只是各挂一个空函数，比较「带事件回调」的开销，不比较事件时机',
    '原示例的回调里是 console.log，这里去掉，避免日志的开销混进测量',
    '结构差异：Shineout 的 Popover 是放在 Button 里面的子元素，自己找父元素当触发器；antd 的 Popover 要把 Button 包在里面，内容写在 content 属性里。位置上 Shineout 默认 bottom-left，antd 默认 top，所以 antd 设了 placement=\'bottomLeft\'',
  ],
});
