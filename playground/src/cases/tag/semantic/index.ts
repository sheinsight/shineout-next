import { defineCase } from '../../../core/define';

export default defineCase({
  title: '标签 语义化 DOM',
  description: '来自 shineout 示例 tag/s-009-semantic 的前三个标签（root / wrapper / closeIcon 样式），只测挂载',
  notes: [
    '只有 3.x 和 antd 6 参与：2.x 没有 classNames / styles；antd 5 的 Tag 没有语义化 styles（读类型确认）',
    '节点对应关系（读类型得到）：Shineout 的 root / wrapper / closeIcon 对应 antd 6 的 root / content / close；antd 6 另有 icon',
    '原示例第 2 个标签带 shape=rounded，antd 没有对应属性（只能用 style.borderRadius），这里没迁 shape，只保留 root 的 2px 绿色描边',
    'antd 里 closable 的关闭图标默认比 3.x 大（截图：antd 的 Close Style 关闭图标 fontSize 14 看起来明显更大，另一个未设置的图标很小），3.x 两个关闭图标的大小相近；All Slots 里 root 的 borderRadius:4，antd 的默认标签圆角就是 4，几乎看不出区别',
    '原示例的颜色 color=info/success/warning/danger，antd 对应 processing / success / warning / error',
    '2.x 的 Tag 在开发模式下可能有 React 警告，会让 smoke 标红但不影响渲染和数据',
  ],
});
