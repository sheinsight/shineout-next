import { defineCase } from '../../../core/define';

export default defineCase({
  title: '面包屑 自定义图标',
  description: '来自 shineout 示例 breadcrumb/03-icon，带图标的面包屑，只测挂载',
  notes: [
    'Shineout 有 icon 字段；antd 没有 icon 字段，第一排用 title 里放图标 + 文字的写法对应，结构不完全等价',
    '第二排两边都是 title 里直接放 ReactNode，写法一致',
  ],
});
