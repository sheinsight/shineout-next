import { useEffect, useRef, useState } from 'react';
import type { CaseEntry, FrameMessage, LibKey } from '../core/types';
import { LIB_MAP } from '../libs';
import { frameUrl } from './frameUrl';
import { useStored } from './storage';
import PerfPanel from './PerfPanel';

const META = __COMPARE_META__;

const WIDTHS = [
  { value: 0, label: '自适应' },
  { value: 375, label: '375' },
  { value: 768, label: '768' },
  { value: 1280, label: '1280' },
];

export default function CaseView({ entry, libs }: { entry: CaseEntry; libs: LibKey[] }) {
  const [tab, setTab] = useStored<'view' | 'perf'>('compare:tab', 'view');
  const [width, setWidth] = useStored<number>('compare:width', 0);
  const [layout, setLayout] = useStored<'row' | 'column'>('compare:layout', 'row');
  const [minHeight, setMinHeight] = useStored<number>('compare:minHeight', 200);
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <section className="case">
      <div className="case-head">
        <div>
          <h1>{entry.title}</h1>
          <div className="muted small">
            {entry.id}
            {entry.description && <> · {entry.description}</>}
          </div>
        </div>
        <div className="tabs">
          <button className={tab === 'view' ? 'tab active' : 'tab'} onClick={() => setTab('view')}>
            对照查看
          </button>
          <button className={tab === 'perf' ? 'tab active' : 'tab'} onClick={() => setTab('perf')}>
            性能测试
          </button>
        </div>
      </div>

      {tab === 'view' ? (
        <>
          <div className="toolbar">
            <label>
              布局
              <select value={layout} onChange={(e) => setLayout(e.target.value as 'row' | 'column')}>
                <option value="row">左右并排</option>
                <option value="column">上下排列</option>
              </select>
            </label>
            <label>
              frame 宽度
              <select value={width} onChange={(e) => setWidth(Number(e.target.value))}>
                {WIDTHS.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              最小高度
              <input
                type="number"
                step={50}
                min={0}
                value={minHeight}
                onChange={(e) => setMinHeight(Math.max(0, Number(e.target.value) || 0))}
              />
            </label>
            <button onClick={() => setReloadKey(reloadKey + 1)}>全部重新加载</button>
          </div>
          <div className={`panels panels-${layout}`}>
            {libs.map((lib) => (
              <ViewPanel
                key={`${lib}-${reloadKey}`}
                lib={lib}
                entry={entry}
                width={width}
                minHeight={minHeight}
              />
            ))}
            {!libs.length && <div className="empty">在顶部勾选要对比的库</div>}
          </div>
        </>
      ) : (
        <PerfPanel entry={entry} libs={libs} />
      )}
    </section>
  );
}

function ViewPanel({ lib, entry, width, minHeight }: { lib: LibKey; entry: CaseEntry; width: number; minHeight: number }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(0);
  const [error, setError] = useState('');
  const info = LIB_MAP[lib];
  const implemented = entry.impls.includes(lib);
  const src = frameUrl(lib, entry.id);

  useEffect(() => {
    const onMessage = (e: MessageEvent<FrameMessage>) => {
      if (e.source !== ref.current?.contentWindow || e.origin !== location.origin) return;
      if (e.data.type === 'compare-height') setHeight(e.data.height);
      if (e.data.type === 'compare-error') setError(e.data.message);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="panel" style={width ? { flex: `0 0 ${width + 2}px` } : undefined}>
      <div className="panel-head" style={{ borderTopColor: info.color }}>
        <span className="dot" style={{ background: info.color }} />
        <b>{info.label}</b>
        <span className="muted">@{META.libs[lib].version}</span>
        {error && <span className="badge-error" title={error}>出错</span>}
        <span className="spacer" />
        {implemented && (
          <>
            <button className="link" onClick={() => ref.current?.contentWindow?.location.reload()}>
              重新加载
            </button>
            <a href={src} target="_blank" rel="noopener">
              新标签打开
            </a>
          </>
        )}
      </div>
      {implemented ? (
        <iframe
          ref={ref}
          src={src}
          title={`${info.label} ${entry.id}`}
          style={{ height: Math.max(height, minHeight), width: width || '100%' }}
        />
      ) : (
        <div className="panel-empty">未实现（新增 src/cases/{entry.id}/{lib}.tsx）</div>
      )}
    </div>
  );
}
