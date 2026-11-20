import { defineCase } from '../../../core/define';

export default defineCase({
  title: '分页 跳转',
  description: '来自 shineout 示例 pagination/003-jumper，页码后面带一个“跳转到某页”输入框',
  notes: [
    'layout=[links, jumper] ↔ antd 的 showQuickJumper；Shineout 用 text.jumper 的 {input} 占位符决定输入框位置，antd 用 locale.jump_to / page 拼，文案位置不同',
    'antd 的 showQuickJumper 默认没有“Go”按钮时按回车跳转，这里设了 goButton: null 对齐',
    'span={3} ↔ antd 没有 span，antd 的页码省略规则是固定的（当前页前后各 2 页），所以页码按钮个数可能与 Shineout 不同',
  ],
});
