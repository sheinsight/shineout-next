import { defineCase } from '../../../core/define';
import { showScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '消息 关闭回调',
  description: '来自 shineout 示例 message/04-close，关闭后触发 onClose，里面再弹一条 Message',
  scenarios: showScenarios(),
  notes: [
    'Message 是命令式 API，挂载时页面上什么都没有。这个用例带了场景：点击按钮弹出一条 Message，测的是点击到下一帧的主线程开销，等消息消失后再点下一次；第一次（冷启动）单独测一次，不预热',
    '显示时间统一为 1 秒（原示例是默认的 3 秒），只是让测试快一点',
    '原示例第一条是 duration=0（不自动关闭，要手动点关闭才触发 onClose），场景无法手动关闭，所以改成 1 秒自动关闭后触发 onClose 再弹第二条；测量只覆盖点击到下一帧，第二条（onClose 触发）不在测量窗口内',
    '两条消息都消失后场景才进行下一次',
  ],
});
