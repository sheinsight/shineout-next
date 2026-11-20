import { defineCase } from '../../../core/define';
import { pickScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '上传 基本用法',
  description: '来自 shineout 示例 upload/01-base-0，按钮触发的文件上传，带「选择一个文件」场景',
  scenarios: pickScenarios,
  notes: [
    '「选择一个文件」场景：往 <input type="file"> 里塞一个文件并触发 change 事件（等同用户在文件选择框里选完文件之后浏览器做的事），校验已选文件数 0 → 1。不经过真实的文件选择框；点击按钮打开系统文件框的那一段测不到',
    '所有网络请求都换成本地 mock（不访问 jsonplaceholder），选文件后立即成功；原示例的 action=\'//jsonplaceholder.typicode.com/posts\' 是真实网络请求，会引入网络噪声：Shineout 用 request 属性传 mock（立即调用 onLoad），antd 用 customRequest 传 mock（立即调用 onSuccess）',
    'mock 的完成时机：mock 请求是同步完成的（不经过 setTimeout，也没有进度回调），原因是用 setTimeout(0) 的 mock 时实测 Shineout 的 value 在 change 后要晚一个任务才更新，场景在下一帧绘制完成时读取状态，经常读到旧值（我连续触发 4~6 次，2.x、3.x 都有一半次数读到 0）；改成同步完成后连续 6 次三个库都稳定读到 1。所以这个场景测的是「选文件 → 文件加入列表」，不含真实上传的耗时和进度条更新',
    '自动测试里文件数大于 0 后 300ms 自动清空，每次测量都从「没有文件」开始',
    '结果展示：Shineout 的 value 是 string[]（onSuccess 返回 file.name），用 renderResult 显示文件名；antd 的 fileList 是 UploadFile[]，自带文件列表。两边「文件列表」的 DOM 结构和默认样式不同',
    '原示例有 accept=\'image/*\'，这里没有加，因为选的是 text 文件；原示例的上传图标（UploadIcon）没迁，按钮里只有文字',
  ],
});
