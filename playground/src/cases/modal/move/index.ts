import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '弹窗 可拖动和缩放',
  description: '来自 shineout 示例 modal/08-move，moveable + resizable，只有 2.x 和 3.x 参与',
  scenarios: openScenarios,
  notes: [
    '「点击打开」场景：自动测试时弹窗打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时弹窗不会自动关闭',
    'antd 的 Modal 没有 moveable / resizable（官方示例是用 modalRender 自己接 react-draggable，不是内置功能），所以只有 2.x 和 3.x 参与',
    'moveable 会给弹窗标题加拖动事件监听，resizable 会加缩放把手，这是比 base 多出来的开销',
  ],
});
