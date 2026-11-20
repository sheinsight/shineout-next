import { defineCase } from '../../../core/define';

export default defineCase({
  title: '级联选择 多选',
  description: '来自 shineout 示例 cascader/03-multiple 的三种 mode，只测挂载',
  notes: [
    'mode 对应：Shineout mode=0（返回完全选中的父节点）↔ antd 默认；mode=2 ↔ showCheckedStrategy=SHOW_CHILD；mode=4 ↔ checkStrictly（父子不联动）',
    'antd 5.29.3 依赖的 rc-cascader 3.34.0 没有 checkStrictly，antd5 只渲染前两种；antd 6 三种都渲染，所以 antd5 的节点数会少一块',
    '原示例中的 hideTag、compressed 变体没有 antd 对应，没有迁移',
  ],
});
