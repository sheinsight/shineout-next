import { defineCase } from '../../../core/define';

export default defineCase({
  title: '进度条 大小',
  description: '来自 shineout 示例 progress/07-size，small / default / large 三套线形 + 环形',
  notes: [
    '原示例用 Radio.Group 切换三套，Radio 还没迁移，这里把三套同时渲染（和其他用例的做法一致），只测挂载；原示例里 line-inner 那一行没放进来，line-inner 单独见 progress/line-inner',
    'strokeWidth 对线形是条高（像素），两边一致；对环形 Shineout 是像素，antd 是画布宽度的百分比，用例里按 4px / 环直径 换算（48→8.33，64→6.25，80→5）',
    'default 组的环形原示例没传 size / strokeWidth（Shineout 默认 64 / 4），antd 默认 120，所以这里显式传了 64 和 6.25 保持环的大小一致；default 组线形没传 strokeWidth，两边用各自的默认高度',
    'antd 的文字用 format 返回带字号的 span 来对应原示例里 children 里的 span',
    'antd 的 Progress 是 inline-block，线形（style.width=400）和环形直接并排会排到同一行，所以 antd 的环形外面包了一层 div 让它换行；Shineout 的 Progress 是块级，不用包。这多出的一层 div 只在 antd 版本里',
  ],
});
