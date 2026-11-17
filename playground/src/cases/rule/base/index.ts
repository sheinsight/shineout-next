import { defineCase } from '../../../core/define';
import { submitScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '规则 必填',
  description: '来自 shineout 示例 rule/01-base，三个必填 Input，提交空表单触发校验',
  scenarios: submitScenarios(3, /required|Please enter/),
  notes: [
    '「提交」场景：提交空表单触发校验，校验是异步的，错误要几十毫秒后才出现，晚于「下一帧绘制」，所以场景计时只覆盖点击后到下一帧的主线程占用，不含异步校验完成与错误渲染的那一段；每次测量后会等错误全部出现再点「重置」清掉；错误数用文案匹配，不依赖类名；Shineout 的 Form 设了 throttle={0}（默认提交后 1 秒内再点会被忽略，会让连续测量隔次失败），antd 没有这个节流',
    '校验写法不同：Shineout 把 rules 写在输入组件上，用 Rule() 工具；antd 把 rules 写在 Form.Item 上，用对象；规则含义对齐，内部实现不同；rule.required() ↔ antd 的 { required: true, message }',
    '第一项 rule.required() 没传 message，Shineout 显示默认文案「Please enter name」（实测，用到了 title），antd 的 message 必填，这里写成「name is required」；所以文案不同，场景按错误数判断而不是文案',
    'Shineout 的提交按钮是 Form.Submit，原示例没有 onSubmit；这里给 Form 加了空的 onSubmit（antd 的 onFinish），否则点提交不会触发校验流程的收尾，两边行为才一致',
  ],
});
