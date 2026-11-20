import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '抽屉 点击遮罩关闭',
  description: '来自 shineout 示例 drawer/05-close，单选 maskCloseAble 为 false / true，默认 false，点击打开',
  notes: [
    'maskCloseAble ↔ antd5 的 maskClosable、antd6 的 mask.closable（maskClosable 在 antd6 已弃用）',
    '原示例还有 maskCloseAble=null（点遮罩不关，但保留右上角关闭按钮），antd 没有对应，没有迁移',
    '选项数据：Shineout 用 format="value"，antd 直接用 { label, value }',
  ],
  scenarios: openScenarios,
});
