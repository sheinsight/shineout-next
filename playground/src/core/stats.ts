import type { FrameResult, LibKey, Sample } from './types';

export const median = (values: number[]) => {
  if (!values.length) return NaN;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

export type MetricKey = 'busy' | 'paint' | 'js' | 'render';

export const METRICS: { key: MetricKey; name: string; main?: boolean }[] = [
  { key: 'busy', name: '主线程', main: true },
  { key: 'paint', name: '点击→绘制', main: true },
  { key: 'js', name: 'JS' },
  { key: 'render', name: '渲染' },
];

export interface Cell {
  value: number;
  /** 失败次数 / 总次数，用于提示 */
  failed?: number;
  total?: number;
}

export interface ResultRow {
  key: string;
  group: string;
  metric: string;
  main: boolean;
  cells: Partial<Record<LibKey, Cell>>;
}

/** 把多轮结果按 库 × 指标 汇总成中位数 */
export const aggregate = (results: FrameResult[], scenarios: { key: string; name: string }[], libs: LibKey[]) => {
  const byLib = (lib: LibKey) => results.filter((r) => r.lib === lib);
  const rows: ResultRow[] = [
    { key: 'mount-first', group: '挂载', metric: '首帧', main: true, cells: {} },
    { key: 'mount-js', group: '挂载', metric: 'JS（render + commit）', main: false, cells: {} },
    { key: 'mount-stable', group: '挂载', metric: 'DOM 稳定', main: true, cells: {} },
  ];
  libs.forEach((lib) => {
    const list = byLib(lib);
    if (!list.length) return;
    rows[0].cells[lib] = { value: median(list.map((r) => r.mount.firstPaint)) };
    rows[1].cells[lib] = { value: median(list.map((r) => r.mount.commit)) };
    rows[2].cells[lib] = { value: median(list.map((r) => r.mount.stable)) };
  });
  scenarios.forEach((s) => {
    METRICS.forEach((m) => {
      const row: ResultRow = { key: `${s.key}-${m.key}`, group: s.name, metric: m.name, main: !!m.main, cells: {} };
      libs.forEach((lib) => {
        const samples: Sample[] = byLib(lib).flatMap((r) => r.scenarios[s.key] || []);
        if (!samples.length) return;
        const ok = samples.filter((x) => x.ok);
        row.cells[lib] = {
          value: median(ok.map((x) => x[m.key])),
          failed: samples.length - ok.length,
          total: samples.length,
        };
      });
      rows.push(row);
    });
  });
  return rows;
};

export const fmt = (n: number) => (Number.isFinite(n) ? n.toFixed(1) : '-');
