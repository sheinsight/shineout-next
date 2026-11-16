import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '气泡 禁用元素',
  description: '来自 shineout 示例 popover/07-disabled，禁用按钮的外面包一层元素，气泡挂在这层元素上',
  scenarios: openScenarios,
  notes: [
    '「打开」场景：用例自己的 <button data-bench=\'open\'> 同步 setOpen(true)，气泡走受控的 visible（Shineout）/ open（antd），自动测试时打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时不会自动关闭',
    'Shineout 里 Popover 和禁用的 Button 是兄弟节点，一起放在 inline-block 的 div 里，气泡由 div 触发；antd 里 Popover 包住这个 div（antd 官方对禁用元素的做法也是外面套一层）',
    '结构差异：Shineout 的 Popover 是放在 Button 里面的子元素，自己找父元素当触发器；antd 的 Popover 要把 Button 包在里面，内容写在 content 属性里。受控 open 打开，不是真实的悬停',
  ],
});
