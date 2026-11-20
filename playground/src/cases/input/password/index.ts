import { defineCase } from '../../../core/define';

export default defineCase({
  title: '输入框 密码',
  description: '来自 shineout 示例 input/08-password，带明文切换和清除按钮的密码框，只测挂载',
  notes: [
    '2.x 的 Input.Password 没有 visibilityToggle 属性（用的是 point 属性：把输入替换成圆点字符的伪密码框，不是 type=password），所以 2.x 这里没传，实现机制和 3.x / antd 不同',
    '原示例包了一层 <Form> 并设置了 name，横评里去掉 Form，避免把 Form 的开销带进来（Form 的开销已经在 form 用例里测过）',
  ],
});
