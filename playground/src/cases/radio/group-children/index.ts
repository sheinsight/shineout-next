import { defineCase } from '../../../core/define';

export default defineCase({
  title: '单选框 子元素渲染',
  description: '来自 shineout 示例 radio/002-group-1，Radio.Group 里手写 Radio 子元素，defaultValue=yellow，只测挂载',
  notes: [
    'Radio 的取值：Shineout 是 htmlValue，antd 是 value',
    '原示例的 onChange 里是 console.log，这里去掉；也没有 react-jss 的 marginBottom',
    '与 radio/group-data 渲染的内容相同，区别是 children 写法与 data 写法的开销',
  ],
});
