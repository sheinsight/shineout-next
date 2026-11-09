import type { ReactNode } from 'react';
import { ConfigProvider } from 'antd-v5';
import zhCN from 'antd-v5/locale/zh_CN';

// 与 shineout 保持一致使用中文文案
export default function Antd5Provider({ children }: { children: ReactNode }) {
  return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
}
