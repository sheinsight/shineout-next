import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '弹窗 指定容器',
  description: '来自 shineout 示例 modal/06-container，弹窗渲染到指定的元素（按钮所在的 div）里',
  scenarios: openScenarios,
  notes: [
    '「点击打开」场景：自动测试时弹窗打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时弹窗不会自动关闭',
    'container ↔ antd 的 getContainer（函数形式）；原示例的 containerClassName（给容器加类名）antd 没有对应，没有迁移',
    '2.x 的 container 类型是函数或元素；传元素时 wrapperRef.current 在第一次渲染时是 null，所以第一次挂在 body，之后重渲染才指向容器，行为以实测为准，没有逐个核对',
  ],
});
