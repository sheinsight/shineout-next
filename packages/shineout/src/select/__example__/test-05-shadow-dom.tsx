/**
 * cn - Shadow DOM 中 onChange 不触发 Bug 复现
 *    -- Select 在 Shadow DOM 内，mousedown 事件穿越 Shadow 边界时 event.target 被浏览器 retarget 为 Shadow Host，导致 useClickAway 误判为外部点击，下拉框提前关闭，onClick 未能触发，onChange 不执行。对比左侧正常 Select 与右侧 Shadow DOM 内的 Select 的 onChange 日志差异。
 * en - Reproduce onChange Bug in Shadow DOM
 *    -- Inside Shadow DOM, the mousedown event target is retargeted to the shadow host when crossing the shadow boundary. useClickAway incorrectly treats this as an outside click, closes the dropdown before the option click fires, and onChange is never called.
 */
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Select } from 'shineout';

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];

type LogEntry = { msg: string; from: 'normal' | 'shadow' };

// 模块级回调引用，用于跨 React root 边界传递日志
const shadowLogRef: { fn: ((entry: LogEntry) => void) | null } = { fn: null };

// 运行在 Shadow DOM 内部独立 React root 中的组件
function ShadowSelectContent() {
  return (
    <Select
      width={280}
      data={data}
      keygen
      placeholder='Shadow DOM 内的选择器'
      onChange={(v) => {
        shadowLogRef.fn?.({ msg: `onChange: ${v}`, from: 'shadow' });
      }}
    />
  );
}

// 将当前 document 所有可读样式注入 Shadow Root，确保组件样式正常渲染
function injectDocumentStyles(shadowRoot: ShadowRoot) {
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      const rules = Array.from(sheet.cssRules)
        .map((r) => r.cssText)
        .join('\n');
      const style = document.createElement('style');
      style.textContent = rules;
      shadowRoot.appendChild(style);
    } catch {
      // 跨域样式表无法访问，跳过
    }
  });
}

export default () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const shadowHostRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  // 注册日志回调，使 Shadow DOM 内的组件可以向外层写日志
  useEffect(() => {
    shadowLogRef.fn = (entry) => {
      setLogs((prev) => [entry, ...prev].slice(0, 20));
    };
    return () => {
      shadowLogRef.fn = null;
    };
  }, []);

  // 创建 Shadow DOM 并在其中挂载独立 React root
  useEffect(() => {
    if (!shadowHostRef.current || mountedRef.current) return;
    mountedRef.current = true;

    const shadow = shadowHostRef.current.attachShadow({ mode: 'open' });
    injectDocumentStyles(shadow);

    const container = document.createElement('div');
    shadow.appendChild(container);

    const innerRoot = createRoot(container);
    innerRoot.render(<ShadowSelectContent />);

    return () => {
      innerRoot.unmount();
    };
  }, []);

  const addLog = (entry: LogEntry) => {
    setLogs((prev) => [entry, ...prev].slice(0, 20));
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 40,
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          marginBottom: 20,
        }}
      >
        <div>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#52c41a' }}>
            ✓ 正常 Select（onChange 正常触发）
          </p>
          <Select
            width={280}
            data={data}
            keygen
            placeholder='普通选择器'
            onChange={(v) => addLog({ msg: `onChange: ${v}`, from: 'normal' })}
          />
        </div>

        <div>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#ff4d4f' }}>
            ✗ Shadow DOM 内的 Select（onChange 不触发）
          </p>
          {/* Shadow DOM 挂载点：attachShadow 在 useEffect 中调用 */}
          <div ref={shadowHostRef} />
        </div>
      </div>

      <div
        style={{
          padding: 12,
          background: '#fafafa',
          border: '1px solid #e8e8e8',
          borderRadius: 6,
          marginBottom: 12,
        }}
      >
        <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 13 }}>
          onChange 日志（最新在上）
        </p>
        <div style={{ minHeight: 80, fontFamily: 'monospace', fontSize: 12 }}>
          {logs.length === 0 ? (
            <span style={{ color: '#bbb' }}>分别点击两侧选项，对比 onChange 是否触发…</span>
          ) : (
            logs.map((l, i) => (
              <div
                key={i}
                style={{
                  lineHeight: '22px',
                  color: l.from === 'shadow' ? '#ff4d4f' : '#52c41a',
                }}
              >
                [{l.from === 'shadow' ? 'Shadow DOM ✗' : '正常       ✓'}] {l.msg}
              </div>
            ))
          )}
        </div>
      </div>

      <div
        style={{
          padding: 12,
          background: '#fff7e6',
          border: '1px solid #ffd591',
          borderRadius: 6,
          fontSize: 12,
          color: '#d46b08',
          lineHeight: '20px',
        }}
      >
        <strong>Bug 根因：</strong> Shadow DOM 内的 <code>mousedown</code> 事件在穿越 Shadow
        边界冒泡到 <code>document</code> 时，浏览器将 <code>event.target</code> retarget 为
        Shadow Host 元素（而非原始点击的选项）。
        <code>useClickAway</code> 用 <code>element.contains(event.target)</code>{' '}
        检查是否为外部点击，此时 Shadow Host 不在 Select 的元素引用链内，误判为外部点击，
        触发 <code>handleBlur()</code> 关闭下拉框。下拉框关闭后选项 DOM 被移除，
        后续的 <code>click</code> 事件找不到目标，<code>onClick</code> 不执行，
        <code>onChange</code> 不触发。
        <br />
        <strong>修复方案：</strong> 在 <code>useClickAway</code> 中改用{' '}
        <code>event.composedPath()</code> 替代 <code>event.target</code>，
        <code>composedPath()</code> 能穿透 Shadow 边界返回完整的事件路径，
        从而正确判断点击是否在目标元素内部。
      </div>
    </div>
  );
};
