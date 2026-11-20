import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '抽屉 基础用法',
  description: '来自 shineout 示例 drawer/01-base，点击按钮打开带标题和底部按钮的抽屉；挂载时抽屉关闭，打开的开销由「点击打开」场景测量',
  notes: [
    '宽度：Shineout 的 width={400} ↔ antd6 的 size={400}（antd6 里 width 已弃用）；antd5 仍用 width；visible ↔ open',
    '「点击打开」场景：自动测试时抽屉打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，所以每次测的都是「从关闭到打开」',
    '「第一次打开」只测一次，包含内容首次渲染；之后的「再次打开」里抽屉内容已经渲染过（Shineout 和 antd 关闭后默认都不销毁内容），测的主要是显示动画与重渲染',
    '手动查看时抽屉不会自动关闭',
  ],
  scenarios: openScenarios,
});
