import { defineCase } from '../../../core/define';

export default defineCase({
  title: '折叠面板 图标位置',
  description: '来自 shineout 示例 collapse/07-icon，带单选组切换图标位置与触发区域，默认状态为 left + header，只测挂载',
  notes: [
    '2.x 没有 Collapse 组件，不参与',
    '图标位置：left/right ↔ start/end（antd6 用 expandIconPlacement，antd5 用 expandIconPosition）；none ↔ 每个面板 showArrow=false',
    '触发区域：triggerRegion ↔ collapsible',
    '用例里还有两组单选，各库用自己的 Radio，是挂载开销的一部分',
  ],
});
