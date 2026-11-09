import { useEffect, useRef, useState } from 'react';
import type { CaseEntry, FrameMessage, FrameResult, LibKey } from '../core/types';
import { LIB_MAP } from '../libs';
import { aggregate, fmt, type ResultRow } from '../core/stats';
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
  caseId: string;
  options: Options;
  libs: LibKey[];
  results: FrameResult[];
  errors: string[];
  finishedAt: string;
}

export default function PerfPanel({ entry, libs }: { entry: CaseEntry; libs: LibKey[] }) {
  const [options, setOptions] = useStored<Options>('compare:perf', { rounds: 3, iter: 10, warmup: 2, root: 'concurrent' });
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
      caseId: entry.id,
      options,
      libs: runnable,
      results,
      errors,
      finishedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
    });
  };

  const rows = report ? aggregate(report.results, scenarios, report.libs) : [];
  const hidden = report?.results.some((r) => r.hidden);
  const set = (patch: Partial<Options>) => setOptions({ ...options, ...patch });

  return (
    <div className="perf">
      {import.meta.env.DEV && (
        <div className="warn">
          当前是开发模式（React development 构建 + 未压缩代码），数值只能看趋势。正式数据请用 <code>npm run bench</code>{' '}
          构建后在预览地址上测试。
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
          {hidden && <div className="warn">测试期间页面进入过后台，rAF 被节流，结果不可信，请重新测试。</div>}
          {report.errors.length > 0 && <div className="warn">{report.errors.join('\n')}</div>}
          <label className="small">
            <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> 显示 JS / 渲染分项
          </label>
          <ResultTable rows={rows.filter((r) => showAll || r.main)} libs={report.libs} />
          <Markdown report={report} rows={rows} title={entry.title} />
        </div>
      )}
    </div>
  );
}

const best = (row: ResultRow, libs: LibKey[]) =>
  Math.min(...libs.map((l) => row.cells[l]?.value ?? Infinity).filter((v) => Number.isFinite(v)));

function ResultTable({ rows, libs }: { rows: ResultRow[]; libs: LibKey[] }) {
  return (
    <div className="table-wrap">
      <table className="result">
        <thead>
          <tr>
            <th>场景</th>
            <th>指标（中位数 ms）</th>
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
            return (
              <tr key={row.key}>
                <td>{row.group}</td>
                <td>{row.metric}</td>
                {libs.map((l) => {
                  const cell = row.cells[l];
                  if (!cell) return <td key={l} className="muted">-</td>;
                  const isBest = cell.value === min && libs.length > 1;
                  return (
                    <td key={l} className={isBest ? 'best' : undefined}>
                      {fmt(cell.value)}
                      {!isBest && Number.isFinite(cell.value) && min > 0 && (
                        <span className="muted small"> ×{(cell.value / min).toFixed(2)}</span>
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

function Markdown({ report, rows, title }: { report: Report; rows: ResultRow[]; title: string }) {
  const [copied, setCopied] = useState(false);
  const { options, libs } = report;
  const lines = [
    `### ${title}（${report.caseId}）`,
    '',
    `- 时间：${report.finishedAt}，${import.meta.env.DEV ? '开发模式（仅供参考）' : '生产构建'}，React ${META.react}，${
      options.root === 'legacy' ? 'ReactDOM.render' : 'createRoot'
    }`,
    `- 版本：${libs.map((l) => `${LIB_MAP[l].label}@${META.libs[l].version}（${META.libs[l].source}）`).join('，')}`,
    `- ${options.rounds} 轮 × 每场景 ${options.iter} 次（预热 ${options.warmup} 次），取中位数，单位 ms`,
    `- 浏览器：${navigator.userAgent}`,
    '',
    `| 场景 | 指标 | ${libs.map((l) => LIB_MAP[l].label).join(' | ')} |`,
    `| --- | --- | ${libs.map(() => '---:').join(' | ')} |`,
    ...rows.map((row) => {
      const cells = libs.map((l) => {
        const c = row.cells[l];
        if (!c) return '-';
        return fmt(c.value) + (c.failed ? `（失败 ${c.failed}/${c.total}）` : '');
      });
      return `| ${row.group} | ${row.metric} | ${cells.join(' | ')} |`;
    }),
    ...(report.errors.length ? ['', '出错：', ...report.errors.map((e) => `- ${e.split('\n')[0]}`)] : []),
  ];
  const text = lines.join('\n');
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
      </div>
      <textarea readOnly value={text} rows={Math.min(lines.length + 1, 24)} />
    </div>
  );
}
