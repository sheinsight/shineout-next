import { defineCase } from '../../../core/define';

export default defineCase({
  title: '级联选择 大数据',
  description: '来自 shineout 示例 cascader/virtual，3 层，每层 50 个，共约 13 万个节点，只测挂载',
  notes: [
    'antd 的 Cascader 没有 virtual 开关，而 3.x 传了 virtual；2.x 也没有这个属性，因此三个库的实现并不完全等价',
    '下拉层不展开时，三个库实际渲染的都只有输入框，主要对比的是处理大数据的初始化开销（如遍历、构建 map），不含虚拟列表滚动',
  ],
});
