import { defineCase } from '../../../core/define';

export default defineCase({
  title: '下拉菜单 分割线',
  description: '来自 shineout 示例 dropdown/007-divider，只有 3.x 与 antd 参与',
  notes: [
    '2.x 没有 divider 属性，不参与',
    'Shineout 在某一项上标 divider:true，antd 是独立的 { type: "divider" } 项；3.x 的分割线画在该项下方（见 packages/base/src/dropdown/dropdownIn.tsx 的渲染顺序），所以 antd 把分割线放在 Third 后面',
  ],
});
