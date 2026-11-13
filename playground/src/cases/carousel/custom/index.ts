import { defineCase } from '../../../core/define';

export default defineCase({
  title: '轮播 自定义指示器',
  description: '来自 shineout 示例 carousel/04-custom，自定义指示器并带进度动画，只测挂载',
  notes: [
    'Shineout 的 indicatorType 传函数 (current, moveTo) 返回整个指示器；antd 用 customPaging 返回单个指示点，当前项靠 afterChange 自己维护，写法与结构不同，渲染结果近似',
    '指示器样式是同一份 CSS（indicator.css），来自原示例',
    '自动播放：Shineout 用 interval，antd 用 autoplay + autoplaySpeed；挂载计时内都不会切换',
  ],
});
