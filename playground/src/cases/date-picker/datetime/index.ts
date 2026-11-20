import { defineCase } from '../../../core/define';

export default defineCase({
  title: '日期选择 日期时间',
  description: '来自 shineout 示例 date-picker/02-datetime，type=datetime，只测挂载',
  notes: [
    'antd 没有 datetime 类型，用 showTime 对应（映射见 _shared/antd-map.ts）',
  ],
});
