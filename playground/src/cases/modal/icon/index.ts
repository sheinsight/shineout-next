import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '弹窗 图标类型',
  description: '来自 shineout 示例 modal/11-icon，type=success 在标题前显示成功图标',
  scenarios: openScenarios,
  notes: [
    '「点击打开」场景：自动测试时弹窗打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时弹窗不会自动关闭',
    'antd 的 Modal 没有 type 属性（静态方法 Modal.success 才带图标），这里的 antd 弹窗没有图标，这个用例里 Shineout 多渲染了一个图标 SVG，antd 没有，对比时要考虑',
    '原示例用 Radio.Group 切换 type（Radio 还没迁移），这里固定为 success',
  ],
});
