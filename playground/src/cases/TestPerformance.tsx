/**
 * 🔬 pendingQueue 性能测试 & 边界场景验证
 *
 * 测试项：
 * 1. 性能：pendingQueue null 检查在高频调用下的开销
 * 2. 性能：批量 render/unmount 循环的耗时对比
 * 3. 边界：同一 container 连续多次 render（队列去重问题）
 * 4. 边界：render 后立即 unmount（队列中项被正确移除）
 * 5. 边界：unmount 后再 render（不应残留脏状态）
 */
import { useState, useRef, useCallback, createElement } from 'react';
import { util } from '@sheinx/hooks';

const { ReactRender, ReactUnmount } = util;

function Box({ text, color }: { text: string; color: string }) {
  return createElement('div', {
    style: { padding: 4, background: color, borderRadius: 3, fontSize: 12, marginBottom: 2 },
  }, text);
}

// ==================== 性能测试 ====================
function PerfTest() {
  const [result, setResult] = useState<string[]>([]);
  const containersRef = useRef<HTMLDivElement[]>([]);

  const runPerfTest = useCallback(async (count: number) => {
    const logs: string[] = [];

    // 准备容器
    const containers: HTMLDivElement[] = [];
    for (let i = 0; i < count; i++) {
      const div = document.createElement('div');
      document.body.appendChild(div);
      containers.push(div);
    }
    containersRef.current = containers;

    // 测试 1: 连续 render 性能
    const t1 = performance.now();
    for (let i = 0; i < count; i++) {
      ReactRender(createElement(Box, { text: `#${i}`, color: '#e6f7ff' }), containers[i] as any);
    }
    const t2 = performance.now();
    logs.push(`[Render ×${count}] ${(t2 - t1).toFixed(2)}ms (${((t2 - t1) / count * 1000).toFixed(1)}μs/次)`);

    // 等一帧让 React 完成渲染
    await new Promise((r) => requestAnimationFrame(r));

    // 测试 2: 连续 re-render（同容器更新）
    const t3 = performance.now();
    for (let i = 0; i < count; i++) {
      ReactRender(createElement(Box, { text: `更新#${i}`, color: '#fff7e6' }), containers[i] as any);
    }
    const t4 = performance.now();
    logs.push(`[Re-render ×${count}] ${(t4 - t3).toFixed(2)}ms (${((t4 - t3) / count * 1000).toFixed(1)}μs/次)`);

    await new Promise((r) => requestAnimationFrame(r));

    // 测试 3: 连续 unmount 性能
    const t5 = performance.now();
    for (let i = 0; i < count; i++) {
      await ReactUnmount(containers[i] as any);
    }
    const t6 = performance.now();
    logs.push(`[Unmount ×${count}] ${(t6 - t5).toFixed(2)}ms (${((t6 - t5) / count * 1000).toFixed(1)}μs/次)`);

    // 测试 4: render + unmount 交替循环
    const t7 = performance.now();
    for (let i = 0; i < count; i++) {
      ReactRender(createElement(Box, { text: `循环#${i}`, color: '#f6ffed' }), containers[i] as any);
      await ReactUnmount(containers[i] as any);
    }
    const t8 = performance.now();
    logs.push(`[Render+Unmount 交替 ×${count}] ${(t8 - t7).toFixed(2)}ms (${((t8 - t7) / count * 1000).toFixed(1)}μs/次)`);

    // 清理
    containers.forEach((c) => c.parentNode?.removeChild(c));
    containersRef.current = [];

    setResult(logs);
  }, []);

  return (
    <div>
      <h4 style={{ margin: '0 0 8px' }}>⚡ 性能测试</h4>
      <p style={{ color: '#999', fontSize: 12, margin: '0 0 8px' }}>
        测量 ReactRender/ReactUnmount 在高频调用下的耗时，pendingQueue 已 resolve 后每次调用只多一个 null 检查。
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => runPerfTest(100)}>×100</button>
        <button onClick={() => runPerfTest(500)}>×500</button>
        <button onClick={() => runPerfTest(1000)}>×1000</button>
      </div>
      {result.length > 0 && (
        <pre style={{ background: '#1a1a2e', color: '#0f0', padding: 12, borderRadius: 6, fontSize: 12 }}>
          {result.join('\n')}
        </pre>
      )}
    </div>
  );
}

