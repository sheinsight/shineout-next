import { defineCase } from '../../../core/define';
import { openScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '弹窗 头部和底部样式',
  description: '来自 shineout 示例 modal/14-header-footer-style，用 headerStyle / footerStyle 定制头部和底部，position=right（右侧抽屉式）',
  scenarios: openScenarios,
  notes: [
    '「点击打开」场景：自动测试时弹窗打开 600ms 后自己关闭（_shared/bench.ts），并等关闭动画结束再测下一次，每次测的都是「从关闭到打开」；「第一次打开」只测一次。手动查看时弹窗不会自动关闭',
    '2.x 的 Modal 没有 headerStyle / footerStyle（Props 里没有），所以只有 3.x 和 antd 参与',
    '原示例 position=right 让 Shineout 的 Modal 变成右侧抽屉样式；antd 的 Modal 没有 position，所以 antd 保持居中弹窗，只比较头部 / 底部样式，位置不同',
    'headerStyle / footerStyle ↔ antd 的 styles.header / styles.footer',
  ],
});
