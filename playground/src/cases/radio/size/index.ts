import { defineCase } from '../../../core/define';

export default defineCase({
  title: '单选框 尺寸',
  description: '来自 shineout 示例 radio/001-size，small / default / large 三个 Radio，只有 2.x 与 3.x 参与',
  notes: [
    'antd 的 Radio 没有 size（RadioProps 里没有），Radio.Group 的 size 只对按钮样式（optionType=button）生效，见 radio/button-size；所以这个用例只比较 2.x 与 3.x',
  ],
});
