import { defineCase } from '../../../core/define';

export default defineCase({
  title: '多行输入 自适应高度',
  description: '来自 shineout 示例 textarea/03-autosize，随内容增长高度、上限 150px，带输入多行场景',
  scenarios: [
    {
      key: 'grow',
      name: '输入多行内容，触发自适应高度',
      target: (ctx) => ctx.query('textarea'),
      // 每次追加一行（换行 + 文字），高度随内容增长，直到 maxHeight 150；到上限后高度不再变，所以检验的是「内容变了」而不是「高度变了」
      action: (el) => {
        const ta = el as HTMLTextAreaElement;
        const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!;
        setter.call(ta, ta.value + 'line\n');
        ta.dispatchEvent(new Event('input', { bubbles: true }));
      },
      check: (ctx) => (ctx.after?.value ?? '').length === (ctx.before?.value ?? '').length + 5,
    },
  ],
  notes: [
    '原示例是不受控，这里改成受控并上报内容，用来校验输入有效',
    '「输入多行内容」场景：每次追加 `line\\n`（一行 + 换行），内容变长，自适应高度需要重新计算；测的是 onChange 到下一帧绘制的开销（含高度计算）。高度到 150px 上限后不再变化，场景执行次数很少（1 次预热 + 3 次测量），不会超过上限，所以每次都会触发高度变化',
    'Shineout 的 autosize + maxHeight={150} + rows={2} 对应 antd 的 autoSize={{ minRows: 2, maxHeight... }}：antd 的 autoSize 只有 minRows / maxRows，没有 maxHeight，这里按行高估算：maxRows=6（150px / 约 24px）——是近似，没有量过 antd 的行高，高度上限可能不是 150px',
    'resize（可拖拽调整大小）：Shineout 的 resize 属性；antd 没有同名属性，textarea 默认可调整大小（浏览器默认），antd 用 style.resize 控制，这里没有设置',
    'Shineout 的 Textarea / Input 默认 delay 是 400ms（onChange 在停止输入 400ms 后才触发，用来合并连续输入），antd 的 onChange 是同步触发的。为了让两边都测到「输入 → onChange → 重渲染」这一段，Shineout 这里显式传了 delay={0}（同步触发），这改变了库的默认行为；实际使用里 Shineout 默认是防抖的，用户感受到的输入开销会比这里测到的更小',
    'antd 的多行输入是 Input.TextArea（不是单独的 Textarea 组件）',
    '2.x 的 Textarea 在开发模式下可能有 React 警告，会让 smoke 标红但不影响渲染和数据',
  ],
});
