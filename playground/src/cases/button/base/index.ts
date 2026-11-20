import { defineCase } from '../../../core/define';

export default defineCase({
  title: '按钮 基本用法',
  description: '来自 shineout 示例 button/s-001-base，五种类型，只测挂载',
  notes: [
    'antd 没有 secondary / warning / success 类型，用 color + variant 近似（_shared/antd-map.ts：default 和 secondary 的实心按钮对应灰底 filled，warning 对应 orange，success 对应 green），色调与 Shineout 不完全相同',
    '2.x 没有 dashed（虚框）按钮，只渲染其余四个，按钮数量比其它库少一个',
    'Shineout 的 outline / dashed / text 对应 mode 属性；2.x 对应 outline / text 布尔属性；antd 对应 variant',
  ],
});
