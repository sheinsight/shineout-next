import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '弹窗 Semantic DOM',
  description: '来自 shineout 示例 modal/16-semantic，用 classNames / styles 定制 root / mask / header / body / footer / close，只有 3.x 和 antd 6.x 参与',
  scenarios: openScenarios,
  notes: [
    '「点击打开」场景：自动测试时弹窗打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时弹窗不会自动关闭',
    '2.x 没有 classNames / styles；antd 5.29 的 Modal 的 classNames / styles 只有 header / body / footer / mask / content / wrapper，没有 root / close，所以只有 3.x 和 antd 6.x',
    '原示例的 root 是函数式 classNames（根据 visible 状态设类名），antd 写成了静态字符串，其余 5 个 key 两边同名',
  ],
});
