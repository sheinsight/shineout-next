import { defineCase } from '../../../core/define';
import { staticScenarios } from '../_shared/static';

export default defineCase({
  title: '弹窗 不同类型',
  description: '来自 shineout 示例 modal/02-type，用静态方法弹出 info / success / warn / error / show，场景点 info 按钮',
  scenarios: staticScenarios,
  notes: [
    '静态方法（Modal.info 等）没有受控的 open 状态：场景点按钮弹出，测完后自己点弹窗里的确认按钮（Ok / 知道了）关掉，再等 DOM 里的弹窗消失才进行下一次，这次点击不在测量窗口内',
    '场景只点 info 按钮（其它类型的开销大致相同，没有逐个测）',
    'Modal.warn ↔ antd 的 Modal.warning；Modal.show（没有图标的普通弹窗）antd 没有对应的静态方法，用 Modal.confirm 近似（带取消按钮，不是同一个东西）',
    '截图确认：antd 的 info 静态弹窗只有一个「知道了」按钮、没有右上角关闭图标；Shineout 3.x 的是 Ok 按钮、带右上角关闭图标',
  ],
});
