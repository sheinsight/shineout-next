import { defineCase } from '../../../core/define';

export default defineCase({
  title: '树选择 语义化 DOM',
  description: '来自 shineout 示例 tree-select/13-semantic，用 styles 定制 root / header / popup / list / option',
  notes: [
    '只测挂载，没有交互场景（打开下拉的场景只放在 base、multiple、virtual 里）',
    '只有 3.x 和 antd 6 参与：2.x 没有 classNames / styles（读类型确认）；antd 5 的 TreeSelect 只有 classNames.root 一个语义 key（读类型确认），对不上 header / popup / list / option，所以不参与',
    '节点对应关系只是按名字推断的，没有逐个核对是否落在同一个 DOM 节点：root→root，popup→popup.root，option→popup.item（antd 把下拉里的节点叫 item）；header（Shineout 弹层头部）、list（列表容器）在 antd 6 里没有明确对应的 key，这两项只在 Shineout 里设置，antd 里没设',
    '弹层样式（popup / list / option / header）只有打开下拉才会渲染，挂载时下拉是关的，所以样式的开销没有测到；只有 root 的样式在挂载时生效',
    '打开下拉后看了 3.x 和 antd 6 的截图：3.x 的 root 边框（2px 蓝）、header 背景（浅蓝）生效；antd 6 的 root 边框生效，popup / item 圆角肉眼看不出差别（4px 本来就小）。原示例没设宽度，3.x 的 TreeSelect 默认撑满容器（截图确认），所以 antd 设成 width: 100% 对齐。原示例数据是 { id, name } 的地区树（Asia / Europe），这里沿用',
  ],
});
