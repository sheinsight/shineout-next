import type { EnvInfo, FrameResult, LibKey, Sample } from './types';

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
  /** 中位数 */
  value: number;
  /** 25% ~ 75% 分位和样本数，用来判断差距是不是噪声。不用最小/最大，一次冷缓存的离群值就会把范围撑得很宽 */
  lo?: number;
  hi?: number;
  n?: number;
  /** 失败次数 / 总次数，用于提示 */
  failed?: number;
  total?: number;
}

export interface ResultRow {
  key: string;
  group: string;
  metric: string;
  main: boolean;
  /** 单位，默认 ms */
  unit?: string;
  cells: Partial<Record<LibKey, Cell>>;
}

const quantile = (sorted: number[], q: number) => {
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const next = sorted[base + 1] ?? sorted[base];
  return sorted[base] + (next - sorted[base]) * (pos - base);
};

const spread = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  return { value: median(values), lo: quantile(sorted, 0.25), hi: quantile(sorted, 0.75), n: values.length };
};

/** 把多轮结果按 库 × 指标 汇总成中位数 */
export const aggregate = (results: FrameResult[], scenarios: { key: string; name: string }[], libs: LibKey[]) => {
  const byLib = (lib: LibKey) => results.filter((r) => r.lib === lib);
  // 小用例的首帧受帧对齐影响有 0~16ms 的随机波动，对比以「主线程占用」为准
  const mountRows: { key: string; metric: string; pick: (m: FrameResult['mount']) => number; main: boolean; unit?: string }[] = [
    { key: 'mount-busy', metric: '主线程占用', pick: (m) => m.busy, main: true },
    { key: 'mount-first', metric: '首帧', pick: (m) => m.firstPaint, main: false },
    { key: 'mount-js', metric: 'JS（render + commit）', pick: (m) => m.commit, main: false },
    { key: 'mount-stable', metric: 'DOM 稳定', pick: (m) => m.stable, main: false },
  ];
  const rows: ResultRow[] = mountRows.map((r) => ({
    key: r.key,
    group: '挂载',
    metric: r.metric,
    main: r.main,
    unit: r.unit,
    cells: {},
  }));
  libs.forEach((lib) => {
    const list = byLib(lib);
    if (!list.length) return;
    mountRows.forEach((r, i) => {
      rows[i].cells[lib] = spread(list.map((x) => r.pick(x.mount)));
    });
  });
  scenarios.forEach((s) => {
    METRICS.forEach((m) => {
      const row: ResultRow = { key: `${s.key}-${m.key}`, group: s.name, metric: m.name, main: !!m.main, cells: {} };
      libs.forEach((lib) => {
        const samples: Sample[] = byLib(lib).flatMap((r) => r.scenarios[s.key] || []);
        if (!samples.length) return;
        const ok = samples.filter((x) => x.ok);
        row.cells[lib] = {
          ...(ok.length ? spread(ok.map((x) => x[m.key])) : { value: NaN }),
          failed: samples.length - ok.length,
          total: samples.length,
        };
      });
      rows.push(row);
    });
  });
  return rows;
};

export type Verdict = 'ok' | 'warn' | 'bad';

export interface Assessment {
  level: Verdict;
  reasons: string[];
}

/**
 * 这份结果能不能引用。bad：数据本身有问题，必须重测；warn：能用，但引用时要带上限制；ok：没发现问题。
 * 只能判断浏览器能看到的东西，CPU 降速、其它程序占用 CPU 这类情况检测不到，需要使用者自己保证
 */
export const assess = (input: {
  env: EnvInfo;
  results: FrameResult[];
  libs: LibKey[];
  errors: string[];
  rounds: number;
  iter: number;
  hasScenarios: boolean;
}): Assessment => {
  const bad: string[] = [];
  const warn: string[] = [];
  const { env, results, libs, errors, rounds, iter, hasScenarios } = input;

  if (results.some((r) => r.hidden)) bad.push('测试期间页面进入过后台，rAF 被节流，数据不可信');
  const missing = libs.filter((l) => !results.some((r) => r.lib === l));
  if (missing.length) bad.push(`没有拿到数据的库：${missing.join('、')}`);
  else if (errors.length) warn.push(`有 ${errors.length} 个任务出错，对应轮次的数据缺失`);

  const failed = results.reduce((a, r) => a + Object.values(r.scenarios).flat().filter((s) => !s.ok).length, 0);
  if (failed) warn.push(`有 ${failed} 次交互校验失败，已从统计中剔除`);

  if (env.dev) warn.push('开发模式（React development 构建 + 未压缩代码），库与库之间的差距会被不成比例地放大');
  if (env.automated) warn.push('由自动化工具驱动或无头浏览器，只能看趋势，正式数据请在有界面的 Chrome 里跑');
  if (rounds < 3) warn.push(`轮数只有 ${rounds}，挂载的样本太少`);
  if (hasScenarios && rounds * iter < 10) warn.push(`每个场景只有 ${rounds * iter} 个样本，差距小于噪声时无法区分`);
  if (libs.length > 1 && rounds % libs.length !== 0) {
    warn.push(`轮数（${rounds}）不是库数（${libs.length}）的整数倍，执行顺序的影响没有完全抵消`);
  }

  return { level: bad.length ? 'bad' : warn.length ? 'warn' : 'ok', reasons: [...bad, ...warn] };
};

export const fmt = (n: number) => (Number.isFinite(n) ? n.toFixed(1) : '-');

/** 25%~75% 分位（样本数），差距落在这个范围内时不要下结论 */
export const fmtRange = (c: Cell) =>
  c.lo !== undefined && c.hi !== undefined ? `${fmt(c.lo)}~${fmt(c.hi)}（n=${c.n}）` : '';
