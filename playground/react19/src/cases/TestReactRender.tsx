/**
 * 🔴 直接测试 react-render.ts 工具函数
 *
 * 这是最可能导致 React 19 白屏的核心模块。
 * react-render.ts 使用了 __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED，
 * 该 API 在 React 19 中已重命名。
 *
 * 测试点：
 * 1. ReactRender 能否正确将节点渲染到指定容器
 * 2. ReactUnmount 能否正确卸载
 * 3. 多次 render/unmount 循环是否稳定
 */
import { useRef, useState, useEffect } from 'react';
import { util } from '@sheinx/hooks';

const { ReactRender, ReactUnmount } = util;

function InnerComponent({ text }: { text: string }) {
  return (
    <div style={{ padding: 12, background: '#e6f7ff', borderRadius: 4 }}>
      ✅ ReactRender 成功渲染: <strong>{text}</strong>
    </div>
  );
}

export default function TestReactRender() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [log, setLog] = useState<string[]>([]);
  const [renderCount, setRenderCount] = useState(0);

  const addLog = (msg: string) => {
    setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleRender = () => {
    const container = containerRef.current;
    if (!container) return;
    try {
      const count = renderCount + 1;
      setRenderCount(count);
      ReactRender(<InnerComponent text={`第 ${count} 次渲染`} />, container);
      addLog(`ReactRender 调用成功 (第 ${count} 次)`);
    } catch (err: any) {
      addLog(`❌ ReactRender 报错: ${err.message}`);
      console.error('ReactRender error:', err);
    }
  };

  const handleUnmount = async () => {
    const container = containerRef.current;
    if (!container) return;
    try {
      await ReactUnmount(container);
      addLog('ReactUnmount 调用成功');
    } catch (err: any) {
      addLog(`❌ ReactUnmount 报错: ${err.message}`);
      console.error('ReactUnmount error:', err);
    }
  };

  const handleRapidCycle = async () => {
    addLog('开始快速 render/unmount 循环 (5次)...');
    const container = containerRef.current;
    if (!container) return;
    for (let i = 1; i <= 5; i++) {
      try {
        ReactRender(<InnerComponent text={`循环 ${i}/5`} />, container);
        await new Promise((r) => setTimeout(r, 100));
        await ReactUnmount(container);
        await new Promise((r) => setTimeout(r, 50));
      } catch (err: any) {
        addLog(`❌ 循环 ${i} 出错: ${err.message}`);
        return;
      }
    }
    addLog('✅ 快速循环 5 次全部通过');
  };

  // 页面加载自动测试一次
  useEffect(() => {
    handleRender();
  }, []);

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>ReactRender / ReactUnmount 直接测试</h3>
      <p style={{ color: '#999', fontSize: 13 }}>
        核心问题：react-render.ts 使用了 React 内部 API
        <code>__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED</code>，React 19 已重命名该 API。
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={handleRender}>ReactRender</button>
        <button onClick={handleUnmount}>ReactUnmount</button>
        <button onClick={handleRapidCycle}>快速循环测试</button>
      </div>

      <div
        ref={containerRef}
        style={{
          border: '2px dashed #ccc',
          borderRadius: 6,
          padding: 8,
          minHeight: 50,
          marginBottom: 16,
          background: '#fff',
        }}
      />

      <details open>
        <summary>日志 ({log.length})</summary>
        <pre
          style={{
            background: '#1a1a2e',
            color: '#0f0',
            padding: 12,
            borderRadius: 6,
            fontSize: 12,
            maxHeight: 200,
            overflow: 'auto',
          }}
        >
          {log.length === 0 ? '等待操作...' : log.join('\n')}
        </pre>
      </details>
    </div>
  );
}
