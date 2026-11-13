import { defineCase } from '../../../core/define';

export default defineCase({
  title: '日期选择 可输入',
  description: '来自 shineout 示例 date-picker/12-inputable，单个 + 范围日期时间，只测挂载',
  notes: [
    'antd 的输入框默认就能输入，不用传属性；Shineout 需要 inputable',
    'absolute（弹层挂到 body）在 antd 里是默认行为，不用传',
  ],
});
