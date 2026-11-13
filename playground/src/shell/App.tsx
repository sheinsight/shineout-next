import { useEffect, useMemo, useState } from 'react';
import { CASES, FEATURED_IDS, getCase } from '../core/registry';
import { LIBS } from '../libs';
import type { LibKey } from '../core/types';
import CaseView from './CaseView';
import { useStored } from './storage';

const META = __COMPARE_META__;

const readHash = () => decodeURIComponent(location.hash.replace(/^#\/?/, ''));

export default function App() {
  const [caseId, setCaseId] = useState(readHash);
  const [storedLibs, setLibs] = useStored<LibKey[]>('compare:libs', LIBS.map((l) => l.key));
  // localStorage 里可能残留已改名/移除的库 key，只保留当前 LIBS 中存在的
  const libs = useMemo(() => storedLibs.filter((k) => LIBS.some((l) => l.key === k)), [storedLibs]);
  const [keyword, setKeyword] = useState('');
  const [showAll, setShowAll] = useStored<boolean>('compare:showAll', false);

  useEffect(() => {
    const onHash = () => setCaseId(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const groups = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    const map = new Map<string, { list: typeof CASES; hidden: number }>();
    CASES.forEach((c) => {
      if (!map.has(c.component)) map.set(c.component, { list: [], hidden: 0 });
      const group = map.get(c.component)!;
      if (kw) {
        // 搜索时在全部用例里找，不受「只显示代表用例」限制
        if (`${c.id} ${c.title}`.toLowerCase().includes(kw)) group.list.push(c);
      } else if (showAll || FEATURED_IDS.has(c.id) || c.id === caseId) {
        // 当前打开的用例即使不是代表也保留，避免切换后丢失位置
        group.list.push(c);
      } else {
        group.hidden += 1;
      }
    });
    return Array.from(map.entries()).filter(([, g]) => g.list.length);
  }, [keyword, showAll, caseId]);

  const current = getCase(caseId);
  const toggleLib = (key: LibKey) =>
    setLibs(libs.includes(key) ? libs.filter((k) => k !== key) : LIBS.map((l) => l.key).filter((k) => k === key || libs.includes(k)));

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">组件库横评</div>
        <input className="search" placeholder="搜索用例" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <label className="show-all" title="关闭时每个组件只显示一个代表用例；搜索时不受影响">
          <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />
          显示全部用例
          <span className="muted">{showAll ? CASES.length : FEATURED_IDS.size} / {CASES.length}</span>
        </label>
        <nav>
          {groups.map(([component, { list, hidden }]) => (
            <div key={component} className="nav-group">
              <div className="nav-group-title">
                {component}
                {hidden > 0 && <span className="nav-hidden">+{hidden}</span>}
              </div>
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
                <span className="muted">
                  @{META.libs[l.key].version}
                  {META.libs[l.key].source !== 'npm' && ` · ${META.libs[l.key].source}`}
                </span>
              </label>
            ))}
          </div>
          <div className="muted small">
            React {META.react}
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
