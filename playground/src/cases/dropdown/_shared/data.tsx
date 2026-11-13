import type { ReactNode } from 'react';

/** Shineout 的菜单项 */
export interface SoItem { content: ReactNode; url?: string; target?: string; disabled?: boolean; divider?: boolean; children?: SoItem[] }

export const baseSo: SoItem[] = [
  {
    content: 'Submenu',
    children: [
      { content: 'Link to Google', target: '_blank', url: 'https://google.com' },
      { content: 'Disabled', disabled: true, children: [{ content: 'Child 1' }, { content: 'Child 2' }] },
    ],
  },
  { content: 'Home', url: '/' },
  { content: 'Message' },
];

/** antd 的菜单项：链接写在 label 里 */
export const baseAntd = [
  {
    key: 'sub',
    label: 'Submenu',
    children: [
      { key: 'g', label: <a href='https://google.com' target='_blank' rel='noreferrer'>Link to Google</a> },
      { key: 'd', label: 'Disabled', disabled: true, children: [{ key: 'c1', label: 'Child 1' }, { key: 'c2', label: 'Child 2' }] },
    ],
  },
  { key: 'home', label: <a href='/'>Home</a> },
  { key: 'msg', label: 'Message' },
];

export const simpleSo = (n: number): SoItem[] => Array.from({ length: n }, (_, i) => ({ content: `item${i}` }));
export const simpleAntd = (n: number) => Array.from({ length: n }, (_, i) => ({ key: String(i), label: `item${i}` }));

/** 5 项，每项 5 个子项 */
export const nestedSo: SoItem[] = Array.from({ length: 5 }, (_, i) => ({
  content: `item${i}`,
  children: Array.from({ length: 5 }, (_, j) => ({ content: `item${i}-${j}` })),
}));
export const nestedAntd = Array.from({ length: 5 }, (_, i) => ({
  key: String(i),
  label: `item${i}`,
  children: Array.from({ length: 5 }, (_, j) => ({ key: `${i}-${j}`, label: `item${i}-${j}` })),
}));

export const UserIcon = () => (
  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='#666C7C' strokeWidth='2'>
    <circle cx='12' cy='8' r='4' />
    <path d='M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8' />
  </svg>
);
