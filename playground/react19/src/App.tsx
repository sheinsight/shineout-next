import { useState, version as reactVersion } from 'react';
import { version as reactDomVersion } from 'react-dom';
import TestMessage from './cases/TestMessage';
import TestModal from './cases/TestModal';
import TestImage from './cases/TestImage';
import TestBasicComponents from './cases/TestBasicComponents';
import TestReactRender from './cases/TestReactRender';
import TestPerformance from './cases/TestPerformance';

const cases = [
  { key: 'react-render', label: '🔴 ReactRender 直接测试', component: TestReactRender },
  { key: 'message', label: '🔴 Message 命令式调用', component: TestMessage },
  { key: 'modal', label: '🔴 Modal 命令式调用', component: TestModal },
  { key: 'image', label: '🔴 Image Gallery 命令式调用', component: TestImage },
  { key: 'basic', label: '🟢 基础组件渲染', component: TestBasicComponents },
  { key: 'perf', label: '🔬 性能 & 边界测试', component: TestPerformance },
] as const;

export default function App() {
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const ActiveComponent = cases.find((c) => c.key === activeCase)?.component;

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginTop: 0 }}>Shineout × React 19 兼容性测试</h1>
      <p style={{ color: '#666' }}>
        React: <code>{reactVersion}</code> | ReactDOM: <code>{reactDomVersion}</code>
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {cases.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveCase(activeCase === key ? null : key)}
            style={{
              padding: '8px 16px',
              border: '1px solid #d9d9d9',
              borderRadius: 6,
              background: activeCase === key ? '#1677ff' : '#fff',
              color: activeCase === key ? '#fff' : '#333',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {ActiveComponent && (
        <div
          style={{
            border: '1px solid #e8e8e8',
            borderRadius: 8,
            padding: 20,
            background: '#fafafa',
          }}
        >
          <ActiveComponent />
        </div>
      )}
    </div>
  );
}
