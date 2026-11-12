import type { Assessment, Cell } from './stats';
import type { EnvInfo, FrameResult } from './types';

/** 「导出 JSON」的格式。改动字段时同步升 schema，并在 parseReport 里兼容旧版本 */
export interface ExportedReport {
  schema: 1;
  caseId: string;
  title: string;
  finishedAt: string;
  options: { rounds: number; iter: number; warmup: number; root: 'concurrent' | 'legacy' };
  env: EnvInfo;
  versions: Record<string, { version: string; source: string }>;
  react: string;
  verdict: Assessment | null;
  notes?: string[];
  summary: ExportedRow[];
  raw: FrameResult[];
  errors: string[];
}

export interface ExportedRow {
  group: string;
  metric: string;
  unit: string;
  /** 旧导出没有这个字段，读取时按指标名补 */
  main?: boolean;
  cells: Record<string, Cell | null>;
}

const MAIN_METRICS = ['主线程占用', '主线程', '点击→绘制'];

export const parseReport = (text: string): ExportedReport => {
  let data: any;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error('不是合法的 JSON 文件');
  }
  if (!data || data.schema !== 1 || !Array.isArray(data.summary) || typeof data.caseId !== 'string' || !data.env) {
    throw new Error('不是横评平台导出的结果文件（缺少 schema、caseId、summary 或 env）');
  }
  data.summary.forEach((row: ExportedRow) => {
    if (row.main === undefined) row.main = MAIN_METRICS.includes(row.metric);
  });
  return data as ExportedReport;
};

export type Change = 'better' | 'worse' | 'same';

export interface DiffCell {
  base: Cell;
  next: Cell;
  /** next - base，单位同指标（ms），负数表示变快 */
  delta: number;
  /** (next - base) / base */
  pct: number;
  change: Change;
}

export interface DiffRow {
  key: string;
  group: string;
  metric: string;
  unit: string;
  main: boolean;
  cells: Record<string, DiffCell>;
}

export interface Diff {
  rows: DiffRow[];
  /** 两份结果都有数据的库 */
  libs: string[];
  /** 只在一边出现的库 */
  onlyBase: string[];
  onlyNext: string[];
  /** 两份结果的口径不一致、会影响对比的地方 */
  warnings: string[];
  /** 版本或来源变了的库，用来标出这次改动的对象 */
  versionChanges: { lib: string; base: string; next: string }[];
}

const ver = (v?: { version: string; source: string }) => (v ? `${v.version}（${v.source}）` : '-');

/**
 * 25%~75% 分位范围不重叠才算有变化，重叠说明差距可能只是噪声。
 * 范围缺失（旧数据或样本太少）时按没有变化处理，宁可漏报也不误报。
 */
const judge = (base: Cell, next: Cell): Change => {
  if (base.lo === undefined || base.hi === undefined || next.lo === undefined || next.hi === undefined) return 'same';
  if (next.hi < base.lo) return 'better';
  if (next.lo > base.hi) return 'worse';
  return 'same';
};

const finite = (c: Cell | null | undefined): c is Cell => !!c && Number.isFinite(c.value);

export const compareReports = (base: ExportedReport, next: ExportedReport): Diff => {
  const baseLibs = Object.keys(base.versions);
  const nextLibs = Object.keys(next.versions);
  const libs = baseLibs.filter((l) => nextLibs.includes(l));
  const nextRows = new Map(next.summary.map((r) => [`${r.group}\u0000${r.metric}`, r]));

  const rows: DiffRow[] = [];
  base.summary.forEach((b) => {
    const key = `${b.group}\u0000${b.metric}`;
    const n = nextRows.get(key);
    if (!n) return;
    const cells: Record<string, DiffCell> = {};
    libs.forEach((lib) => {
      const bc = b.cells[lib];
      const nc = n.cells[lib];
      if (!finite(bc) || !finite(nc)) return;
      const delta = nc.value - bc.value;
      cells[lib] = {
        base: bc,
        next: nc,
        delta,
        pct: bc.value > 0 ? delta / bc.value : 0,
        change: judge(bc, nc),
      };
    });
    if (Object.keys(cells).length) {
      rows.push({ key, group: b.group, metric: b.metric, unit: b.unit, main: !!(b.main ?? n.main), cells });
    }
  });

  const warnings: string[] = [];
  if (base.caseId !== next.caseId) warnings.push(`用例不同：${base.caseId} 和 ${next.caseId}，对比没有意义`);
  if (base.env.userAgent !== next.env.userAgent) warnings.push('浏览器不同（userAgent 不一致）');
  if (base.env.cores !== next.env.cores || base.env.memoryGB !== next.env.memoryGB) warnings.push('设备配置不同（核数或内存不一致）');
  if (base.env.dev !== next.env.dev) warnings.push('一份是开发模式、一份是生产构建');
  else if (next.env.dev) warnings.push('两份都是开发模式，只能看趋势');
  if (base.env.automated !== next.env.automated) warnings.push('一份由自动化工具驱动、一份是有界面浏览器');
  if (base.options.root !== next.options.root) warnings.push('根节点方式不同（createRoot 与 ReactDOM.render）');
  if (base.react !== next.react) warnings.push(`React 版本不同：${base.react} 和 ${next.react}`);
  if (base.options.rounds !== next.options.rounds || base.options.iter !== next.options.iter) {
    warnings.push('轮数或每场景次数不同，两份的样本量不一样');
  }
  (['base', 'next'] as const).forEach((side) => {
    const r = side === 'base' ? base : next;
    const name = side === 'base' ? '基线' : '本次';
    if (r.verdict?.level === 'bad') warnings.push(`${name}结果的可信度为「不可信」：${r.verdict.reasons.join('；')}`);
    else if (r.verdict?.level === 'warn') warnings.push(`${name}结果的可信度为「仅供参考」：${r.verdict.reasons.join('；')}`);
  });

  const versionChanges = libs
    .filter((l) => ver(base.versions[l]) !== ver(next.versions[l]))
    .map((lib) => ({ lib, base: ver(base.versions[lib]), next: ver(next.versions[lib]) }));

  return {
    rows,
    libs,
    onlyBase: baseLibs.filter((l) => !nextLibs.includes(l)),
    onlyNext: nextLibs.filter((l) => !baseLibs.includes(l)),
    warnings,
    versionChanges,
  };
};
