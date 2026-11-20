import { defineCase } from '../../../core/define';

export default defineCase({
  title: '链接 下划线',
  description: '来自 shineout 示例 link/04-underline，无下划线 / 常驻下划线 / 悬停下划线，只测挂载',
  notes: [
    '2.x 没有 Link 组件（shineout-v2 的导出里没有），所以只有 3.x 和 antd 参与',
    'antd 的 underline 只有布尔值，没有 hover 取值，所以第三项 underline="hover" 在 antd 里没有对应，只渲染前两项，antd 比 3.x 少一个链接',
  ],
});
