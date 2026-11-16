import { defineCase } from '../../../core/define';

export default defineCase({
  title: '进度条 环形',
  description: '来自 shineout 示例 progress/04-circle，五个 64px 的环形进度条',
  notes: [
    'strokeWidth 单位不同：Shineout 是像素（4px），antd 的圆环 strokeWidth 是画布宽度的百分比，所以 4px / 64px ≈ 6.25',
    'size={64} ↔ antd 的 size={64}（圆环的直径）',
    '2.x 没有 icon 属性，后三个（原示例带 icon）在 2.x 里改成显示文字；3.x 显示图标（截图：warning 是感叹号，success 是对勾，danger 是叉）；antd 的 success / exception 状态用图标替换文字，warning 没有对应的 status，用 strokeColor 写死橙色并显示 70% 文字，所以第三个在 antd 里是文字而不是图标（截图确认），不等价',
  ],
});
