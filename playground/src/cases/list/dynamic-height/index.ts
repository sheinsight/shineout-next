import { defineCase } from '../../../core/define';

export default defineCase({
  title: '列表 动态高度虚拟滚动',
  description: '来自 shineout 示例 list/09-dynamic-height，1000 条高度不一的数据，固定高度 400，只测挂载',
  notes: [
    '2.x 的 List 没有 dynamicHeight 属性（Props 里没有），所以没有 2.x',
    'antd 6.7.0 用 Listy（带虚拟滚动，height=400）；antd 5.29 没有 Listy，只能用没有虚拟滚动的 List，1000 条全部渲染（实测 3005 个节点），所以 antd5 和另外三个库不是同一量级的对比',
    '截图确认的视觉差异：3.x 的条目比 antd 多了左右缩进，条目底部分割线比容器窄；antd 的分割线贯穿整行。没有查明原因（可能是 List 默认的 item 内边距），不影响挂载开销对比',
    '原示例每条内容的长度用 Math.random 决定，这里改成按 id 取模，每次渲染一致',
  ],
});
