import { defineCase } from '../../../core/define';
import { showScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '消息 Semantic DOM',
  description: '来自 shineout 示例 message/07-semantic，弹出时传入 classNames / styles，只有 3.x 和 antd 6.x 参与',
  scenarios: showScenarios(),
  notes: [
    'Message 是命令式 API，挂载时页面上什么都没有。这个用例带了场景：点击按钮弹出一条 Message，测的是点击到下一帧的主线程开销，等消息消失后再点下一次；第一次（冷启动）单独测一次，不预热',
    '显示时间统一为 1 秒（原示例是默认的 3 秒），只是让测试快一点',
    '2.x 没有 classNames / styles；antd 5.29 的 message 也没有，所以只有 3.x 和 antd 6.x',
    'key 的对应关系：item ↔ root，message ↔ wrapper（按样式含义推断，不是官方文档的对应）',
    '原示例第二个按钮（函数式 classNames，根据 position 设类名）没有迁移，antd 的 message 没有 position',
  ],
});
