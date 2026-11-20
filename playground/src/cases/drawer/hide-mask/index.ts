import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '抽屉 隐藏遮罩',
  description: '来自 shineout 示例 drawer/08-hide-mask，不显示遮罩层',
  notes: [
    'hideMask ↔ antd 的 mask={false}',
    '原示例有底部按钮与内容计数，这里去掉了，抽屉本身的结构（标题、内容）四个库相同',
  ],
  scenarios: openScenarios,
});
