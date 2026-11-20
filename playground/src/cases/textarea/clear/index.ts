import { defineCase } from '../../../core/define';

export default defineCase({
  title: '多行输入 清除',
  description: '来自 shineout 示例 textarea/08-clearable，带清除按钮，初始有内容，点击清除，带点击场景',
  scenarios: [
    {
      key: 'clear',
      name: '点击清除按钮',
      target: (ctx) => ctx.query(ctx.lib === 'v3' ? '.soui-textarea-clear' : '.ant-input-clear-icon'),
      check: (ctx) => ctx.before?.value !== '' && ctx.after?.value === '',
      // 清除后内容是空的，再点就没有清除按钮了。每次测量之后点用例里的 refill 按钮把内容写回去，并等清除按钮重新出现
      settleUntil: (ctx) => {
        // antd 的清除按钮在内容清空后不会从 DOM 移除，只是加 hidden 类，所以按「内容是否为空」判断，不按按钮是否存在
        const ta = ctx.query<HTMLTextAreaElement>('textarea');
        if (ta && ta.value === '') ctx.byBench('refill')?.click();
        return !!ta && ta.value !== '';
      },
    },
  ],
  notes: [
    '2.x 没有 clearable（读类型确认），没有实现；3.x 的 clearable 对应 antd 的 allowClear；原示例的 showClear（始终显示清除按钮）antd 没有对应，没迁',
    '原示例是不受控、初始为空（清除按钮在没有内容时不显示），这里改成受控、初始有内容，并加一个 <button data-bench=refill> 把内容写回去；否则清除按钮不出现，没法测点击。所以和原示例的区别是「初始有内容」，并多了一个测试用的按钮',
    '「点击清除按钮」场景：点击清除按钮后内容变空；每次测量之后场景自己点 refill 按钮把内容写回去（settleUntil 里完成，不计入测量），再等内容恢复；校验点击前有内容、点击后为空',
    '点击的目标元素：3.x 是 .soui-textarea-clear，antd 是 .ant-input-clear-icon（读 DOM 得到）；3.x 清空后清除按钮会从 DOM 移除，antd 只加 hidden 类不移除（实测），所以每次测量后用「文本框是否为空」来判断要不要 refill',
    'Shineout 的 Textarea / Input 默认 delay 是 400ms（onChange 在停止输入 400ms 后才触发，用来合并连续输入），antd 的 onChange 是同步触发的。为了让两边都测到「清除 → onChange → 重渲染」这一段，Shineout 这里显式传了 delay={0}（同步触发），这改变了库的默认行为；实际使用里 Shineout 默认是防抖的，用户感受到的输入开销会比这里测到的更小',
    'antd 的多行输入是 Input.TextArea（不是单独的 Textarea 组件）',
  ],
});
