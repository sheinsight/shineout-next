import type { CSSProperties } from 'react';

// 面板的基础样式，来自 shineout 示例 border-beam。
// 示例里用的是 3.x 的主题变量（--soui-*），antd 里没有这些变量，这里统一换成固定值，
// 数值取自 3.x 默认主题，四个库的面板外观一致，差异只来自流光组件本身
export const COLORS = {
  border: '#e8ebf0',
  fill: '#ffffff',
  text: '#1d2129',
  subText: '#6c7180',
};

export const panel: CSSProperties = {
  position: 'relative',
  padding: 24,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 8,
  background: COLORS.fill,
  color: COLORS.text,
};

export const subText: CSSProperties = { margin: '8px 0 0', color: COLORS.subText };
