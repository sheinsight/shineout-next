import { defineCase } from '../../../core/define';

export default defineCase({
  title: '标签 扩展颜色',
  description: '来自 shineout 示例 tag/s-004-color，9 种扩展颜色，只测挂载',
  notes: [
    '2.x 没有扩展色（type 只有 default / info / danger / warning / success），没有实现',
    'Shineout 的扩展色是 tangerine / magenta / purple / indigo / cyan / neon / lemon / brown / orange，antd 的预设色是 blue / purple / cyan / green / magenta / pink / red / orange / yellow / volcano / geekblue / lime / gold（读 PresetColors 得到），只有 magenta / purple / cyan / orange 同名，其余 tangerine / indigo / neon / lemon / brown 没有同名预设色。这里把同名的 4 个直接对应，其余按近似色映射：tangerine→volcano、indigo→geekblue、neon→lime、lemon→gold、brown→（antd 没有棕色，用 orange 代替）。映射是近似的，色值不同',
    '只渲染 bright 和 outline 两种 mode（对应 antd 6 的 filled / outlined，antd 5 的 bordered=false / true），fill 对应 antd 6 的 solid 一并渲染；brightOutline 没有对应',
    '截图确认：antd 的色相与 Shineout 的接近但不同（例如 Shineout 的 Neon 是黄绿，antd 的 lime 偏深；Lemon 是亮黄，antd 的 gold 偏橙），Brown 用 orange 代替，所以这一格两边明显不一样；3.x 渲染 4 个 mode × 9 色 = 36 个 Tag，antd 6 渲染 3 × 9 = 27 个，antd 5 渲染 2 × 9 = 18 个，数量不同，DOM 节点数也不同',
  ],
});
