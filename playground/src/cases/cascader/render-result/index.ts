import { defineCase } from '../../../core/define';

export default defineCase({
  title: '级联选择 自定义结果',
  description: '来自 shineout 示例 cascader/02-render-result，结果文本转大写，只测挂载',
  notes: [
    'Shineout 的 renderResult 对应 antd 的 displayRender（antd 的参数是整条路径的 label 数组，这里取最后一项转大写）',
    '带默认值 jiangsu / nanjing / jiangning，保证挂载时就渲染结果',
  ],
});
