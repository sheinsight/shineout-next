import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '弹窗 基础用法',
  description: '来自 shineout 示例 modal/01-base，点击按钮打开带标题和底部按钮的弹窗；挂载时弹窗关闭，打开的开销由「点击打开」场景测量',
  scenarios: openScenarios,
  notes: [
    '「点击打开」场景：自动测试时弹窗打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时弹窗不会自动关闭',
    'visible ↔ antd 的 open；onClose ↔ onCancel；footer 数组 ↔ antd 的 footer 节点',
    '原示例每次关闭后 content+1，这里去掉了，内容固定',
    '关闭后：2.x 的弹窗 DOM 保留（display: none），3.x 和 antd 在动画结束后卸载内容（探测所得），所以「再次打开」里 2.x 不用重新创建节点，3.x 和 antd 要重新创建',
  ],
});
