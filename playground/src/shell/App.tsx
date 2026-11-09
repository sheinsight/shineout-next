import { useEffect, useMemo, useState } from 'react';
import { CASES, getCase } from '../core/registry';
import { LIBS } from '../libs';
import type { LibKey } from '../core/types';
import CaseView from './CaseView';
import { useStored } from './storage';

const META = __COMPARE_META__;

const readHash = () => decodeURIComponent(location.hash.replace(/^#\/?/, ''));

export default function App() {
  const [caseId, setCaseId] = useState(readHash);
  const [libs, setLibs] = useStored<LibKey[]>('compare:libs', LIBS.map((l) => l.key));
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const onHash = () => setCaseId(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const groups = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    const map = new Map<string, typeof CASES>();
    CASES.filter((c) => !kw || `${c.id} ${c.title}`.toLowerCase().includes(kw)).forEach((c) => {
      if (!map.has(c.component)) map.set(c.component, []);
      map.get(c.component)!.push(c);
    });
    return Array.from(map.entries());
  }, [keyword]);

  const current = getCase(caseId);
  const toggleLib = (key: LibKey) =>
    setLibs(libs.includes(key) ? libs.filter((k) => k !== key) : LIBS.map((l) => l.key).filter((k) => k === key || libs.includes(k)));

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">组件库横评</div>
        <input className="search" placeholder="搜索用例" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <nav>
          {groups.map(([component, list]) => (
            <div key={component} className="nav-group">
              <div className="nav-group-title">{component}</div>
              {list.map((c) => (
                <a key={c.id} href={`#/${c.id}`} className={c.id === caseId ? 'nav-item active' : 'nav-item'}>
                  {c.title}
                </a>
              ))}
            </div>
          ))}
          {!CASES.length && <div className="muted">还没有用例，参考 README 在 src/cases 下添加</div>}
        </nav>
      </aside>
      <main className="main">
        <header className="topbar">
          <div className="libs">
            {LIBS.map((l) => (
              <label key={l.key} className="lib-toggle" style={{ borderColor: libs.includes(l.key) ? l.color : undefined }}>
                <input type="checkbox" checked={libs.includes(l.key)} onChange={() => toggleLib(l.key)} />
                <span className="dot" style={{ background: l.color }} />
                {l.label}
                <span className="muted">@{META.libs[l.key].version}</span>
              </label>
            ))}
          </div>
          <div className="muted small">
            React {META.react} · 3.x：{META.libs.v3.source}
            {import.meta.env.DEV && <span className="badge-warn">开发模式</span>}
          </div>
        </header>
        {current ? (
          <CaseView key={current.id} entry={current} libs={libs} />
        ) : (
          <div className="empty">
            {caseId ? `找不到用例 ${caseId}` : '从左侧选择一个用例'}
          </div>
        )}
      </main>
    </div>
  );
}
