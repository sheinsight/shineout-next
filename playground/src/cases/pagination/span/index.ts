import { defineCase } from '../../../core/define';

export default defineCase({
  title: '分页 页码跨度',
  description: '来自 shineout 示例 pagination/007-span，span=5 和 span=10 控制当前页前后显示的页码个数',
  notes: [
    'antd 没有 span，页码个数由固定规则决定，所以这个用例里 antd 的两个分页和 span 无关，页码按钮个数与 Shineout 不同，DOM 节点数也不同，不是对 span 的对比',
  ],
});
