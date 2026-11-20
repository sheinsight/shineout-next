import { defineCase } from '../../../core/define';

export default defineCase({
  title: '菜单 基本用法',
  description: '来自 shineout 示例 menu/01-base，内联菜单：两个有子菜单的一级项加一个超长标题，只测挂载',
  notes: [
    'data（{ id, title, children }）+ keygen + renderItem ↔ antd 的 items（{ key, label, children }）；active 函数 + onClick ↔ selectedKeys + onClick({ key })',
    '2.x 没有 inlineAnimate（Props 里没有），所以 2.x 没传；3.x 开了',
    '折叠的子菜单是否进 DOM（实测）：2.x 会把子项渲染进 DOM 只是隐藏（Option 1 有 2 个节点、都不可见），3.x 和 antd 默认都不渲染。所以 2.x 的节点数（50）明显比 3.x（36）、antd（16）多，这部分差异来自折叠子项是否渲染，不是单纯的组件开销',
    '超长标题（实测）：3.x 折行（white-space: pre-wrap，高 44），antd 单行省略（nowrap + ellipsis，高 40），2.x 是 normal + clip（高 28），三者表现不同；截图确认 3.x 折成两行，antd 末尾显示省略号',
  ],
});
