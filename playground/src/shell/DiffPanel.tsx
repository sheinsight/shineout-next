import { useState } from 'react';
import { compareReports, parseReport, type Change, type Diff, type ExportedReport } from '../core/compare';
import { fmt } from '../core/stats';
import { LIB_MAP } from '../libs';
import type { LibKey } from '../core/types';

interface Loaded {
  name: string;
  report: ExportedReport;
}

const CHANGE_TEXT: Record<Change, string> = { better: '变快', worse: '变慢', same: '无明显变化' };

const libLabel = (lib: string) => LIB_MAP[lib as LibKey]?.label ?? lib;
const sign = (n: number) => (n > 0 ? '+' : '');

const readFile = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('读取文件失败'));
    reader.readAsText(file);
  });

function Slot({ title, hint, value, onLoad }: { title: string; hint: string; value: Loaded | null; onLoad: (l: Loaded | null, err?: string) => void }) {
  const pick = async (file?: File) => {
    if (!file) return;
    try {
      onLoad({ name: file.name, report: parseReport(await readFile(file)) });
    } catch (e) {
      onLoad(null, `${file.name}：${(e as Error).message}`);
    }
  };
  return (
    <div className="diff-slot">
      <b>{title}</b>
      <span className="muted small">{hint}</span>
      <input type="file" accept="application/json,.json" onChange={(e) => pick(e.target.files?.[0])} />
      {value && (
        <div className="small muted">
          {value.report.title}（{value.report.caseId}）· {value.report.finishedAt}
          <br />
          {value.report.options.rounds} 轮 × {value.report.options.iter} 次 · {value.report.env.dev ? '开发模式' : '生产构建'} ·{' '}
          {value.report.env.automated ? '无头/自动化' : '有界面'}
        </div>
      )}
    </div>
  );
}

export default function DiffPanel() {
  const [base, setBase] = useState<Loaded | null>(null);
  const [next, setNext] = useState<Loaded | null>(null);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  const diff: Diff | null = base && next ? compareReports(base.report, next.report) : null;
  const rows = diff ? diff.rows.filter((r) => showAll || r.main) : [];
  const accept = (set: (l: Loaded | null) => void) => (l: Loaded | null, err?: string) => {
    set(l);
    setError(err || '');
  };

  return (
    <div className="perf">
      <div className="muted small">
        导入两份「性能测试」导出的 JSON，比较同一个用例在改动前后的变化。判断标准：25%~75% 分位范围不重叠才算有变化，重叠的差距可能只是噪声。
      </div>
      <div className="diff-slots">
        <Slot title="基线（改动前）" hint="先跑一次并导出" value={base} onLoad={accept(setBase)} />
        <Slot title="本次（改动后）" hint="改动后在同样的条件下再跑一次并导出" value={next} onLoad={accept(setNext)} />
      </div>
      {error && <div className="warn">{error}</div>}

      {diff && (
        <div className="report">
          {diff.warnings.length > 0 && (
            <div className="verdict verdict-warn">
              <b>两份结果的口径不完全一致，对比时要考虑：</b>
              {diff.warnings.map((w) => (
                <div key={w}>· {w}</div>
              ))}
            </div>
          )}
          {diff.versionChanges.length > 0 && (
            <div className="small muted">
              版本变化：
              {diff.versionChanges.map((v) => (
                <span key={v.lib}>
                  {libLabel(v.lib)} {v.base} → {v.next}；
                </span>
              ))}
            </div>
          )}
          {(diff.onlyBase.length > 0 || diff.onlyNext.length > 0) && (
            <div className="small muted">
              {diff.onlyBase.length > 0 && <>只在基线中有：{diff.onlyBase.map(libLabel).join('、')}。</>}
              {diff.onlyNext.length > 0 && <>只在本次中有：{diff.onlyNext.map(libLabel).join('、')}。</>}
              这些库没有参与对比。
            </div>
          )}
          {!diff.libs.length && <div className="warn">两份结果没有共同的库，无法对比。</div>}
          <label className="small">
            <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> 显示分项指标（JS、渲染、首帧等）
          </label>
          {diff.libs.length > 0 && (
            <div className="table-wrap">
              <table className="result">
                <thead>
                  <tr>
                    <th>场景</th>
                    <th>指标（中位数，ms）</th>
                    {diff.libs.map((l) => (
                      <th key={l} style={{ color: LIB_MAP[l as LibKey]?.color }}>
                        {libLabel(l)}
                        <span className="range">基线 → 本次</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.key}>
                      <td>{row.group}</td>
                      <td>{row.metric}</td>
                      {diff.libs.map((l) => {
                        const c = row.cells[l];
                        if (!c) return <td key={l} className="muted">-</td>;
                        return (
                          <td key={l} className={`diff-${c.change}`}>
                            {fmt(c.base.value)} → {fmt(c.next.value)}
                            <span className="range">
                              {sign(c.delta)}
                              {fmt(c.delta)}（{sign(c.pct)}
                              {(c.pct * 100).toFixed(0)}%）· {CHANGE_TEXT[c.change]}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {diff.libs.length > 0 && !rows.length && <div className="muted small">没有可比较的指标。</div>}
        </div>
      )}
    </div>
  );
}
