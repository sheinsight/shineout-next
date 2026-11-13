import { defineCase } from '../../../core/define';

export default defineCase({
  title: '表单 基础用法',
  description: '来自 shineout 示例 form/001-base 的简化版：四个输入字段加提交 / 重置，带默认值，只测挂载',
  notes: [
    '原示例里有 Upload、Radio、Checkbox、DatePicker、Rate、Switch 等十几种控件，这些组件还没迁移，这里只保留 Input 和 Textarea，只比较表单本身的结构',
    '字段绑定：Shineout 把 name 写在输入组件上，antd 写在 Form.Item 上；Shineout 的 labelWidth 对应 antd 的 labelCol，默认布局不同，视觉有差异',
    '提交 / 重置：Shineout 用 Form.Submit / Form.Reset，antd 用 htmlType 为 submit / reset 的 Button',
  ],
});
