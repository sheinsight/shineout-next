import { defineCase } from '../../../core/define';

export default defineCase({
  title: '流光边框 自定义容器',
  description: '来自 shineout 示例 border-beam/03-custom-container，透传 ref 的自定义组件，只测挂载',
  notes: [
    'BorderBeam 是 Shineout 3.x 新增的组件，2.x、antd 5、antd 6 都没有对应组件，这个用例只有 3.x，没有横向对比数据，只用于 3.x 自身的优化前后对比',
  ],
});
