import { defineCase } from '../../../core/define';
import { submitScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '规则 正则',
  description: '来自 shineout 示例 rule/05-reg，一个电话号码 Input，必填 + 正则，提交空表单触发必填校验',
  scenarios: submitScenarios(1, /required|Please enter/),
  notes: [
    '「提交」场景：提交空表单触发校验，校验是异步的，错误要几十毫秒后才出现，晚于「下一帧绘制」，所以场景计时只覆盖点击后到下一帧的主线程占用，不含异步校验完成与错误渲染的那一段；每次测量后会等错误全部出现再点「重置」清掉；错误数用文案匹配，不依赖类名；Shineout 的 Form 设了 throttle={0}（默认提交后 1 秒内再点会被忽略，会让连续测量隔次失败），antd 没有这个节流',
    '校验写法不同：Shineout 把 rules 写在输入组件上，用 Rule() 工具；antd 把 rules 写在 Form.Item 上，用对象；规则含义对齐，内部实现不同；rule.regExp(reg, message) ↔ antd 的 { pattern, message }',
    '提交空表单只会触发 required，正则在有值之后才执行；只有一个字段，所以只有一个错误',
    'Shineout 这里的 Input 没传 title，required 没传 message，默认文案只有「Please enter 」（实测）；antd 是「tel is required」',
    'Shineout 的提交按钮是 Form.Submit，原示例没有 onSubmit；这里给 Form 加了空的 onSubmit（antd 的 onFinish），否则点提交不会触发校验流程的收尾，两边行为才一致',
  ],
});
