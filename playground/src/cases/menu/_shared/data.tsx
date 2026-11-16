import type { ReactNode } from 'react';

export interface Item {
  id: string;
  title: string;
  disabled?: boolean;
  link?: string;
  children?: Item[];
}

// 来自 shineout 示例 menu/01-base（含一个超长标题）
export const BASE: Item[] = [
  { id: '1', title: 'Navigation One' },
  { id: '3', title: 'Navigation Two', children: [{ id: '4', title: 'Option 1' }, { id: '5', title: 'Option 2' }] },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      { id: '7', title: 'Option 3' },
      { id: '8', title: 'Option 4', children: [{ id: '9', title: 'Option 1' }, { id: '10', title: 'Option 2' }] },
    ],
  },
  { id: '2', title: 'Navigation Four' },
  { id: '11', title: 'This is a very very very very long menu title' },
];

// 去掉最后一项超长标题（06-control / 07-render / 11-dark 等用的数据）
export const SIMPLE: Item[] = BASE.slice(0, 4);

export const LINKS: Item[] = [
  { id: '1', title: 'Google', link: 'https://www.google.com' },
  { id: '2', title: 'Strackoverflow', link: 'https://stackoverflow.com/' },
  { id: '3', title: 'Github', link: 'https://github.com/' },
];

// 05-disabled：Option 1、Navigation Four 禁用
export const DISABLED: Item[] = [
  { id: '1', title: 'Navigation One' },
  { id: '3', title: 'Navigation Two', children: [{ id: '4', title: 'Option 1', disabled: true }, { id: '5', title: 'Option 2' }] },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      { id: '7', title: 'Option 3' },
      { id: '8', title: 'Option 4', children: [{ id: '9', title: 'Option 1' }, { id: '10', title: 'Option 2' }] },
    ],
  },
  { id: '2', title: 'Navigation Four', disabled: true },
];

// 09-horizontal / 10-vertical
export const HORIZONTAL: Item[] = [
  { id: '1', title: 'Navigation One' },
  {
    id: '3',
    title: 'Navigation Two',
    children: [
      { id: '4', title: 'Option 1', children: [{ id: '9', title: 'Option 1' }, { id: '10', title: 'Option 2' }] },
      { id: '5', title: 'Option 2' },
    ],
  },
  { id: '6', title: 'Navigation Three', children: [{ id: '7', title: 'Option 3' }, { id: '8', title: 'Option 4' }] },
  { id: '2', title: 'Navigation Four' },
];

// 14-semantic
export const SEMANTIC: Item[] = [
  { id: '1', title: 'Navigation One', children: [{ id: '1-1', title: 'Option 1' }, { id: '1-2', title: 'Option 2' }, { id: '1-3', title: 'Option 3' }] },
  { id: '2', title: 'Navigation Two', children: [{ id: '2-1', title: 'Option 1' }, { id: '2-2', title: 'Option 2' }] },
  { id: '3', title: 'Navigation Three' },
];

// 12-collapse 用的数据：5 个一级项
export const COLLAPSE: Item[] = [...BASE.slice(0, 4), { id: '11', title: 'Navigation Five' }];

export interface AntdItem {
  key: string;
  label: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  children?: AntdItem[];
}

// Shineout 的 { id, title, children } 转成 antd 的 { key, label, children }。
// 叶子节点不写 children 字段：antd 的类型把 children: undefined 当成子菜单，不接受
// 返回 any[]：antd 5 和 antd 6 的 ItemType 不是同一个类型，这里不做类型约束
export const toAntd = (
  data: Item[],
  opt: { label?: (d: Item) => ReactNode; icon?: (d: Item) => ReactNode } = {},
): any[] =>
  data.map((d) => {
    const r: AntdItem = { key: d.id, label: opt.label ? opt.label(d) : d.title };
    if (d.disabled) r.disabled = true;
    const ic = opt.icon?.(d);
    if (ic) r.icon = ic;
    if (d.children) r.children = toAntd(d.children, opt);
    return r;
  });

// 07-render / 12-collapse 的图标：原示例是几段长 SVG，这里用同尺寸的简化图形，只要有图标节点即可，图形不是原图
export const icon = (kind: 'home' | 'flag' | 'tag') => (
  <svg width='1em' height='1em' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
    {kind === 'home' && <path d='M12 3 2 12h3v9h5v-6h4v6h5v-9h3z' />}
    {kind === 'flag' && <path d='M5 2h2v20H5zM8 3h12l-3 5 3 5H8z' />}
    {kind === 'tag' && <path d='M3 3h9l9 9-9 9-9-9zm4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' />}
  </svg>
);
export const ICON_BY_ID: Record<string, 'home' | 'flag' | 'tag'> = { '1': 'home', '3': 'flag', '6': 'tag', '2': 'tag', '11': 'tag' };
export const iconOf = (d: Item) => (d.title.startsWith('Navigation') && ICON_BY_ID[d.id] ? icon(ICON_BY_ID[d.id]) : null);
