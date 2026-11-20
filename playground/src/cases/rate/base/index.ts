import { defineCase } from '../../../core/define';
import { getBenchState } from '../../../core/define';

interface State { value: number }

const stars = (ctx: { lib: string; queryAll: <T extends Element>(s: string) => T[] }) =>
  ctx.queryAll(
    ctx.lib === 'v2' ? '.so-rate-front > span' : ctx.lib === 'v3' ? '.soui-rate-item-front' : '.ant-rate-star [role="radio"]',
  );

export default defineCase<State>({
  title: '评分 基本用法',
  description: '来自 shineout 示例 rate/01-base，五颗星；这里改成受控并带点击场景',
  scenarios: [
    {
      key: 'click',
      name: '点击星星（第 1 颗 ↔ 第 5 颗）',
      // 当前是 5 就点第 1 颗，否则点第 5 颗，保证每次点击都会改变值
      target: (ctx) => {
        const list = stars(ctx);
        const s = getBenchState() as State | undefined;
        return s?.value === 5 ? list[0] : list[4];
      },
      check: (ctx) => ctx.before.value !== ctx.after.value,
    },
  ],
  notes: [
    '原示例是不受控的 <StarRate />，没有值。为了能测点击，这里改成受控（初始值 3），并上报当前值；所以这个用例和原示例的区别是「初始有 3 颗星」',
    '「点击星星」场景：当前值是 5 就点第 1 颗，否则点第 5 颗，每次点击都会改变值；校验上报的值确实变了，测的是点击到下一帧绘制完成的主线程占用',
    'Shineout 的 Rate 是工厂函数：Rate(背景图标, 前景图标) 返回一个组件，图标写在工厂里；antd 的 Rate 是普通组件，图标用 character 属性。示例里的星星 SVG 只有 viewBox 没有宽高：Shineout 的样式会撑开它，antd 不会（实测 antd 下是 0×0），所以 antd 用的图标统一补了 width/height=1em（_shared/icons.tsx 的 sized）；星星图标两边用同一个 SVG（_shared/icons.tsx），size 都没设，各用自己的默认大小',
    '点击的目标元素：2.x 是 .so-rate-front 下的 span，3.x 是 .soui-rate-item-front，antd 是 .ant-rate-star 里的 role=radio；是否真的触发了各库自己的 onClick，由 check（值真的变了）验证',
  ],
});
