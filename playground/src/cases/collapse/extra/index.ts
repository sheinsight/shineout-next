import { defineCase } from '../../../core/define';

export default defineCase({
  title: '折叠面板 额外操作',
  description: '来自 shineout 示例 collapse/06-extra，标题右侧放图标、复选框、按钮，只测挂载',
  notes: [
    '2.x 没有 Collapse 组件，不参与',
    'extra 里的 Checkbox 和 Button 用各自库的组件，所以这个用例同时包含了各库复选框和按钮的开销',
    '原示例的图标是很长的 svg 路径，这里换成三个圆点，三个库用同一份',
  ],
});
