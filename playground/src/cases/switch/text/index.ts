import { defineCase } from '../../../core/define';

export default defineCase({
  title: '开关 文字',
  description: '来自 shineout 示例 switch/05-text，带 ON / OFF 文字，small / default / large 三种，只测挂载',
  notes: [
    'Shineout 的 content={[开, 关]} 对应 antd 的 checkedChildren / unCheckedChildren；defaultValue（开）对应 defaultChecked',
    'antd 没有 large，只渲染 small 和 default 两个；antd 的小号开关带文字时文字很小，没有逐项核对显示效果',
  ],
});
