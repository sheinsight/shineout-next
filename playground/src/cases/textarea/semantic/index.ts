import { defineCase } from '../../../core/define';

export default defineCase({
  title: '多行输入 语义化 DOM',
  description: '来自 shineout 示例 textarea/10-semantic，用 styles 定制根节点和文本域，只测挂载',
  notes: [
    '只有 3.x 和 antd 6 参与：2.x 没有 styles；antd 5 的 Input.TextArea 没有语义化 styles（读类型确认）',
    '节点对应关系（读类型得到）：Shineout 的 root / textarea 对应 antd 6 的 root / textarea；antd 6 另有 clear / count',
    '示例里 root 的边框（2px 蓝色）和圆角、textarea 的字体和字号，两边写法相同；截图确认：antd 6 的 root 样式（2px 蓝色边框、圆角 8）生效，两边外观一致；字体（monospace、14px）两边都生效',
  ],
});
