import { defineCase } from '../../../core/define';

export default defineCase({
  title: '列表 Semantic DOM',
  description: '来自 shineout 示例 list/10-semantic，用 styles 定制 root / item / footer，只有 3.x 和 antd 6.x 参与',
  notes: [
    '2.x 没有 styles；antd 5.29 的 List 没有 classNames / styles；antd 6.7.0 的 List（已废弃）也没有，但它的替代品 Listy 有（root / item / groupHeader），所以 antd6 用 Listy',
    'Listy 没有 footer 和 bordered：原示例的 footer（Total: 5 items）和 styles.footer 在 antd6 里没有迁移，root 的边框用 styles.root 自己加',
    'Listy 的 virtual 默认是 false，这里没开，渲染的是普通列表，不是虚拟滚动',
  ],
});
