import type { ReactNode } from 'react';
// 2.x 官方用法：组件不带样式，全局引入主题 css
import 'shineout-v2/dist/theme.default.css';

export default function V2Provider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
