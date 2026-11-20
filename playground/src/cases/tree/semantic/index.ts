import { defineCase } from '../../../core/define';

export default defineCase({
  title: '树 语义化 DOM',
  description: '来自 shineout 示例 tree/17-semantic，用 styles 定制 root / node / content / icon，只测挂载',
  notes: [
    '只有 3.x 和 antd 6 参与：2.x 没有 classNames / styles（读类型确认）；antd 5 的 Tree 类型里没有 classNames / styles',
    '节点对应关系是按名字推断的，没有逐个核对是否落在同一个 DOM 节点：root→root，node→item，content→itemTitle，icon→itemSwitcher（antd 6 的 Tree 有 root / item / itemIcon / itemTitle / itemSwitcher 5 个 key）',
    '原示例的数据是 { id, name } 的树（含一个叶子根节点 Node 3），全部展开，沿用',
    '连线：Shineout 的 Tree 默认带连线，antd 默认没有，按各库默认渲染，没有统一',
  ],
});
