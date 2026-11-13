import { defineCase } from '../../../core/define';

export default defineCase({
  title: '折叠面板 基本用法',
  description: '来自 shineout 示例 collapse/01-base，四个面板，第 2、4 个默认展开，第 3、4 个禁用，只测挂载',
  notes: [
    '2.x 没有 Collapse 组件，只有 3.x、antd5、antd6 参与',
    '面板写法：Shineout 用 Collapse.Item（title、keygen），antd 用 items（label、key），文本内容四个库相同（_shared/content.tsx）',
    '默认展开：defaultActive ↔ defaultActiveKey；禁用面板：disabled ↔ collapsible="disabled"',
  ],
});
