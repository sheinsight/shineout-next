import { defineCase } from '../../../core/define';
import { getBenchState } from '../../../core/define';

export default defineCase({
  title: '标签页 大量标签滚动',
  description: '来自 shineout 示例 tabs/07-scroll，100 个标签，超出宽度出现滚动 / 更多，点击切换到最后一个',
  scenarios: [
    {
      key: 'click-tab',
      name: '点击标签（第 1 个 ↔ 第 2 个）',
      target: (ctx) => {
        const list = ctx.queryAll(ctx.lib === 'v2' ? '.so-tabs-tab' : ctx.lib === 'v3' ? '.soui-tabs-tab' : '.ant-tabs-tab');
        const s = getBenchState() as { active: number } | undefined;
        return s?.active === 1 ? list[0] : list[1];
      },
      check: (ctx) => ctx.before?.active !== ctx.after?.active,
    },
  ],
  notes: [
    'Shineout 用 <Tabs.Panel tab=...> 子元素，antd 用 items 数组（key / label / children）；Shineout 的 shape 对应 antd 的 type，只有 line 和 card 对应，其余形状（button / fill / dash）antd 没有',
    '100 个标签放不下时（截图）：2.x 和 3.x 出现左右滚动箭头，antd 出现「···」更多按钮（把放不下的标签收进下拉列表）；三者处理溢出的方式不同。三个库都把 100 个标签全部渲染进了 DOM（实测 100 个），节点数不同：2.x 113、3.x 218、antd 215',
    '「点击切换标签」场景：点击第 1 个和第 2 个标签交替（两个标签都在可见范围内，不涉及滚动）；校验上报的激活项变了。滚到最后一个标签再点的场景没有做，因为各库的滚动 API 不同',
    '原示例是不受控，这里改成受控（active + onChange）并上报当前激活项',
    '2.x 的 Td 组件在开发模式下会在控制台报 defaultProps 的 React 警告，会让 smoke 标红但不影响渲染和数据',
  ],
});
