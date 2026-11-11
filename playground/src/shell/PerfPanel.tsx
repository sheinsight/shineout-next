import { useEffect, useRef, useState } from 'react';
import type { CaseEntry, EnvInfo, FrameMessage, FrameResult, LibKey } from '../core/types';
import { LIB_MAP } from '../libs';
import { aggregate, assess, fmt, type Assessment, type Cell, type ResultRow } from '../core/stats';
import { frameUrl } from './frameUrl';
import { useStored } from './storage';

const META = __COMPARE_META__;
const JOB_TIMEOUT = 5 * 60 * 1000;

interface Options {
  rounds: number;
  iter: number;
  warmup: number;
  root: 'concurrent' | 'legacy';
}

interface Job {
  lib: LibKey;
  round: number;
}

interface Report {
  env: EnvInfo;
  caseId: string;
  options: Options;
  libs: LibKey[];
  results: FrameResult[];
  errors: string[];
  finishedAt: string;
}

const collectEnv = (): EnvInfo => ({
  userAgent: navigator.userAgent,
  cores: navigator.hardwareConcurrency,
  memoryGB: (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
  dpr: window.devicePixelRatio,
  automated: !!navigator.webdriver || /HeadlessChrome/.test(navigator.userAgent),
  dev: import.meta.env.DEV,
});

const VERDICT_TITLE = { ok: '可信度：未发现问题', warn: '可信度：仅供参考', bad: '可信度：不可信，请重测' } as const;

export default function PerfPanel({ entry, libs }: { entry: CaseEntry; libs: LibKey[] }) {
  const [options, setOptions] = useStored<Options>('compare:perf', { rounds: 4, iter: 10, warmup: 2, root: 'concurrent' });
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState('');
  const [current, setCurrent] = useState<{ job: Job; src: string } | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [showAll, setShowAll] = useState(false);
  const stopRef = useRef(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const pendingRef = useRef<{ resolve: (r: FrameResult) => void; reject: (e: Error) => void } | null>(null);

  const runnable = libs.filter((l) => entry.impls.includes(l));
  const viewport = entry.viewport || { width: 1280, height: 800 };
  const scenarios = entry.scenarios || [];

  useEffect(() => {
    const onMessage = (e: MessageEvent<FrameMessage>) => {
      if (e.source !== frameRef.current?.contentWindow || e.origin !== location.origin) return;
      const pending = pendingRef.current;
      if (!pending) return;
      if (e.data.type === 'compare-result') pending.resolve(e.data.result);
      if (e.data.type === 'compare-error') pending.reject(new Error(e.data.message));
    };
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
      stopRef.current = true;
      pendingRef.current?.reject(new Error('已离开页面'));
    };
  }, []);

  const runJob = (job: Job) =>
    new Promise<FrameResult>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('超时')), JOB_TIMEOUT);
      pendingRef.current = {
        resolve: (r) => {
          clearTimeout(timer);
          resolve(r);
        },
        reject: (e) => {
          clearTimeout(timer);
          reject(e);
        },
      };
      // 每个任务都用新的 iframe（key 不同），保证每轮挂载都是冷启动
      setCurrent({
        job,
        src: frameUrl(job.lib, entry.id, {
          mode: 'auto',
          root: options.root,
          iter: options.iter,
          warmup: options.warmup,
          t: Date.now(),
        }),
      });
    });

  const start = async () => {
    stopRef.current = false;
    setRunning(true);
    setReport(null);
    const results: FrameResult[] = [];
    const errors: string[] = [];
    // 每轮轮换各库的执行顺序，抵消先后顺序带来的偏差
    const jobs: Job[] = [];
    for (let r = 0; r < options.rounds; r++) {
      runnable.forEach((_, i) => jobs.push({ lib: runnable[(i + r) % runnable.length], round: r + 1 }));
    }
    for (let i = 0; i < jobs.length; i++) {
      if (stopRef.current) break;
      const job = jobs[i];
      setProgress(`第 ${job.round}/${options.rounds} 轮 · ${LIB_MAP[job.lib].label}（${i + 1}/${jobs.length}）`);
      try {
        results.push(await runJob(job));
      } catch (e) {
        errors.push(`${LIB_MAP[job.lib].label} 第 ${job.round} 轮：${(e as Error).message}`);
      }
    }
    pendingRef.current = null;
    setCurrent(null);
    setRunning(false);
    setProgress(stopRef.current ? '已停止' : '');
    setReport({
      env: collectEnv(),
      caseId: entry.id,
      options,
      libs: runnable,
      results,
      errors,
      finishedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
    });
  };

  const rows = report ? aggregate(report.results, scenarios, report.libs) : [];
  const verdict: Assessment | null = report
    ? assess({
        env: report.env,
        results: report.results,
        libs: report.libs,
        errors: report.errors,
        rounds: report.options.rounds,
        iter: report.options.iter,
        hasScenarios: scenarios.length > 0,
      })
    : null;
  const set = (patch: Partial<Options>) => setOptions({ ...options, ...patch });

  return (
    <div className="perf">
      {import.meta.env.DEV && (
        <div className="warn">
          当前是开发模式（React development 构建 + 未压缩代码）：库与库之间的差距会被不成比例地放大，排名也可能和生产不同，
          这里的数据只用来确认用例能跑通，不要引用。正式数据请用 <code>npm run bench</code> 构建后，在预览地址上用有界面的
          Chrome 测试。
        </div>
      )}
      <div className="toolbar">
        <label>
          轮数
          <input type="number" min={1} value={options.rounds} onChange={(e) => set({ rounds: Math.max(1, Number(e.target.value) || 1) })} />
        </label>
        <label>
          每场景次数
          <input type="number" min={1} value={options.iter} onChange={(e) => set({ iter: Math.max(1, Number(e.target.value) || 1) })} />
        </label>
        <label>
          预热
          <input type="number" min={0} value={options.warmup} onChange={(e) => set({ warmup: Math.max(0, Number(e.target.value) || 0) })} />
        </label>
        <label>
          根节点
          <select value={options.root} onChange={(e) => set({ root: e.target.value as Options['root'] })}>
            <option value="concurrent">createRoot</option>
            <option value="legacy">ReactDOM.render</option>
          </select>
        </label>
        {running ? (
          <button
            onClick={() => {
              stopRef.current = true;
              setProgress('当前任务结束后停止…');
            }}
          >
            停止
          </button>
        ) : (
          <button className="primary" disabled={!runnable.length} onClick={start}>
            开始测试
          </button>
        )}
        <span className="muted small">{progress}</span>
      </div>
      {runnable.length > 1 && options.rounds % runnable.length !== 0 && (
        <div className="warn">
          轮数（{options.rounds}）不是参与库数（{runnable.length}）的整数倍，每个库在各个执行位置上出现的次数不一样，
          先后顺序的影响没有完全抵消。建议改成 {Math.ceil(options.rounds / runnable.length) * runnable.length}。
        </div>
      )}
      <div className="muted small">
        场景：{scenarios.length ? scenarios.map((s) => s.name).join('、') : '无（只测挂载）'} · 参与：
        {runnable.map((l) => LIB_MAP[l].label).join('、') || '无'} · frame {viewport.width}×{viewport.height}
        。测试期间保持页面在前台，不要操作。
      </div>

      {current && (
        <div className="stage" style={{ width: viewport.width, height: viewport.height }}>
          <iframe key={current.src} ref={frameRef} src={current.src} title="perf" style={{ width: viewport.width, height: viewport.height }} />
        </div>
      )}

      {report && (
        <div className="report">
          {verdict && (
            <div className={`verdict verdict-${verdict.level}`}>
              <b>{VERDICT_TITLE[verdict.level]}</b>
              {verdict.reasons.map((r) => (
                <div key={r}>· {r}</div>
              ))}
            </div>
          )}
          {report.errors.length > 0 && <div className="warn">{report.errors.join('\n')}</div>}
          <label className="small">
            <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> 显示分项指标（主线程占用、JS、渲染等）
          </label>
          <ResultTable rows={rows.filter((r) => showAll || r.main)} libs={report.libs} />
          <Markdown report={report} rows={rows} title={entry.title} verdict={verdict} notes={entry.notes} />
        </div>
      )}
    </div>
  );
}

