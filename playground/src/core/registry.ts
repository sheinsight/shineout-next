import type { CaseEntry, CaseMeta, LibKey } from './types';
import { LIBS } from '../libs';
import type { ComponentType } from 'react';

// 用例描述：同步加载（只包含标题、场景等，不 import 任何组件库）
const metas = import.meta.glob<CaseMeta>('../cases/*/*/index.ts', { eager: true, import: 'default' });
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

export const CASES: CaseEntry[] = Object.keys(metas)
  .map((file) => {
    const p = parse(file)!;
    const id = `${p.component}/${p.name}`;
    return {
      ...metas[file],
      id,
      component: p.component,
      impls: LIB_KEYS.filter((k) => implLoaders[id]?.[k as LibKey]) as LibKey[],
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

export const getCase = (id: string) => CASES.find((c) => c.id === id);

export const loadImpl = (id: string, lib: LibKey) => {
  const loader = implLoaders[id]?.[lib];
  return loader ? loader().then((m) => m.default) : Promise.resolve(null);
};
