import { defineCase } from '../../../core/define';

export default defineCase({
  title: '列表 固定高度虚拟滚动',
  description: '来自 shineout 示例 list/02-fixed，10000 条数据、固定高度 300、两列，只测挂载',
  notes: [
    '这是 List 虚拟滚动的核心用例：Shineout 的 fixed + height 只渲染可视区域。antd 6.7.0 的 List 已废弃（控制台会警告），官方推荐的替代品是 Listy（带虚拟滚动，height=300、virtual），所以 antd6 用 Listy；antd 5.29 没有 Listy，只能用 List，没有虚拟滚动，10000 条全部进 DOM（实测 antd5 渲染 70005 个节点，Shineout 约 110 个）',
    '头像：原示例用 Avatar，2.x 没有 Avatar，统一换成圆形 div',
    'colNum=2：antd5 用 List 的 grid.column=2；antd6 的 Listy 是单列，把相邻两条合成一行（5000 行 x 每行 2 个单元格）来模拟，行高 54，列间距、内边距没有做到和 Shineout 一致',
    '截图确认的视觉差异：antd5 的两列行距明显小于 54（List.Item 的 style 高度没有撑开 grid 单元格），两列之间也几乎没有间距；2.x 的滚动条常驻显示，3.x 没有；这些外观差异不影响挂载开销对比，但不能当作像素一致',
  ],
});
