import { defineCase } from '../../../core/define';

export default defineCase({
  title: '分页 对齐',
  description: '来自 shineout 示例 pagination/008-align，left / center / right 三种对齐，2.x 3.x 和 antd 6.x 参与',
  notes: [
    'antd 5.29 的 Pagination 没有 align（用 Flex 或外层容器的 text-align 才能对齐），所以只有 2.x、3.x 和 antd 6.x；antd6 的取值是 start / center / end',
    'span={3} ↔ antd 没有 span，antd 的页码省略规则是固定的（当前页前后各 2 页），所以页码按钮个数可能与 Shineout 不同',
  ],
});
