import { defineCase } from '../../../core/define';

export default defineCase({
  title: '上传 图片',
  description: '来自 shineout 示例 upload/01-base-1-image，Upload.Image 对照 antd 的 picture-card，预置 2 张图片，只测挂载',
  notes: [
    '只测挂载，没有交互场景（选文件的交互场景只放在 base 里）',
    '图片：内联 SVG（data URI），不请求网络；预置 2 张已上传的图片，上限 limit / maxCount = 3，所以还剩一个「添加」按钮',
    'Shineout 的 Upload.Image ↔ antd 的 Upload + listType=\'picture-card\'；limit ↔ maxCount；value（url 字符串数组）+ renderResult={(f) => f} ↔ fileList（{ uid, name, status: \'done\', url }）',
    '原示例的 recoverAble（删除后可恢复）、leftHandler（添加按钮放左边）、removeConfirm（删除二次确认）、onSuccess 都没迁：antd 没有对应属性（读类型确认没有 recoverAble / leftHandler / removeConfirm 同名或同义属性，没有逐个深查）',
    '图片卡片的大小：Shineout 默认 80×80 的图片框，antd 的 picture-card 默认 102×102（实测），这里没有统一大小，按各库默认渲染',
    '所有网络请求都换成本地 mock（不访问 jsonplaceholder），选文件后立即成功；原示例的 action=\'//jsonplaceholder.typicode.com/posts\' 是真实网络请求，会引入网络噪声',
  ],
});
