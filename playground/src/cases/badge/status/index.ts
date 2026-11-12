import { defineCase } from '../../../core/define';

export default defineCase({
  title: '徽标 带状态的小点',
  description: '来自 shineout 示例 badge/05-status，status 切换颜色，有无文案各一排，只测挂载',
  notes: [
    '2.x 没有 Badge 组件，没有实现',
    'Shineout 写 dot + status，antd 只写 status（antd 的 dot 只用于包裹元素的右上角小点）',
  ],
});
