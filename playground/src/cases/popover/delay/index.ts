import { defineCase } from '../../../core/define';

export default defineCase({
  title: '气泡 延迟',
  description: '来自 shineout 示例 popover/05-delay，mouseEnterDelay / mouseLeaveDelay，只测挂载',
  notes: [
    '只测挂载，延迟本身不是性能指标；用来确认各库带这些属性时挂载没有额外开销',
    '单位不同：Shineout 是毫秒（200 / 1000），antd 是秒（0.2 / 1）',
    '结构差异：Shineout 的 Popover 是放在 Button 里面的子元素，自己找父元素当触发器；antd 的 Popover 要把 Button 包在里面，内容写在 content 属性里。位置上 Shineout 默认 bottom-left，antd 默认 top，所以 antd 设了 placement=\'bottomLeft\'',
  ],
});
