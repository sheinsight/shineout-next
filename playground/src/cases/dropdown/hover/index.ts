import { defineCase } from '../../../core/define';

export default defineCase({
  title: '下拉菜单 触发方式',
  description: '来自 shineout 示例 dropdown/002-hover，点击触发与悬停触发各一个，只测挂载',
  notes: [
    'antd 的 trigger 是数组；挂载时菜单都没展开，差别需要靠 scenarios 才能测到',
    'Shineout 的触发按钮自带下拉小箭头，antd 的 Button 没有，所以 antd 的按钮略窄、DOM 少一个图标节点；这是两边组件结构的差异，不是用例疏漏',
  ],
});
