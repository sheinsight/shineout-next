import { defineCase } from '../../../core/define';

export default defineCase({
  title: '开关 基本用法',
  description: '来自 shineout 示例 switch/01-basic，单个开关，受控并带点击场景',
  scenarios: [
    {
      key: 'toggle',
      name: '点击开关（开 ↔ 关）',
      target: (ctx) =>
        ctx.query(ctx.lib === 'v2' ? '.so-checkinput-switch-container' : ctx.lib === 'v3' ? '.soui-switch-wrapper' : '.ant-switch'),
      check: (ctx) => ctx.before?.value !== ctx.after?.value,
    },
  ],
  notes: [
    '原示例是不受控的 <Switch />，为了能校验点击有没有生效，这里改成受控并上报当前值，初值关',
    '「点击开关」场景：点击开关本身，值在开/关之间切换；校验上报的值确实变了，测的是点击到下一帧绘制完成的主线程占用',
    'Shineout 的值属性是 value，antd 的是 checked（antd 5.12 起也有 value 别名，这里用 checked）；onChange 的第一个参数：Shineout 是布尔值，antd 也是布尔值（第二个参数是事件）',
    '点击的目标元素：2.x 是 label.so-checkinput-switch-container，3.x 是 .soui-switch-wrapper，antd 是 .ant-switch（读 DOM 得到，实际是否触发由 check 校验）',
  ],
});
