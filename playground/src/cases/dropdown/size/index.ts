import { defineCase } from '../../../core/define';

export default defineCase({
  title: '下拉菜单 尺寸',
  description: '来自 shineout 示例 dropdown/010-size，small / default / large 三种线框主色下拉，只测挂载',
  notes: [
    'size：Shineout 的 default ↔ antd 的 middle',
    'Shineout 的触发按钮自带下拉小箭头，antd 的 Button 没有，所以 antd 的按钮略窄、DOM 少一个图标节点；这是两边组件结构的差异，不是用例疏漏',
  ],
});
