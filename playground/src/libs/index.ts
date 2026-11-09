import type { ComponentType, ReactNode } from 'react';
import type { LibInfo, LibKey } from '../core/types';

/**
 * 参与横评的组件库。新增一个库：
 *   1. 在 package.json 里加依赖（同名包用 npm 别名，如 "shineout-v2": "npm:shineout@2.0.32"）
 *   2. 在 core/types.ts 的 LibKey 里加上 key，在下面的 LIBS 和 PROVIDERS 里注册
 *   3. 新建 libs/<key>.tsx，默认导出一个 Provider（引入全局样式、设置语言等）
 *   4. 用例目录里新增 <key>.tsx 实现
 */
export const LIBS: LibInfo[] = [
  { key: 'v2', label: 'Shineout 2.x', color: '#fa8c16' },
  { key: 'v3', label: 'Shineout 3.x', color: '#197afa' },
  { key: 'antd5', label: 'antd 5.x', color: '#13a8a8' },
  { key: 'antd', label: 'antd 6.x', color: '#722ed1' },
];

export const LIB_MAP = Object.fromEntries(LIBS.map((l) => [l.key, l])) as Record<LibKey, LibInfo>;

export type Provider = ComponentType<{ children: ReactNode }>;

// 每个库的 Provider 只在对应的 frame 中加载，主页面和其它库的 frame 不会加载它的代码和样式
export const PROVIDERS: Record<LibKey, () => Promise<{ default: Provider }>> = {
  v2: () => import('./v2'),
  v3: () => import('./v3'),
  antd5: () => import('./antd5'),
  antd: () => import('./antd'),
};
