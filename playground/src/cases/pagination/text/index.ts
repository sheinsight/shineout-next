import { defineCase } from '../../../core/define';

export default defineCase({
  title: '分页 自定义文案',
  description: '来自 shineout 示例 pagination/009-text，自定义上一页 / 下一页文案、每页条数后缀和信息区',
  notes: [
    'text.prev / next / page ↔ antd 的 locale.prev_page / next_page / items_per_page；layout 里的信息函数 ↔ showTotal',
    '截图确认：Shineout 的 text.prev / next 会把按钮显示成文字（Previous / Next），antd 的 locale.prev_page / next_page 只改悬停提示，按钮仍是箭头图标，所以两边的 DOM 不同；另外 Shineout 的信息区在最右，antd 的 showTotal 固定在最左',
    'span={3} ↔ antd 没有 span，antd 的页码省略规则是固定的（当前页前后各 2 页），所以页码按钮个数可能与 Shineout 不同',
  ],
});
