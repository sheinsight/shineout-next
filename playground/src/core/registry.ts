import type { CaseEntry, CaseMeta, CaseSummary, LibKey } from './types';
import { LIBS } from '../libs';
import caseList from 'virtual:case-list';
import type { ComponentType } from 'react';

// 侧边栏用的列表（id、标题、featured）由 vite 插件在服务端扫描生成，浏览器不用 import 几百个 index.ts。
// 完整的用例描述（场景、notes 等）在打开某个用例时才按需加载
const metaLoaders = import.meta.glob<CaseMeta>('../cases/*/*/index.ts', { import: 'default' });
// 各库实现：按需加载，每个 frame 只加载自己那一份
const impls = import.meta.glob<{ default: ComponentType }>('../cases/*/*/*.tsx');

const LIB_KEYS = LIBS.map((l) => l.key) as string[];
const parse = (file: string) => {
  const m = file.match(/^\.\.\/cases\/([^/]+)\/([^/]+)\/([^/]+)\.tsx?$/);
  return m ? { component: m[1], name: m[2], file: m[3] } : null;
};

const implLoaders: Record<string, Partial<Record<LibKey, () => Promise<{ default: ComponentType }>>>> = {};
Object.keys(impls).forEach((file) => {
  const p = parse(file);
  if (!p || !LIB_KEYS.includes(p.file)) return;
  const id = `${p.component}/${p.name}`;
  (implLoaders[id] ||= {})[p.file as LibKey] = impls[file];
});

export const CASES: CaseSummary[] = caseList
  .map((c) => ({
    id: c.id,
    component: c.component,
    // 标题不是字符串字面量的用例取不到标题，先显示 id
    title: c.title ?? c.id,
    featured: c.featured,
    impls: LIB_KEYS.filter((k) => implLoaders[c.id]?.[k as LibKey]) as LibKey[],
  }))
  .sort((a, b) => a.id.localeCompare(b.id));

export const getCaseSummary = (id: string) => CASES.find((c) => c.id === id);

/** 加载一个用例的完整描述（含场景），用例不存在时返回 null */
export const loadCase = async (id: string): Promise<CaseEntry | null> => {
  const summary = getCaseSummary(id);
  const loader = metaLoaders[`../cases/${id}/index.ts`];
  if (!summary || !loader) return null;
  const meta = await loader();
  return { ...meta, ...summary, title: meta.title };
};

export const loadImpl = (id: string, lib: LibKey) => {
  const loader = implLoaders[id]?.[lib];
  return loader ? loader().then((m) => m.default) : Promise.resolve(null);
};

/** 每个组件的代表用例：标了 featured 的；没有就取 base；再没有取第一个 */
export const FEATURED_IDS: Set<string> = (() => {
  const byComponent = new Map<string, CaseSummary[]>();
  CASES.forEach((c) => {
    if (!byComponent.has(c.component)) byComponent.set(c.component, []);
    byComponent.get(c.component)!.push(c);
  });
  const ids = new Set<string>();
  byComponent.forEach((list) => {
    const marked = list.filter((c) => c.featured);
    const pick = marked.length ? marked : [list.find((c) => c.id.endsWith('/base')) || list[0]];
    pick.forEach((c) => ids.add(c.id));
  });
  return ids;
})();
