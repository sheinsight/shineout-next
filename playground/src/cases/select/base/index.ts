import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '选择器 基本用法',
  description: '来自 shineout 示例 select/01-01-base，单选，可清除，8 个颜色',
  scenarios: openScenarios('red'),
  notes: [
    '「打开」场景：关闭状态下下拉层没有选项（2.x 用 renderPending 延迟渲染；3.x、antd 也是点开才渲染选项），所以挂载测不到下拉本身。场景里 2.x 和 antd 是对 Select 自带的触发器做完整的 pointerdown → click，同步打开；3.x 的 Select 在 setTimeout 里才更新状态，下拉比点击晚一个任务出现，场景的计时会在下拉渲染出来之前结束，所以 3.x 用用例自己的 <button data-bench=open> 设置受控的 open，测的是「下拉渲染出来」的开销，不含 3.x 自带触发器的路径。每次测量后往页面空白处点一下关闭，等选项不可见再测下一次。实测（10 万项的 bigdata 用例）四个库关闭后弹层都还留在 DOM 里（10 个可视项，只是不可见），所以「再次打开」只是切换显示，比「第一次打开」小很多（base 里约 3ms vs 12~27ms）；两种场景要分开看',
    'Shineout 的 data + keygen（+ renderItem）↔ antd 的 options（{ value, label }）；clearable ↔ allowClear；width={300} ↔ style.width',
    '2.x 的 keygen 不支持 true（写成函数 (c) => c），3.x 写 true',
    '2.x 的下拉在 onCollapse 里受控时点不开（我试过受控 open + onCollapse(c) => setOpen(c)，下拉里一直是 Data not found，原因是 renderPending 在受控下不重置），所以 2.x 不用受控 open，直接触发自带触发器',
  ],
});
