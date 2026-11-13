import { defineCase } from '../../../core/define';

export default defineCase({
  title: '轮播 初始位置',
  description: '来自 shineout 示例 carousel/06-default-value，defaultValue 设置起始索引，只测挂载',
  notes: [
    '原示例用 GitHub 上的远程图片，这里换成内联的 data URI（渐变 SVG），避免网络加载混进计时，四个库用同一份（_shared/slides.tsx）',
    '2.x 的 Carousel 没有 defaultValue，没有实现',
    'antd 用 initialSlide 对应',
  ],
});
