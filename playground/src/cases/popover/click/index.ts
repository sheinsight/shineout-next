import { defineCase } from '../../../core/define';

export default defineCase({
  title: '气泡 点击触发',
  description: '来自 shineout 示例 popover/03-click，trigger=click，只测挂载',
  notes: [
    '气泡默认是关闭的，挂载时不会渲染弹层，所以这里只测挂载（按钮 + 触发器的开销）；气泡打开的开销见 base / position 等带「打开」场景的用例',
    'trigger=click ↔ antd 的 trigger=click',
    '结构差异：Shineout 的 Popover 是放在 Button 里面的子元素，自己找父元素当触发器；antd 的 Popover 要把 Button 包在里面，内容写在 content 属性里。位置上 Shineout 默认 bottom-left，antd 默认 top，所以 antd 设了 placement=\'bottomLeft\'',
  ],
});
