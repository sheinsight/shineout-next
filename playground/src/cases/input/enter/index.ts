import { defineCase } from '../../../core/define';

export default defineCase({
  title: '输入框 键盘事件',
  description: '来自 shineout 示例 input/13-enter，onKeyUp / onKeyDown / onEnterPress 计数，只测挂载',
  notes: [
    'onEnterPress ↔ antd 的 onPressEnter；右侧文字 Shineout 用 Input.Group + <b>，antd 用 Space.Compact + Space.Addon，结构不同',
    '这个用例的重点是键盘交互，目前只测挂载，没有写键盘场景',
  ],
});
