import { defineCase } from '../../../core/define';

export default defineCase({
  title: '面包屑 显示省略',
  description: '来自 shineout 示例 breadcrumb/06-max，max 限制最多渲染个数，超出部分显示为省略号，只测挂载',
  notes: [
    'antd 的 Breadcrumb 没有 max（折叠超出项）的属性，没有对应写法，没有实现',
    '2.x 的 Breadcrumb 也没有 max，没有实现',
  ],
});
