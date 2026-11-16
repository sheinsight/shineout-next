import { defineCase } from '../../../core/define';
import { showScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '消息 显示时长',
  description: '来自 shineout 示例 message/02-duration，自定义显示时长，场景点按钮弹出 1 秒的 Message',
  scenarios: showScenarios(),
  notes: [
    'Message 是命令式 API，挂载时页面上什么都没有。这个用例带了场景：点击按钮弹出一条 Message，测的是点击到下一帧的主线程开销，等消息消失后再点下一次；第一次（冷启动）单独测一次，不预热',
    '原示例是 10 秒和 0（不自动关闭，手动点关闭图标）。0 会让场景一直等不到消息消失，10 秒又太慢，所以这里只保留了一个按钮，时长改成 1 秒；"手动关闭"那一项没有迁移',
    '这个用例的开销和 base 基本一样，只是为了保持"一个示例一个用例"',
  ],
});
