import { defineCase } from '../../../core/define';

export default defineCase({
  title: '多行输入 基本用法',
  description: '来自 shineout 示例 textarea/01-01-base，受控的多行输入框，带输入场景',
  scenarios: [
    {
      key: 'type',
      name: '输入文字（逐次追加一个字符）',
      target: (ctx) => ctx.query('textarea'),
      // 用原生 setter 改 value 再派发 input 事件，React 才会认为值变了；每次追加一个字符，值一直在变
      action: (el) => {
        const ta = el as HTMLTextAreaElement;
        const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!;
        setter.call(ta, ta.value + 'a');
        ta.dispatchEvent(new Event('input', { bubbles: true }));
      },
      check: (ctx) => (ctx.after?.value ?? '').length === (ctx.before?.value ?? '').length + 1,
    },
  ],
  notes: [
    '原示例是不受控 + autoFocus，为了能校验输入有没有生效，这里改成受控并上报当前值；去掉了 autoFocus（自动聚焦会让每个库在挂载时多做一次聚焦样式，且 frame 里聚焦行为不稳定）',
    '「输入文字」场景：用原生 value setter 把内容追加一个字符，再派发 input 事件（React 才会触发 onChange），每次追加一个 a；校验上报的内容长度确实加了 1。这不是真实的键盘输入（没有 keydown / keyup / 输入法组合事件），只测 onChange 到下一帧绘制的开销',
    'Shineout 的 Textarea / Input 默认 delay 是 400ms（onChange 在停止输入 400ms 后才触发，用来合并连续输入），antd 的 onChange 是同步触发的。为了让两边都测到「输入 → onChange → 重渲染」这一段，Shineout 这里显式传了 delay={0}（同步触发），这改变了库的默认行为；实际使用里 Shineout 默认是防抖的，用户感受到的输入开销会比这里测到的更小',
    'antd 的多行输入是 Input.TextArea（不是单独的 Textarea 组件）（antd 6 同名）；Shineout 的 value + onChange(value)，antd 的 value + onChange(event)，用例里取 e.target.value',
    '实测外观（挂载后，宽 666~668）：textarea 高度 2.x 92 / 3.x 96 / antd 54，字号都是 14；默认行数不同（2.x、3.x 默认更高），antd 不传 rows 默认 2 行。3.x 的 border 在 textarea 外层 wrapper 上，2.x 是 label 包 textarea，antd 是 textarea 本身带边框（没开 allowClear / showCount 时没有 affix wrapper）',
    '2.x 的 Textarea 在开发模式下可能有 React 警告，会让 smoke 标红但不影响渲染和数据',
  ],
});
