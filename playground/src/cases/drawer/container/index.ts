import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '抽屉 指定容器',
  description: '来自 shineout 示例 drawer/03-container，抽屉渲染到指定的容器里而不是 body',
  notes: [
    'container ↔ antd 的 getContainer；antd 还需要 rootStyle position:absolute，否则抽屉仍然铺满整个页面',
    '容器加了 position:relative / overflow:hidden / 最小高度，四个库相同，保证抽屉被限制在容器内',
    'antd 的 getContainer 在容器节点还没拿到时传 false（挂在原位）',
  ],
  scenarios: openScenarios,
});
