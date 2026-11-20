import { defineCase } from '../../../core/define';

export default defineCase({
  title: '输入框 Semantic DOM',
  description: '来自 shineout 示例 input/15-semantic，用 styles 定制 root / input，只有 3.x 和 antd 6.x 参与',
  notes: [
    '2.x 没有 styles；antd 5.x 的 Input 的 styles 只有 prefix / suffix / input / count，没有 root，所以不参与',
    '原示例没有 clearable：antd 在没有 allowClear / prefix 等的时候不渲染外层 affix-wrapper，root 就是 input 本身，和 Shineout 的 wrapper 不对应，所以这里两边都加了 clearable / allowClear，让两边都有外层 wrapper','root 在 antd 6 里是最外层容器（affix-wrapper 或 input 本身），Shineout 的 root 是 wrapper div，实际作用的节点不完全相同，需看截图',
  ],
});
