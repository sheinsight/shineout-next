import { defineCase } from '../../../core/define';

export default defineCase({
  title: '树 虚拟列表',
  description: '来自 shineout 示例 tree/14-virtual，全部展开 + 虚拟列表，111100 个节点，只测挂载',
  notes: [
    '只测挂载，没有交互场景',
    '只有 3.x 和 antd 参与：2.x 的 Tree 类型里没有 virtual 属性（读类型确认），不开虚拟列表会把 11 万个节点全部渲染成 DOM，页面会卡死，没法测',
    '数据量：createNestedArray([100, 10, 10, 10]) = 100 + 1000 + 10000 + 100000 = 111100 个节点，全部展开，容器高度 300',
    '虚拟列表：Shineout 设 virtual（并给容器设高 300）；antd 的 Tree 类型里有 virtual 和 height，我的推断是要传 height 才会开虚拟滚动（没有读源码确认），所以这里传 height={300} 并显式写 virtual。smoke 里 3.x 渲染 177 个节点、antd 约 122~124 个，远小于 11 万，说明两边虚拟列表都生效了',
    '原示例的 size="small"（紧凑尺寸）antd 的 Tree 没有 size 属性（读类型确认），没迁；parentClickExpand（点击父节点文字也展开）、mode={2} 也没迁，只迁了「虚拟列表 + 全部展开 + 连线」',
    '连线：Shineout 的 line={true}，antd 的 showLine；3.x 在原示例里是显式开连线，antd 同样显式开',
    'Shineout 的 data + keygen=\'id\' + renderItem（node xxx）↔ antd 的 treeData（{ key, title, children }，title 里已拼好 node 前缀）',
  ],
});
