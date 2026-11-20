import { defineCase } from '../../../core/define';
import { submitScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '规则 范围',
  description: '来自 shineout 示例 rule/03-range，name 长度 1-5，age 用 Input.Number 范围 18-100，提交空表单触发必填校验',
  scenarios: submitScenarios(2, /required|Please enter/),
  notes: [
    '「提交」场景：提交空表单触发校验，校验是异步的，错误要几十毫秒后才出现，晚于「下一帧绘制」，所以场景计时只覆盖点击后到下一帧的主线程占用，不含异步校验完成与错误渲染的那一段；每次测量后会等错误全部出现再点「重置」清掉；错误数用文案匹配，不依赖类名；Shineout 的 Form 设了 throttle={0}（默认提交后 1 秒内再点会被忽略，会让连续测量隔次失败），antd 没有这个节流',
    '校验写法不同：Shineout 把 rules 写在输入组件上，用 Rule() 工具；antd 把 rules 写在 Form.Item 上，用对象；规则含义对齐，内部实现不同；rule.range(min, max) ↔ antd 的 { min, max }',
    '提交空表单只会触发 required，range 在有值之后才校验，测的是「带 range 规则的表单」的提交开销',
    'Input.Number ↔ antd 的 InputNumber，是不同的输入组件',
    'Shineout 的提交按钮是 Form.Submit，原示例没有 onSubmit；这里给 Form 加了空的 onSubmit（antd 的 onFinish），否则点提交不会触发校验流程的收尾，两边行为才一致',
  ],
});
