import { defineCase } from '../../../core/define';

export default defineCase({
  title: '级联选择 hover 展开',
  description: '来自 shineout 示例 cascader/expand-trigger，expandTrigger=hover，只测挂载',
  notes: [
    '挂载时下拉层没有展开，三个库差异不大；展开时的差别需要靠 scenarios 才能测到',
  ],
});
