import { defineCase } from '../../../core/define';

export default defineCase({
  title: '进度条 语义化样式',
  description: '来自 shineout 示例 progress/10-semantic，classNames / styles，线形 + 环形，只有 3.x 与 antd 6.x 参与',
  notes: [
    '2.x、antd 5.29 的 Progress 没有 classNames / styles（antd5 的类型里没有），不参与',
    '节点对应是交叉的，容易写反：Shineout 的 track 是底色槽、indicator 是彩色进度条、content 是文字；antd 6 的 rail 是底色槽、track 是彩色进度条、indicator 是文字。所以 track ↔ rail，indicator ↔ track，content ↔ indicator（读 antd Line.js / progress.js 的 class 确认过）',
    'antd 没有 icon 这个 key（成功图标由 indicator 渲染），原示例的 classNames.icon 没迁；函数式 classNames：Shineout 是单个 key 写函数、入参 { value, type, shape }；antd 6 是整个 classNames 写成函数 ({ props }) => ({ root, ... })，各自用自己的字段写',
    'strokeWidth 单位不同（环形）：Shineout 是像素 6，antd 是画布百分比，80px 环用 7.5 对应 6px',
    '原示例第二个环（type=success + icon，value=100）在 antd 里用 status=success + percent=100 对应，截图确认两边都是对勾',
  ],
});
