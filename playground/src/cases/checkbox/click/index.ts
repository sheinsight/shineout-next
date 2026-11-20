import { defineCase } from '../../../core/define';

export default defineCase({
  title: '复选框 点击回调',
  description: '来自 shineout 示例 checkbox/009-click，带点击计数，只测挂载',
  notes: [
    '只测挂载，没有点击交互，测点击后的重渲染要另加 scenarios',
  ],
});
