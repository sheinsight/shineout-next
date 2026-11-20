import { defineCase } from '../../../core/define';

export default defineCase({
  title: '标签页 语义化 DOM',
  description: '来自 shineout 示例 tabs/12-semantic 的第一块（line + extra + header/tab/panel/extra/ink 样式），只测挂载',
  notes: [
    '只有 3.x 和 antd 6 参与：2.x 没有 classNames / styles；antd 5 的 Tabs 没有语义化 styles（读类型确认）',
    '节点对应关系：Shineout 的 root / header / tab / panel / extra / ink 对应 antd 6 的 root / header / item / content（面板）/ 无（extra 没有独立节点，在 header 里）/ indicator。antd 6 的 content 是面板内容节点，body 是容器；这里 panel 的 padding:16 写在 content，extra 的 color 因为 antd 没有节点而无法对应，没迁',
    '原示例后面三块（line / fill 的 inner 样式、卡片 + collapsible 的 prev / next / collapsible 样式）antd 没有对应节点（inner、collapsible），没迁',
    'ink 的 background 对应 antd 的 indicator，height:3 对应 indicator 的 height；tab 的 fontWeight:500 对应 item',
  ],
});
