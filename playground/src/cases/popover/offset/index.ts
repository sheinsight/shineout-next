import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '气泡 调节偏移',
  description: '来自 shineout 示例 popover/13-offset，popupGap={12} 调节与触发元素的距离，只有 3.x 与 antd 参与',
  scenarios: openScenarios,
  notes: [
    '2.x 的 Props.d.ts 里没有 popupGap，不参与',
    '「打开」场景：用例自己的 <button data-bench=\'open\'> 同步 setOpen(true)，气泡走受控的 visible（Shineout）/ open（antd），自动测试时打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时不会自动关闭',
    'popupGap ↔ antd 的 align={{ offset: [0, 12] }}。两者的基准间距不同：Shineout 文档写不带箭头默认 4px 再加 popupGap；antd 的 offset 叠加在自己的默认间距上。从截图目测，3.x 按钮底到气泡顶约 15px，antd 约 12px（目测，不是脚本量的），所以最终间距不完全一样',
    '结构差异：Shineout 的 Popover 是放在 Button 里面的子元素，自己找父元素当触发器；antd 的 Popover 要把 Button 包在里面，内容写在 content 属性里。位置上 Shineout 默认 bottom-left，antd 默认 top，所以 antd 设了 placement=\'bottomLeft\'',
  ],
});
