import { defineCase } from '../../../core/define';

export default defineCase({
  title: '卡片 基本用法',
  description: '来自 shineout 示例 card/01-base，标题、正文、页脚，只测挂载',
  notes: [
    '结构不同：Shineout 用 Card.Header / Body / Footer 组合，2.x 没有 extra 和 split；antd 用 title / extra / actions 属性，页脚对应 actions，actions 在 antd 里会按列均分并有自己的分割线，结构不完全等价',
    'Text Button：Shineout 是文字按钮，antd 对应 variant="text" 的按钮（映射见 button/_shared/antd-map.ts）',
    '页脚图标：原示例是很长的 svg 路径，这里换成简单的内联 svg（_shared/content.tsx），四个库用同一份',
  ],
});
