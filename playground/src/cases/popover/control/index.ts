import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '气泡 受控模式',
  description: '来自 shineout 示例 popover/04-controll，visible 受控；原示例里用 Switch 切换，Switch 还没迁移，这里改成用例自己的按钮控制',
  scenarios: openScenarios,
  notes: [
    '「打开」场景：用例自己的 <button data-bench=\'open\'> 同步 setOpen(true)，气泡走受控的 visible（Shineout）/ open（antd），自动测试时打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时不会自动关闭',
    '原示例的 Switch 依赖的组件还没迁移，换成了 data-bench 按钮；onVisibleChange ↔ antd 的 onOpenChange',
    '结构差异：Shineout 的 Popover 是放在 Button 里面的子元素，自己找父元素当触发器；antd 的 Popover 要把 Button 包在里面，内容写在 content 属性里。位置上 Shineout 默认 bottom-left，antd 默认 top，所以 antd 设了 placement=\'bottomLeft\'',
  ],
});
