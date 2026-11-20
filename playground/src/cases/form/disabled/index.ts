import { defineCase } from '../../../core/define';

export default defineCase({
  title: '表单 整体禁用',
  description: '来自 shineout 示例 form/008-disabled，Form 的 disabled 让所有字段禁用，只测挂载',
  notes: [
    'disabled ↔ antd 的 disabled',
    'Input.Group ↔ antd 的 Space.Compact；Shineout 的 Input.Group 本身带 disabled，antd 靠 Form 的 disabled 往下传',
    '原示例里的 Input.Number 没有保留；原示例的 Form.Submit loading ↔ antd Button 的 loading',
  ],
});
