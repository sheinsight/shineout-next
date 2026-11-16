import { defineCase } from '../../../core/define';

export default defineCase({
  title: '分页 简洁模式',
  description: '来自 shineout 示例 pagination/011-simple，simple 模式（上一页 / 输入框 / 下一页）',
  notes: [
    '2.x 的 Pagination 没有 simple 属性（layout 里有 simple 取值，但不是同一个东西，没有迁移）；3.x 和 antd 的 simple 是同名属性',
  ],
});
