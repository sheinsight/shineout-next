import { defineCase } from '../../../core/define';

export default defineCase({
  title: '轮播 切换方向',
  description: '来自 shineout 示例 carousel/03-animation，slide / slide-y / fade，只测挂载',
  notes: [
    '原示例用 GitHub 上的远程图片，这里换成内联的 data URI（渐变 SVG），避免网络加载混进计时，四个库用同一份（_shared/slides.tsx）',
    '自动播放：Shineout 用 interval，antd 用 autoplay + autoplaySpeed；挂载计时内都不会切换',
    'antd 的横向滑动叫 scrollx，纵向用 vertical，fade 一致；对应关系：slide→scrollx，slide-y→vertical，fade→fade',
    '选择器用的是各库自己的 Radio.Group，也计入挂载耗时',
  ],
});
