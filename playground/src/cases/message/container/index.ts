import { defineCase } from '../../../core/define';
import { showScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '消息 指定容器',
  description: '来自 shineout 示例 message/06-container，Message 渲染到指定的 100x100 容器里',
  scenarios: showScenarios(),
  notes: [
    'Message 是命令式 API，挂载时页面上什么都没有。这个用例带了场景：点击按钮弹出一条 Message，测的是点击到下一帧的主线程开销，等消息消失后再点下一次；第一次（冷启动）单独测一次，不预热',
    '显示时间统一为 1 秒（原示例是默认的 3 秒），只是让测试快一点',
    'antd 的 getContainer 是全局配置，不能每次调用单独指定，所以每次点击都会先 message.config 再弹出，config 会重建容器，这笔开销只有 antd 有，对比时要扣除',
  ],
});
