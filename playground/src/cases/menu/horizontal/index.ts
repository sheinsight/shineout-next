import { defineCase } from '../../../core/define';

export default defineCase({
  title: '菜单 水平',
  description: '来自 shineout 示例 menu/09-horizontal，水平菜单，只测挂载',
  notes: [
    'antd 的水平菜单用 ResizeObserver 测量宽度，溢出的项收进"…"，挂载时会多一个隐藏的 overflow 节点和一次测量；Shineout 的水平菜单没有这个机制',
    '并排布局下每个 frame 只有约 330px，4 个一级项可能被挤得换行或被 antd 折进"…"，对照时建议把布局切成「上下排列」',
  ],
});
