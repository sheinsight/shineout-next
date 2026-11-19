import { defineCase } from '../../../core/define';

export default defineCase({
  title: '上传 拖拽',
  description: '来自 shineout 示例 upload/09-drag 的文件拖拽区，只测挂载',
  notes: [
    '只测挂载，没有交互场景（选文件的交互场景只放在 base 里）；拖拽本身（drop 事件）没有测',
    'Shineout 的 drop 属性 ↔ antd 的 Upload.Dragger；两者的拖拽区默认样式不同（antd 的 Dragger 自带虚线边框和背景，Shineout 的拖拽区只是把 children 当作可拖放区域），原示例里 Shineout 的拖拽区样式（高 200、居中）是写在 children 里的，这里沿用',
    '拖拽区高度：Shineout 的拖拽区是 children 的高度 200 + 边框，实测外框 202；antd 的 Dragger 内容区高度设成 168，实测外层 wrapper 也是 202，宽度两边都用 style.width=400。原示例的第二部分（Upload.Image + drop 的图片拖拽区）没迁：antd 的 Dragger 加 listType=\'picture-card\' 是不同的布局，不是同一个功能',
    '原示例的 AddIcon 没迁，用文字代替',
    '所有网络请求都换成本地 mock（不访问 jsonplaceholder），选文件后立即成功；原示例的 action=\'//jsonplaceholder.typicode.com/posts\' 是真实网络请求，会引入网络噪声',
  ],
});
