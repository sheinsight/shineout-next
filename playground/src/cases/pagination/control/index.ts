import { defineCase } from '../../../core/define';

export default defineCase({
  title: '分页 受控',
  description: '来自 shineout 示例 pagination/010-control，用 current + onChange 受控',
  notes: [
    '原示例上方有一个 Input.Number 用来跳转页码，这里去掉了，只保留受控的 Pagination（Input.Number 的开销不属于 Pagination）；这个用例只测挂载，没有写翻页场景',
    'span={3} ↔ antd 没有 span，antd 的页码省略规则是固定的（当前页前后各 2 页），所以页码按钮个数可能与 Shineout 不同',
  ],
});
