import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '抽屉 弹出位置',
  description: '来自 shineout 示例 drawer/02-position，单选切换弹出方向，默认 right，点击打开',
  notes: [
    'position ↔ antd 的 placement',
    '原示例抽屉里是一个带 Form 的表单，这里换成一段文字，避免把 Form 的开销带进来（Form 之后会单独迁移）',
    '单选组用各库自己的 Radio，只在挂载时有影响',
  ],
  scenarios: openScenarios,
});
