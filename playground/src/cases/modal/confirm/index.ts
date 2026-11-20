import { defineCase } from '../../../core/define';
import { staticScenarios } from '../_shared/static';

export default defineCase({
  title: '弹窗 确认框',
  description: '来自 shineout 示例 modal/03-confirm，Modal.confirm 弹出确认框，按钮文字 Yes / No',
  scenarios: staticScenarios,
  notes: [
    '静态方法（Modal.info 等）没有受控的 open 状态：场景点按钮弹出，测完后自己点弹窗里的确认按钮（Ok / 知道了）关掉，再等 DOM 里的弹窗消失才进行下一次，这次点击不在测量窗口内',
    'text.ok / text.cancel ↔ antd 的 okText / cancelText',
    '原示例的 onOk 返回 2 秒的 Promise（测确认按钮的 loading 态），这里去掉了，否则场景点确认后要等 2 秒；onClose / onCancel 的 console.log 也去掉了',
    '确认按钮文字是 Yes，场景的按钮匹配正则里包含 yes',
  ],
});
