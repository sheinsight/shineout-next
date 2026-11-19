import { defineCase } from '../../../core/define';

export default defineCase({
  title: '穿梭框 语义化 DOM',
  description: '来自 shineout 示例 transfer/12-semantic，用 styles 定制 root / header / list / item / operations，只测挂载',
  notes: [
    '只测挂载，没有交互场景',
    '只有 3.x 和 antd 6 参与：2.x 没有 classNames / styles（读类型确认）；antd 5 的 Transfer 类型里没有 classNames / styles',
    '节点对应关系：root→root，header→header，list→list，item→item，operations→actions（antd 把中间的按钮区叫 actions）；两边的 key 含义是按名字推断的，没有逐个核对是否落在同一个 DOM 节点上',
    '原示例 defaultValue=[5, 6] 没有写 format，这里补了 format=\'id\' 以保证目标列表里确实是 id 为 5、6 的两项',
  ],
});
