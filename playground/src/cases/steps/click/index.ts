import { defineCase } from '../../../core/define';
import { getBenchState } from '../../../core/define';

export default defineCase({
  title: '步骤条 点击切换',
  description: '来自 shineout 示例 steps/09-click，五步，点击切换当前步，标题按状态显示',
  scenarios: [
    {
      key: 'click-step',
      name: '点击步骤（第 1 步 ↔ 第 5 步）',
      target: (ctx) => {
        const list = ctx.queryAll(
          ctx.lib === 'v3' ? '.soui-steps-step > div' : ctx.lib === 'antd5' ? '.ant-steps-item-container' : '.ant-steps-item',
        );
        const s = getBenchState() as { current: number } | undefined;
        return s?.current === 4 ? list[0] : list[4];
      },
      check: (ctx) => ctx.before?.current !== ctx.after?.current,
    },
  ],
  notes: [
    '2.x 没有 Steps 组件，没有实现',
    'Shineout 的 Steps 用 <Steps.Step> 子元素，antd 用 items 数组；antd 6 的 description 改名 content（antd 5 还是 description）',
    '「点击步骤」场景：当前是第 5 步就点第 1 步，否则点第 5 步，每次点击都会改变当前步；校验上报的 current 确实变了，测的是点击到下一帧绘制完成的主线程占用（5 个步骤的状态、标题、连接线都要重算）',
    'Shineout 的 title 支持函数 (index, status) => 标题，antd 没有，这里 antd 在组件里按 current 自己算每一步的状态并生成标题（finish→Succeeded，process→Processing，wait→Pending），渲染结果相同，但是 Shineout 在库内部算，antd 在用例里算，用例里多一次 5 项数组生成',
    '点击的目标元素：3.x 是 .soui-steps-step 里的第一层 div，antd 5 是 .ant-steps-item-container，antd 6 是 .ant-steps-item（读 DOM 得到）',
  ],
});
