import type { ReactNode } from 'react';

// 3.x 的样式由 JSS 在运行时注入，默认语言为中文，无需额外配置
export default function V3Provider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
