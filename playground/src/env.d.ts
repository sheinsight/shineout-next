/// <reference types="vite/client" />

declare const __COMPARE_META__: import('./core/types').CompareMeta;

declare module 'virtual:case-list' {
  const list: { id: string; component: string; title: string | null; featured: boolean }[];
  export default list;
}
