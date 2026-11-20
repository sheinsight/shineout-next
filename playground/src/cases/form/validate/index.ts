import { defineCase } from '../../../core/define';
import { submitScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '表单 校验',
  description: '来自 shineout 示例 form/006-validate-01 的简化版：7 个必填字段，点击「提交」一次性触发全部校验并显示错误',
  notes: [
    '原示例里的 DatePicker 和 Select 字段没有保留（只用已迁移的 Input / Checkbox），并去掉了自定义校验函数、bind、scrollToError 等',
    '校验写法不同：Shineout 把 rules 写在输入组件上，用 Rule() 工具；antd 把 rules 写在 Form.Item 上，用对象；规则含义对齐（必填 / 邮箱 / 长度 / 范围 / 正则），但内部实现不同',
    'Age：Shineout 用 type="integer" 的 Input，antd 用 InputNumber，它们是不同的输入组件',
    '「提交」场景：每次点击都是 7 个必填项为空，一次性触发全部校验。校验是异步的，错误要几十毫秒后才出现，晚于「下一帧绘制」，所以场景计时只覆盖点击后到下一帧的主线程占用，不含异步校验完成与错误渲染的那一段；每次测量后会等 7 个错误都出现再点「重置」清掉，错误用「文案包含 is required」判断，不依赖类名',
    '「重置」按钮：Shineout 的 Form.Reset 会清掉校验错误；antd 的是 form.resetFields()',
  'Shineout 的 Form 默认有 1 秒的提交节流（throttle，提交后 1 秒内再点会被直接忽略，重置后 500ms 内还会忽略子组件的写回），连续测量会隔一次失败一次；这里给 Shineout 的 Form 设了 throttle={0}，让每次点击都真正提交。antd 没有这个节流，所以这是为了让两边测同一件事，实际使用时 Shineout 的节流会让重复点击更便宜',
  ],
  scenarios: submitScenarios,
});
