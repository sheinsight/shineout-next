import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '选择器 大数据',
  description: '来自 shineout 示例 select/04-bigdata 的第一个（静态行高），10 万项，带过滤',
  scenarios: openScenarios('标签 0'),
  notes: [
    '「打开」场景：关闭状态下下拉层没有选项（2.x 用 renderPending 延迟渲染；3.x、antd 也是点开才渲染选项），所以挂载测不到下拉本身。场景里 2.x 和 antd 是对 Select 自带的触发器做完整的 pointerdown → click，同步打开；3.x 的 Select 在 setTimeout 里才更新状态，下拉比点击晚一个任务出现，场景的计时会在下拉渲染出来之前结束，所以 3.x 用用例自己的 <button data-bench=open> 设置受控的 open，测的是「下拉渲染出来」的开销，不含 3.x 自带触发器的路径。每次测量后往页面空白处点一下关闭，等选项不可见再测下一次。实测（10 万项的 bigdata 用例）四个库关闭后弹层都还留在 DOM 里（10 个可视项，只是不可见），所以「再次打开」只是切换显示，比「第一次打开」小很多（base 里约 3ms vs 12~27ms）；两种场景要分开看',
    'Shineout 的 data + keygen（+ renderItem）↔ antd 的 options（{ value, label }）；clearable ↔ allowClear；width={300} ↔ style.width',
    '原示例里 10 万项的 height 是随机的（用于第二个 Select 的动态行高），这里去掉随机，只保留第一个 Select（静态行高）；第二个动态行高（lineHeight="auto"）antd 没有对应，没迁',
    '原示例每次加载生成随机数据，这里数据确定（id-0 … id-99999，标签 0 … 标签 99999）',
    '虚拟列表（实测）：打开后四个库的 DOM 里都只有 10 个选项（标签 0 … 标签 9），都是虚拟滚动；antd 的下拉里还有两个隐藏的 id-0、id-1 节点（aria 用的），2.x 和 3.x 没有。截图确认 2.x 和 antd 都显示滚动条、可视约 7~8 项',
    '2.x 的 onFilter 类型是 (text, from) => void（Props.d.ts 里读到的），不是 3.x 那种返回过滤函数的写法，所以 2.x 这里给了一个空函数让 Select 进入过滤模式（输入框变成可输入），不做实际过滤；3.x 和 antd 的过滤函数只有输入文字才会触发，这个用例没有输入，所以过滤函数没执行',
  ],
});
