import type { CSSProperties } from 'react';

// 面板的基础样式，来自 shineout 示例 border-beam，用的是 3.x 的主题变量
export const panel: CSSProperties = {
  position: 'relative',
  padding: 24,
  border: '1px solid var(--soui-neutral-border-1)',
  borderRadius: 8,
  background: 'var(--soui-neutral-fill-1)',
  color: 'var(--soui-neutral-text-5)',
};

export const subText: CSSProperties = { margin: '8px 0 0', color: 'var(--soui-neutral-text-4)' };
