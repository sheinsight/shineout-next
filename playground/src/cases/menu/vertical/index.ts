import { defineCase } from '../../../core/define';

export default defineCase({
  title: '菜单 垂直',
  description: '来自 shineout 示例 menu/10-vertical，垂直菜单（子菜单悬浮弹出），只测挂载',
  notes: [
    'mode=vertical-auto 是 Shineout 独有的取值（根据空间决定弹出方向），antd 没有，这里用 antd 的 mode=vertical 近似',
    '垂直菜单的子菜单是悬浮弹出（Popover / Portal），挂载时不渲染，所以两边挂载开销都只含一级项',
  ],
});
