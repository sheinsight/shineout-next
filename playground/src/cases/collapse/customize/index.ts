import { defineCase } from '../../../core/define';

export default defineCase({
  title: '折叠面板 自定义样式',
  description: '来自 shineout 示例 collapse/05-customize，自定义折叠图标、标题背景、内容背景，只测挂载',
  notes: [
    '2.x 没有 Collapse 组件，不参与',
    '折叠图标：Shineout 传一个节点，antd 传函数且不会自动旋转，这里展开时手动转 90 度',
    '原示例的图标是很长的 svg 路径，这里换成简单的内联 svg，三个库用同一份',
    'Shineout 的 style / contentStyle ↔ antd items 的 style / styles.body',
  ],
});
