import { defineCase } from '../../../core/define';

export default defineCase({
  title: '头像 Semantic DOM',
  description: '来自 shineout 示例 avatar/06-semantic，用 styles 定制内部节点，只测挂载',
  notes: [
    '2.x 没有 Avatar 组件，没有实现',
    'antd 的 Avatar 和 Avatar.Group 没有 classNames / styles 属性（只有 style / className），没有实现',
    '原示例用 GitHub 上的远程图片，这里换成内联的 data URI，避免网络加载混进计时，四个库用同一份',
  ],
});
