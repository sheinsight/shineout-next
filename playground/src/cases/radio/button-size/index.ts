import { defineCase } from '../../../core/define';

export default defineCase({
  title: '单选框 按钮尺寸',
  description: '来自 shineout 示例 radio/006-button-size，small / default / large 三组按钮样式 Radio.Group，每组三项，只测挂载',
  notes: [
    'size 的取值：default ↔ antd 的 middle；antd 的 Radio.Group size 只对 optionType=button 生效，所以放在按钮样式下对比',
    '三个尺寸同时渲染，原示例也是同时渲染的',
  ],
});
