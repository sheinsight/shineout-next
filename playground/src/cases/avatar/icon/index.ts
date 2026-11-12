import { defineCase } from '../../../core/define';

export default defineCase({
  title: '头像 类型',
  description: '来自 shineout 示例 avatar/02-icon，图标、字符、图片、带角标的头像，只测挂载',
  notes: [
    '2.x 没有 Avatar 组件，没有实现',
    '原示例用 GitHub 上的远程图片，这里换成内联的 data URI，避免网络加载混进计时，四个库用同一份',
    'Badge 的 count 都传 ReactNode；Shineout 与 antd 的角标定位和默认样式各自不同',
  ],
});
