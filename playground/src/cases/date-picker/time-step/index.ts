import { defineCase } from '../../../core/define';

export default defineCase({
  title: '日期选择 时间步长',
  description: '来自 shineout 示例 date-picker/07-time-1，hourStep / minuteStep / secondStep，只测挂载',
  notes: [
    '挂载时下拉面板没有展开，步长只影响展开后的列数，所以这个用例主要对比输入框本身的挂载开销，步长的差异需要展开面板才能测到',
  ],
});
