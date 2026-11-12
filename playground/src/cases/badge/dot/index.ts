import { defineCase } from '../../../core/define';

export default defineCase({
  title: '徽标 小点模式',
  description: '来自 shineout 示例 badge/04-dot，不展示数字，只测挂载',
  notes: [
    '2.x 没有 Badge 组件，没有实现',
    '第二个徽标 Shineout 写法是 dot + color + text，antd 里没有 dot 搭配 text 的独立用法，对应写法是 color + text（antd 的状态点）',
  ],
});
