import { defineCase } from '../../../core/define';

export default defineCase({
  title: '面包屑 Semantic DOM',
  description: '来自 shineout 示例 breadcrumb/07-semantic，用 classNames / styles 定制内部节点，只测挂载',
  notes: [
    '2.x 和 antd 5.x 的 Breadcrumb 没有 classNames / styles，没有实现',
    'Shineout 有 root / item / separator / content / dropdown / dropdownItem 六个节点，antd 6 只有 root / item / separator 三个，所以 antd 只实现了这三个节点相关的部分，content / dropdown / dropdownItem 没有对应，也不是同样的内容',
    '示例里第三个用到 max，antd 没有，这一项没有实现',
  ],
});
