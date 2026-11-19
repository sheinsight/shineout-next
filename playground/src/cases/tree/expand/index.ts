import { defineCase } from '../../../core/define';
import { expandAllScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '树 展开与收起',
  description: '来自 shineout 示例 tree/04-01-expand，受控展开，带「全部展开」场景，数据量放大到 1110 个节点',
  scenarios: expandAllScenarios,
  notes: [
    '数据量：原示例是 createNestedArray([2, 2, 2])（14 个节点），太小测不出差别，这里放大到 [10, 10, 10]（10 + 100 + 1000 = 1110 个节点），节点 id 形如 0、0-1、0-1-2。这是有意偏离原示例',
    '「全部展开」场景：点用例自己的 <button data-bench=expand-all>，把全部 1110 个节点设为展开，校验展开数 0 → 大于 0；自动测试里 400ms 后自动收起。测的是点击到下一帧绘制完成的主线程占用',
    '原示例有「全部展开 / 全部收起」两个按钮，这里只放「全部展开」，且用原生 button，没有用各库的 Button（避免带进 Button 的开销）',
    'Shineout 不开虚拟列表（原示例没开），所以 1110 个节点全部渲染成 DOM；antd 的 Tree 类型里有 virtual 和 height 两个属性，我的推断是只有传了 height 才会开虚拟滚动（来自对 rc-tree 的印象，没有读源码确认），这里没传 height；smoke 的节点数（antd 约 91，Shineout 约 74~95）说明两边都没有把 1110 个节点全渲染出来，因为默认只展开了根节点，点「全部展开」之后才展开，渲染数量没有在场景里核对',
    'Shineout 的 line={false} ↔ antd 默认无连线；展开状态：Shineout 的 expanded + onExpand ↔ antd 的 expandedKeys + onExpand',
    'Shineout 的 data + keygen=\'id\' + renderItem（node xxx）↔ antd 的 treeData（{ key, title, children }，title 里已拼好 node 前缀）',
  ],
});
