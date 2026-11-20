import { defineCase } from '../../../core/define';

export default defineCase({
  title: '日期选择 默认面板月份',
  description: '来自 shineout 示例 date-picker/17-default-picker，未选值时面板默认展示的月份，只测挂载',
  notes: [
    'antd 的值需要 dayjs 对象，这里 playground 直接依赖了 dayjs@1.11.23',
    '面板没有展开，defaultPickerValue 在挂载阶段没有可见差别',
  ],
});