const best = (row: ResultRow, libs: LibKey[]) =>
  Math.min(...libs.map((l) => row.cells[l]?.value ?? Infinity).filter((v) => Number.isFinite(v)));

const metricLabel = (row: ResultRow) => (row.unit ? `${row.metric}（${row.unit}）` : row.metric);

function ResultTable({ rows, libs }: { rows: ResultRow[]; libs: LibKey[] }) {
  return (
    <div className="table-wrap">
      <table className="result">
        <thead>
          <tr>
            <th>场景</th>
            <th>指标（中位数，ms）</th>
            {libs.map((l) => (
              <th key={l} style={{ color: LIB_MAP[l].color }}>
                {LIB_MAP[l].label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const min = best(row, libs);
            const bestCell: Cell | undefined = libs.map((l) => row.cells[l]).find((c) => c && c.value === min);
            return (
              <tr key={row.key}>
                <td>{row.group}</td>
                <td>{metricLabel(row)}</td>
                {libs.map((l) => {
                  const cell = row.cells[l];
                  if (!cell) return <td key={l} className="muted">-</td>;
                  const isBest = cell.value === min && libs.length > 1;
                  return (
                    <td key={l} className={isBest ? 'best' : undefined}>
                      {fmt(cell.value)}
                      {!isBest && Number.isFinite(cell.value) && min > 0 && (
                        // 范围25%~75% 分位和最快值的范围有重叠时，这个差距可能只是噪声，不显示倍数
                        cell.lo !== undefined && bestCell?.hi !== undefined && cell.lo <= bestCell.hi ? (
                          <span className="muted small" title="和最快值的范围有重叠，差距可能是噪声"> ≈</span>
                        ) : (
                          <span className="muted small"> ×{(cell.value / min).toFixed(2)}</span>
                        )
                      )}
                      {cell.lo !== undefined && cell.hi !== undefined && (
                        <span className="range">
                          {fmt(cell.lo)}~{fmt(cell.hi)}
                        </span>
                      )}
                      {!!cell.failed && <span className="badge-error">失败 {cell.failed}/{cell.total}</span>}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Markdown({
  report,
  rows,
  title,
  verdict,
  notes,
}: {
  report: Report;
  rows: ResultRow[];
  title: string;
  verdict: Assessment | null;
  notes?: string[];
}) {
  const [copied, setCopied] = useState(false);
  const { options, libs } = report;
  const lines = [
    `### ${title}（${report.caseId}）`,
    '',
    `- 时间：${report.finishedAt}，${import.meta.env.DEV ? '开发模式（仅供参考）' : '生产构建'}，React ${META.react}，${
      options.root === 'legacy' ? 'ReactDOM.render' : 'createRoot'
    }`,
    `- 版本：${libs.map((l) => `${LIB_MAP[l].label}@${META.libs[l].version}（${META.libs[l].source}）`).join('，')}`,
    `- ${options.rounds} 轮 × 每场景 ${options.iter} 次（预热 ${options.warmup} 次），取中位数，单位 ms；方括号内是 25%~75% 分位`,
    ...(libs.length > 1 && options.rounds % libs.length !== 0
      ? [`- 注意：轮数（${options.rounds}）不是库数（${libs.length}）的整数倍，执行顺序没有完全抵消`]
      : []),
    `- 样本数：挂载每个库 ${options.rounds} 个，每个场景每个库 ${options.rounds * options.iter} 个（失败的不计入）`,
    '- 对比以「主线程占用」为准；「首帧」包含等 vsync 的空闲，小用例有 0~16ms 的帧对齐波动。方括号范围重叠的差距不要当作结论',
    `- 浏览器：${report.env.userAgent}`,
    `- 设备：${report.env.cores ?? '?'} 核 · 内存 ${report.env.memoryGB ?? '?'}GB · DPR ${report.env.dpr} · ${
      report.env.automated ? '自动化 / 无头' : '有界面'
    }（CPU 是否降速、其它程序是否占用 CPU，浏览器检测不到，请自行保证）`,
    ...(verdict
      ? [
          `- ${VERDICT_TITLE[verdict.level]}`,
          ...verdict.reasons.map((r) => `  - ${r}`),
        ]
      : []),
    ...(notes?.length ? ['- 用例说明：', ...notes.map((n) => `  - ${n}`)] : []),
    '',
    `| 场景 | 指标 | ${libs.map((l) => LIB_MAP[l].label).join(' | ')} |`,
    `| --- | --- | ${libs.map(() => '---:').join(' | ')} |`,
    ...rows.map((row) => {
      const cells = libs.map((l) => {
        const c = row.cells[l];
        if (!c) return '-';
        const range = c.lo !== undefined && c.hi !== undefined ? ` [${fmt(c.lo)}~${fmt(c.hi)}]` : '';
        return fmt(c.value) + range + (c.failed ? `（失败 ${c.failed}/${c.total}）` : '');
      });
      return `| ${row.group} | ${metricLabel(row)} | ${cells.join(' | ')} |`;
    }),
    ...(report.errors.length ? ['', '出错：', ...report.errors.map((e) => `- ${e.split('\n')[0]}`)] : []),
  ];
  const text = lines.join('\n');
  // 机器可读的结果：汇总 + 每个样本的原始数据，用来对比优化前后，或者重新做统计
  const exportJson = () => {
    const data = {
      schema: 1,
      caseId: report.caseId,
      title,
      finishedAt: report.finishedAt,
      options,
      env: report.env,
      versions: Object.fromEntries(libs.map((l) => [l, META.libs[l]])),
      react: META.react,
      verdict,
      notes,
      summary: rows.map((row) => ({
        group: row.group,
        metric: row.metric,
        unit: row.unit || 'ms',
        cells: Object.fromEntries(libs.map((l) => [l, row.cells[l] ?? null])),
      })),
      raw: report.results,
      errors: report.errors,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `compare-${report.caseId.replace('/', '-')}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const copy = () => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div className="markdown">
      <div className="toolbar">
        <b className="small">Markdown</b>
        <button onClick={copy}>{copied ? '已复制' : '复制'}</button>
        <button onClick={exportJson}>导出 JSON</button>
      </div>
      <textarea readOnly value={text} rows={Math.min(lines.length + 1, 24)} />
    </div>
  );
}
