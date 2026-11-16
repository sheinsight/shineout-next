import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '气泡 基础用法',
  description: '来自 shineout 示例 popover/01-base，悬停触发的最简单气泡',
  scenarios: openScenarios,
  notes: [
    '「打开」场景：用例自己的 <button data-bench=\'open\'> 同步 setOpen(true)，气泡走受控的 visible（Shineout）/ open（antd），自动测试时打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时不会自动关闭',
    '不测各库自带的悬停 / 点击触发路径：3.x 的 usePopup 在 setTimeout 里才更新状态，气泡比触发晚一个任务出现，场景的计时会在气泡渲染出来之前结束，所以只测「气泡渲染出来」的开销（实测：合成 mouseover 后 2.x / 3.x 约 28ms 出现，antd 默认有 100ms 的 mouseEnterDelay，约 160ms）',
    '结构差异：Shineout 的 Popover 是放在 Button 里面的子元素，自己找父元素当触发器；antd 的 Popover 要把 Button 包在里面，内容写在 content 属性里。位置上 Shineout 默认 bottom-left，antd 默认 top，所以 antd 设了 placement=\'bottomLeft\'',
  ],
});
