import { defineCase } from '../../../core/define';

export default defineCase({
  title: '标签 关闭',
  description: '来自 shineout 示例 tag/s-005-dynamic 的删除部分，一组可关闭的标签，点击第 1 个的关闭按钮，带点击场景',
  scenarios: [
    {
      key: 'close-tag',
      name: '点击关闭第 1 个标签',
      target: (ctx) =>
        ctx.query(ctx.lib === 'v2' ? '.so-tag-close-icon' : ctx.lib === 'v3' ? '.soui-tag-close-icon' : '.ant-tag-close-icon'),
      check: (ctx) => ctx.after?.count === (ctx.before?.count ?? 0) - 1,
    },
  ],
  notes: [
    '原示例 s-005-dynamic 还有「Add Tag」（输入框新增标签）和禁用某个标签；这里只迁删除，新增依赖 Tag.Input，antd 没有对应（要自己用 Input 写），没迁',
    '原示例 3 个标签，这里 50 个（让每次点击都能真正删除一个，并有足够的重渲染量）；每次点击删掉第 1 个，实测连续点 4 次四个库都是 50→49→48→47→46，场景执行的次数远少于 50，不会删光',
    '「点击关闭第 1 个标签」场景：点击第 1 个标签的关闭图标，列表少 1 个；校验上报的标签个数确实减 1',
    'Shineout 的 onClose 是函数；antd 的 closable + onClose 回调，antd 默认点关闭会自己隐藏该标签（内部状态），这里在 onClose 里 preventDefault 并改外部列表，保持和 Shineout 一样由外部列表控制',
    'DOM 不同：2.x 的关闭按钮是 .so-tag-close-icon，3.x 是 .soui-tag-close-icon，antd 是 .ant-tag-close-icon（读 DOM 得到）',
    '2.x 的 Tag 在开发模式下可能有 React 警告，会让 smoke 标红但不影响渲染和数据',
  ],
});
