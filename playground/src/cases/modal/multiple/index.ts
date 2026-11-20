import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '弹窗 多层嵌套',
  description: '来自 shineout 示例 modal/09-multiple，一个按钮打开第 1 层弹窗，弹窗里可以继续打开下一层',
  scenarios: openScenarios,
  notes: [
    '「点击打开」场景：自动测试时弹窗打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时弹窗不会自动关闭',
    '原示例有 10 层、宽度用 Math.random；这里固定为 3 层、固定宽度，每次渲染一致。场景只打开第 1 层（其余层由弹窗里的按钮打开，没有写场景），所以挂载时 3 个 Modal 都已创建（关闭态），打开只会激活第 1 层',
    '「3 个 Modal 同时存在」的挂载开销：Shineout 的 Modal 关闭后保留 DOM（2.x）还是不渲染（3.x、antd），决定了挂载节点数的差别',
  ],
});
