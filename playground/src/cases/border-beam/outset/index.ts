import { defineCase } from '../../../core/define';

export default defineCase({
  title: '流光边框 裁剪容器',
  description: '来自 shineout 示例 border-beam/07-outset，outset 为 0 时流光保持在裁剪容器内，只测挂载',
  notes: [
    'BorderBeam 在 Shineout 3.x 和 antd 6 里有，2.x 和 antd 5 没有，所以只有这两个库可比',
    '面板的边框、背景、文字颜色：原示例用 3.x 的主题变量（--soui-*），antd 里没有，这里统一换成固定值（取自 3.x 默认主题），两个库外观一致',
  ],
});
