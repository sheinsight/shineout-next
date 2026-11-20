import { defineCase } from '../../../core/define';

export default defineCase({
  title: '表单 联动',
  description: '来自 shineout 示例 form/013-flow-1 的前半部分：姓和名变化时，全名实时联动，只测挂载',
  notes: [
    'Form.Flow ↔ antd 的 Form.Item shouldUpdate',
    '只测挂载，联动要在输入后才触发，需要另加输入类的 scenarios；原示例后面的「显示年龄 / 颜色」等条件字段用到 Checkbox 联动，没有迁移',
  ],
});
