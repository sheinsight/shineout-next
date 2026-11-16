import { defineCase } from '../../../core/define';

export default defineCase({
  title: '分页 禁用',
  description: '来自 shineout 示例 pagination/006-disabled，禁用的完整分页（总数 + 页码 + 每页条数 + 跳转）',
  notes: [
    '这个用例里 antd 保留了每页条数下拉（showSizeChanger），对应 Shineout 的 layout 里的 list，所以挂载里含一个 Select，两边都有',
    'span={3} ↔ antd 没有 span，antd 的页码省略规则是固定的（当前页前后各 2 页），所以页码按钮个数可能与 Shineout 不同',
  ],
});
