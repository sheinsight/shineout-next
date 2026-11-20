import { defineCase } from '../../../core/define';

export default defineCase({
  title: '列表 基本用法',
  description: '来自 shineout 示例 list/01-01-base，4 条文本的带边框列表，只测挂载',
  notes: [
    'data + keygen ↔ antd 的 dataSource + renderItem；Shineout 不写 renderItem 时直接渲染字符串，antd 要自己包 List.Item',
    'antd 6.7.0 的 List 已废弃，控制台会警告 “please use Listy instead”（smoke 会因此标红，不影响渲染）；Listy 没有 bordered、size、分页、grid 等能力，所以非虚拟滚动的用例里 antd6 仍用 List，和 antd5 保持一致',
    '原示例的 data 是 4 个相同字符串、keygen 写 true，2.x 会报 “two children with the same key” 警告，是原示例自身的问题，没有改',
  ],
});
