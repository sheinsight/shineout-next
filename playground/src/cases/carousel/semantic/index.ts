import { defineCase } from '../../../core/define';

export default defineCase({
  title: '轮播 Semantic DOM',
  description: '来自 shineout 示例 carousel/07-semantic，用 classNames / styles 定制内部节点，只测挂载',
  notes: [
    '2.x 和 antd 的 Carousel 都没有 classNames / styles，没有实现；antd 只有 className / rootClassName / style，不能定制内部节点（基于 react-slick）',
    '原示例的幻灯片文案较长，这里精简为 Slide 1/2/3，内容不影响挂载计时',
  ],
});
