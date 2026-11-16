import { defineCase } from '../../../core/define';

export default defineCase({
  title: '分页 尺寸',
  description: '来自 shineout 示例 pagination/005-size，small / default / large 三种尺寸',
  notes: [
    'antd 5.29 的 Pagination size 类型只有 small / default（没有 large），所以 antd5 的第三个按 default 渲染，和第二个一样；antd 6.x 的 size 接受 large，是三档。2.x / 3.x 有三档',
    'span={3} ↔ antd 没有 span，antd 的页码省略规则是固定的（当前页前后各 2 页），所以页码按钮个数可能与 Shineout 不同',
  ],
});
