import { defineCase } from '../../../core/define';

export default defineCase({
  title: '提示框 不同类型',
  description: '来自 shineout 示例 alert/02-type，info / success / warning / danger',
  notes: [
    'antd 没有 danger 类型，对应的是 error',
    '原示例的宽度按父容器百分比计算，随页面宽度变化；这里改成固定 800px 的容器，每个提示框占一半，四个库一致',
  ],
});
