import { defineCase } from '../../../core/define';

export default defineCase({
  title: '级联选择 禁用',
  description: '来自 shineout 示例 cascader/disabled，整体禁用和部分节点禁用，单选与多选各一组，只测挂载',
  notes: [
    '部分节点禁用：Shineout 传一个函数（disabled={fn}），antd 把 disabled 写进选项里（_shared/data.ts 的 withDisabled），禁用的是同一批节点（jiangsu）',
    '多选在 antd 里对应 multiple，默认值用路径数组',
  ],
});
