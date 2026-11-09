import type { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

// 与 shineout 保持一致使用中文文案
export default function AntdProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
}
