import { defineCase } from '../../../core/define';

export default defineCase({
  title: '日期选择 确认按钮',
  description: '来自 shineout 示例 date-picker/09-select-confirm，范围选择 + 受控 + 需要确认 + 可清除，只测挂载',
  notes: [
    '原示例有 7 种 type 和范围/确认的开关，这里只固定「date + range + 需要确认」这一种，其余组合没有迁移',
    'needConfirm ↔ antd 的 needConfirm；2.x 没有这个属性，不传（2.x 也没有 showSelNow）',
    'Shineout 的 inputable 对应 antd 的输入框默认就可以输入，不用传',
  ],
});