// ==================== 边界场景测试 ====================
function EdgeCaseTest() {
  const [log, setLog] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  // 场景 1: 同一容器连续 render 多次
  const testRapidRender = () => {
    const container = containerRef.current;
    if (!container) return;
    addLog('--- 同一容器连续 render 5 次 ---');
    for (let i = 1; i <= 5; i++) {
      ReactRender(
        createElement(Box, { text: `第${i}次`, color: i === 5 ? '#b7eb8f' : '#ffd591' }),
        container as any,
      );
      addLog(`  render 第${i}次`);
    }
    addLog('✅ 预期：容器只显示"第5次"（最后一次覆盖前面的）');
  };

  // 场景 2: render 后立即 unmount
  const testRenderThenUnmount = async () => {
    const container = containerRef.current;
    if (!container) return;
    addLog('--- render 后立即 unmount ---');
    ReactRender(
      createElement(Box, { text: '即将被卸载', color: '#ffccc7' }),
      container as any,
    );
    addLog('  render 完成');
    await ReactUnmount(container as any);
    addLog('  unmount 完成');
    addLog('✅ 预期：容器为空');
  };

  // 场景 3: unmount 后再 render（不应残留脏状态）
  const testUnmountThenRender = async () => {
    const container = containerRef.current;
    if (!container) return;
    addLog('--- unmount 后再 render ---');

    ReactRender(
      createElement(Box, { text: '第一轮', color: '#d9d9d9' }),
      container as any,
    );
    addLog('  第一轮 render');

    await ReactUnmount(container as any);
    addLog('  unmount');

    ReactRender(
      createElement(Box, { text: '第二轮（新 root）', color: '#b7eb8f' }),
      container as any,
    );
    addLog('  第二轮 render');
    addLog('✅ 预期：容器显示"第二轮（新 root）"，无报错');
  };

  // 场景 4: 多容器并发
  const testMultiContainer = async () => {
    addLog('--- 多容器并发 render/unmount ---');
    const containers: HTMLDivElement[] = [];
    for (let i = 0; i < 10; i++) {
      const div = document.createElement('div');
      document.body.appendChild(div);
      containers.push(div);
    }

    // 同时 render
    containers.forEach((c, i) => {
      ReactRender(
        createElement(Box, { text: `容器${i}`, color: '#e6f7ff' }),
        c as any,
      );
    });
    addLog('  10 个容器同时 render');

    await new Promise((r) => setTimeout(r, 100));

    // 检查渲染结果
    const rendered = containers.filter((c) => c.textContent?.includes('容器')).length;
    addLog(`  渲染成功: ${rendered}/10`);

    // 同时 unmount
    await Promise.all(containers.map((c) => ReactUnmount(c as any)));
    addLog('  10 个容器同时 unmount');

    const empty = containers.filter((c) => c.innerHTML === '').length;
    addLog(`  清空成功: ${empty}/10`);

    containers.forEach((c) => c.parentNode?.removeChild(c));
    addLog(rendered === 10 && empty === 10 ? '✅ 全部通过' : '❌ 存在异常');
  };

  return (
    <div>
      <h4 style={{ margin: '0 0 8px' }}>🧪 边界场景测试</h4>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <button onClick={testRapidRender}>同容器连续 render</button>
        <button onClick={testRenderThenUnmount}>render 后立即 unmount</button>
        <button onClick={testUnmountThenRender}>unmount 后再 render</button>
        <button onClick={testMultiContainer}>多容器并发</button>
        <button onClick={() => setLog([])} style={{ color: '#999' }}>清空日志</button>
      </div>

      <div
        ref={containerRef}
        style={{
          border: '2px dashed #ccc',
          borderRadius: 6,
          padding: 8,
          minHeight: 40,
          marginBottom: 12,
          background: '#fff',
        }}
      >
        <span style={{ color: '#ccc', fontSize: 12 }}>测试容器</span>
      </div>

      <details open>
        <summary>日志 ({log.length})</summary>
        <pre style={{ background: '#1a1a2e', color: '#0f0', padding: 12, borderRadius: 6, fontSize: 12, maxHeight: 300, overflow: 'auto' }}>
          {log.length === 0 ? '等待操作...' : log.join('\n')}
        </pre>
      </details>
    </div>
  );
}

// ==================== 主入口 ====================
export default function TestPerformance() {
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>pendingQueue 性能 & 边界测试</h3>
      <PerfTest />
      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #e8e8e8' }} />
      <EdgeCaseTest />
    </div>
  );
}
